import { Select, SelectItem, Badge, Tooltip, Button } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import { useLangStore } from "../stores/langStore.js";
// import { i18n as i18nConfig } from "../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function LangSwitcher() {
    const { t } = useTranslation();
    const { i18n } = useTranslation();
    const lang = useLangStore(state => state.lang);
    const setLang = useLangStore(state => state.setLang);

    // function handleLangChange(e) {
    //     console.log(e)
    //     const newLang = e.target.value;
    //     setLang(i18n, newLang);
    // }

    function handleLangChange() {
        const newLang = lang === "en" ? "de" : "en";
        setLang(i18n, newLang);
    }

    return (
        <>
            {/* <Select
                aria-label={t("language")}
                disallowEmptySelection
                className="w-fit"
                defaultSelectedKeys={[lang]}
                onChange={handleLangChange}
            >
                {i18n.languages.sort().map(lang => (
                    <SelectItem key={lang} value={lang}>
                        {i18nConfig.languageNames[lang]}
                    </SelectItem>
                ))}
            </Select> */}
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