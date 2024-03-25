import { Card, CardBody } from "@nextui-org/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useTranslation } from "react-i18next"

export default function ConflictItem({ content, isIgnored = false, onPress }) {
    const { t } = useTranslation()
    const itemColor = isIgnored ? "default" : "warning"


    return (
        <Card className={`w-full border-0 border-${itemColor}-400`} shadow="sm" radius={"sm"} isPressable onPress={onPress}>
            <div className={`w-full bg-${itemColor}-400 px-3 py-1 flex gap-2 items-center text-white text-xs`}>
                <FontAwesomeIcon icon={"circle-exclamation"} />
                {t("warning")}
            </div>
            <CardBody className={"gap-2"}>
                <p className={"font-bold text-sm"}>{t(content.error_message)}</p>
                <div className={"text-sm"}>
                    <div className="flex gap-2 items-center justify-start">
                        <FontAwesomeIcon className={"w-[15px]"} icon="tag" /><span className={"text-xs"}>{content.area_string}</span>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}