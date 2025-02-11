import { Tooltip, Button, Modal, useDisclosure, ModalContent, ModalHeader, ModalBody, Avatar, Listbox, ListboxItem } from "@nextui-org/react"
import { useTranslation } from "react-i18next"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { getAllCalendars, updateCalendar } from "../services/calendarService.js";
import { useselectedTimetableStore } from "../stores/selectedTimetableStore.js";


export default function ChangeScheduleModal() {
    const { t } = useTranslation();
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [scheduleList, setscheduleList] = useState([]);

    const settimeTableID = useselectedTimetableStore(state => state.settimeTableID);


    const handleClick = (event) => {
        settimeTableID(event.target.id)
        onClose()
        var schedule = null

        for (let i = 0; i < scheduleList.length; i++) {
            if (scheduleList[i]._id === event.target.id) {
                schedule = scheduleList[i]
            }
        }
        updateCalendar(schedule._id, { last_opening: Math.floor(Date.now() / 1000) })
            .then((response) => {
                console.log("Calendar updated: ", response);
            })
            .catch((error) => {
                console.error("Error updating calendar:", error);
            });
        window.location.reload(false);
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const calendars = await getAllCalendars();
                const calendarList = []
                for (let i = 0; i < calendars.data.length; i++) {
                    calendarList.push({
                        _id: calendars.data[i]._id,
                        calendarName: calendars.data[i].name,
                        semesterCylce: calendars.data[i].frequency === 1 ? "ws" : "ss",
                        frequency: calendars.data[i].frequency,
                        entrie: calendars.data[i].entrie
                    })
                }
                setscheduleList(calendarList)
            } catch (error) {
                console.log("Error: ", error);
            }
        }
        fetchData()
    }, [])

    return (
        <form>
            <Tooltip content={t("choosePlan")}>
                <Button
                    color={"none"}
                    isIconOnly
                    startContent={<FontAwesomeIcon className={"text-xl"} icon={"calendar-days"} />}
                    onPress={onOpen}
                />
            </Tooltip>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop={"blur"} className={"p-4"}>
                <ModalContent>
                    <ModalBody className="py-5 gap-10">
                        <ModalHeader className="h-auto text-3xl font-bold justify-between items-center">{t("choosePlan")}</ModalHeader>
                        <Listbox className={"max-h-[50vh] overflow-scroll"}>
                            {
                                scheduleList.map((items) => (
                                    <ListboxItem
                                        className="flex flex-row"
                                        id={items._id}
                                        onPress={(event) => handleClick(event)}
                                        startContent={
                                            <Avatar
                                                radius={"sm"}
                                                size={"lg"}
                                                icon={<span className={"text-sm font-bold"}>{items.semesterCylce === "ss" ? t("sose") : t("wise")}</span>}
                                                classNames={{
                                                    base: `${items.semesterCylce === "ws" ? "bg-gradient-to-br from-[#6E8BE5] to-[#4162D5]" : "bg-gradient-to-br from-[#FFB457] to-[#FF705B]"}`,
                                                    icon: "text-black/60 text-xl",
                                                }}
                                            />
                                        }
                                    >
                                        <div className={"flex flex-col"}>
                                            <span className={"text-xs font-bold text-default-400"}>{items.semesterCylce === "ss" ? t("sose") : t("wise")}</span>
                                            <span className={"text-md font-bold"}>{items.calendarName}</span>
                                        </div>
                                    </ListboxItem>
                                ))
                            }
                        </Listbox>
                    </ModalBody>
                </ModalContent>
            </Modal >
        </form >
    )
}