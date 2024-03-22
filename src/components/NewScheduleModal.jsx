import { Tooltip, Button, Input, RadioGroup, Radio, Modal, useDisclosure, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react"
import { useTranslation } from "react-i18next"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useContext } from "react";
import { FilledButton } from "./FilledButton";
import { Context } from "../routes/root.jsx";


export default function NewScheduleModal() {
    const { t } = useTranslation();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [setSnackbarData] = useContext(Context)

    const [calendarName, setCalendarName] = useState("");
    const [semesterCycle, setSemesterCycle] = useState("ss");

    const [errors, setErrors] = useState({
        calendarName: false,
        semesterCycle: false
    });


    const handleSubmit = (e) => {
        e.preventDefault()


        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length === 0) {
            // const newTeacher = new DozentModel(salutation[0], title[0], prename, lastname, email)
            // addDozent(newTeacher)
            //     .then(response => {
            //         console.log("Plan created: ", response);
            //         onOpenChange()
            //         setSnackbarData({ type: "success", message: "Plan created.", visible: true })
            //     })
            //     .catch(error => {
            //         console.error("Error creating plan:", error);
            //         onOpenChange()
            //         setSnackbarData({ type: "error", message: "Error creating plan.", visible: true })
            //     })
        } else {
            console.error("Error: ", errors);
        }
    }


    const validateForm = () => {
        let errors = {};

        if (!calendarName.trim()) {
            errors.calendarName = true;
        }

        if (!semesterCycle.trim()) {
            errors.semesterCycle = true;
        }

        setErrors(errors);
        return errors;
    };



    return (
        <form>
            <Tooltip content={t("newPlan")}>
                <Button
                    color={"none"}
                    isIconOnly
                    startContent={<FontAwesomeIcon className={"text-xl"} icon={"calendar-plus"} />}
                    onPress={onOpen}
                />
            </Tooltip>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop={"blur"} className={"p-4"}>
                <ModalContent>
                    <ModalBody className="py-5 gap-10">
                        <ModalHeader className="h-auto text-3xl font-bold justify-between items-center">
                            {t("newPlan")}
                            <FilledButton
                                text={t("save")}
                                showIcon={true}
                                icon={"plus"}
                                onClick={(e) => {
                                    handleSubmit(e)
                                }}
                            />
                        </ModalHeader>
                        <div className={"flex flex-col gap-5"}>
                            <RadioGroup
                                label={t("semesterCycle")}
                                orientation={"horizontal"}
                                value={semesterCycle}
                                onValueChange={(value) => {
                                    setSemesterCycle(value)
                                    if (!value.trim()) {
                                        setErrors({ ...errors, semesterCycle: true });
                                    } else {
                                        setErrors({ ...errors, semesterCycle: false });
                                    }
                                }}
                                isRequired
                                isInvalid={errors.semesterCycle}
                                errorMessage={
                                    errors.semesterCycle ? `${t("semesterCycle")} ${t("isRequired")}` : ""
                                }
                            >
                                <Radio value={"ss"} >{t("summer")}</Radio>
                                <Radio value={"ws"} >{t("winter")}</Radio>
                            </RadioGroup>
                            <Input
                                name={"calendarName"}
                                className={"h-[80px]"}
                                radius={"sm"}
                                isRequired
                                isInvalid={errors.calendarName}
                                errorMessage={
                                    errors.calendarName ? `${t("name")} ${t("isRequired")}` : ""
                                }
                                type="text"
                                label={t("name")}
                                value={calendarName}
                                onValueChange={(value) => {
                                    setCalendarName(value);
                                    if (!value.trim()) {
                                        setErrors({ ...errors, calendarName: true });
                                    } else {
                                        setErrors({ ...errors, calendarName: false });
                                    }
                                }}
                            />
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal >
        </form>
    )
}