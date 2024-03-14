import { Card, CardBody } from "@nextui-org/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useTranslation } from "react-i18next";


export default function SnackBar({ message = t("message"), type = "success" }) {
    const { t } = useTranslation();
    const typeValues = {
        success: {
            bg: "bg-success",
            icon: "check"
        },
        warning: {
            bg: "bg-warning-400",
            icon: "exclamation-triangle"
        },
        error: {
            bg: "bg-danger",
            icon: "times"
        }
    };


    return (
        <Card
            className={"fixed top-3 left-2/4 translate-x-[-40%] z-[100] h-11 pr-6 min-w-[300px]"}
            shadow={"sm"}
            radius={"sm"}
        >
            <CardBody className={"flex flex-row gap-5 items-center p-0"}>
                <div className={`min-h-full flex items-center justify-center w-8 ${typeValues[type].bg}`}>
                    <FontAwesomeIcon className={"text-white"} icon={`${typeValues[type].icon}`}></FontAwesomeIcon>
                </div>
                <div>
                    <p className={"text-xs font-bold"}>{t("action")}</p>
                    <p className={"text-sm"}>{message}</p>
                </div>
            </CardBody>
        </Card>
    )
}