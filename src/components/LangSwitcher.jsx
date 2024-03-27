import { Badge, Tooltip, Button } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import { useLangStore } from "../stores/langStore.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function LangSwitcher() {
    const { t } = useTranslation();
    const { i18n } = useTranslation();
    const lang = useLangStore(state => state.lang);
    const setLang = useLangStore(state => state.setLang);

    function handleLangChange() {
        const newLang = lang === "en" ? "de" : "en";
        setLang(i18n, newLang);
    }

    return (
        <>
            <Badge
                content={lang}
                size={"sm"}
                showOutline={false}
                color={"primary"}
            >
                <Tooltip content={t("languageSwitch")}>
                    <Button
                        isIconOnly
                        color={"none"}
                        endContent={<FontAwesomeIcon className={"text-xl"} icon={"globe"} />}
                        onClick={handleLangChange}
                    />
                </Tooltip>
            </Badge >
        </>
    )
}