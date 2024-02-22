import {Select, SelectItem} from "@nextui-org/react";
import {useTranslation} from "react-i18next";

export function LangSwitcher() {
    const { t, i18n } = useTranslation();

    const handleLanguageChange = (e) => {
        const newLang = e.target.value;
        i18n.changeLanguage(newLang);
    };

    return (
        <>
            <Select
                aria-label={t("language")}
                disallowEmptySelection
                className="max-w-xs"
                defaultSelectedKeys={["en"]}
                onChange={handleLanguageChange}
            >
                <SelectItem
                    key="en"
                    value="en"
                >
                    English
                </SelectItem>
                <SelectItem
                    key="de"
                    value="de"
                >
                    Deutsch
                </SelectItem>
            </Select>
        </>
    );
}
