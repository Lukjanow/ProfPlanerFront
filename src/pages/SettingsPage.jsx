import { useTranslation } from "react-i18next"


export default function SettingsPage() {
    const { t } = useTranslation()

    return (
        <h1 className="font-poppins font-semibold text-[48px]">{t("settings")}</h1>
    )
}