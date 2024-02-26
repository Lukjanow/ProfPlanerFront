import {LangSwitcher} from "../components/LangSwitcher.jsx";
import {ThemeSwitcher} from "../components/ThemeSwitcher.jsx";
import {useTranslation} from "react-i18next";

export default function ComponentPage() {
    const {t} = useTranslation();

    return (
        <>
            <LangSwitcher/>
            <ThemeSwitcher/>
            <span>{t("language")}</span>
        </>
    );
}
