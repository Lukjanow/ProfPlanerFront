import {Select, SelectItem} from "@nextui-org/react";
import {useTranslation} from "react-i18next";
import {useLangStore} from "../stores/langStore.js";
import {i18n as i18nConfig} from "../config"

export function LangSwitcher() {
    const {t, i18n} = useTranslation();
    const lang = useLangStore(state => state.lang);
    const setLang = useLangStore(state => state.setLang);

    function handleLangChange(e) {
        const newLang = e.target.value;
        setLang(i18n, newLang);
    }

    return (
        <>
            <Select
                aria-label={t("language")}
                disallowEmptySelection
                className="max-w-xs"
                defaultSelectedKeys={[lang]}
                onChange={handleLangChange}
            >
                {i18n.languages.sort().map(lang => (
                    <SelectItem key={lang} value={lang}>
                        {i18nConfig.languageNames[lang]}
                    </SelectItem>
                ))}
            </Select>
        </>
    );
}
