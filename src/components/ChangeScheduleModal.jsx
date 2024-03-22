import { Tooltip, Button, Modal, useDisclosure, ModalContent, ModalHeader, ModalBody, Avatar, Listbox, ListboxItem } from "@nextui-org/react"
import { useTranslation } from "react-i18next"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState, useContext } from "react";
import { Context } from "../routes/root.jsx";


export default function ChangeScheduleModal() {
    const { t } = useTranslation();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [setSnackbarData] = useContext(Context)
    const [selectedKeys, setSelectedKeys] = useState("");


    const scheduleList = [
        {
            calendarName: "Erster Entwurf 2024",
            semesterCylce: "ss"
        },
        {
            calendarName: "2023/2024",
            semesterCylce: "ws"
        },
        {
            calendarName: "2023",
            semesterCylce: "ss"
        },
        {
            calendarName: "2022/2023",
            semesterCylce: "ws"
        },
        {
            calendarName: "2022/2023",
            semesterCylce: "ss"
        },
        {
            calendarName: "2022/2023",
            semesterCylce: "ws"
        },
        {
            calendarName: "2022/2023",
            semesterCylce: "ss"
        },
        {
            calendarName: "2022/2023",
            semesterCylce: "ws"
        },
        {
            calendarName: "2022/2023",
            semesterCylce: "ss"
        },
        {
            calendarName: "2022/2023",
            semesterCylce: "ws"
        },
        {
            calendarName: "2022/2023",
            semesterCylce: "ss"
        },
        {
            calendarName: "2022/2023",
            semesterCylce: "ws"
        },
    ]


    const handleClick = () => {
        // addDozent(newTeacher)
        //     .then(response => {
        //         console.log("Plan loaded: ", response);
        //         onOpenChange()
        //         setSnackbarData({ type: "success", message: "Plan loaded.", visible: true })
        //     })
        //     .catch(error => {
        //         console.error("Error loading plan:", error);
        //         onOpenChange()
        //         setSnackbarData({ type: "error", message: "Error loading plan.", visible: true })
        //     })
    }

    useEffect(() => {
        // getSchedules
    }, [scheduleList])

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
                                        key={items.calendarName}
                                        onPress={() => handleClick()}
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