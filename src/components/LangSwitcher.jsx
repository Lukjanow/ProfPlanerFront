import {Button} from "@nextui-org/react";
import {getLang, setLang} from "../i18n/i18n.js";

// TODO: not switching between langs yet
export function LangSwitcher() {
    const currentLang = getLang();
    console.log(currentLang);

    return (
        <>
            <Button isIconOnly onClick={() => {
                setLang(currentLang === "en" ? "de" : "en");
            }}>
                {getLang()}
            </Button>
        </>
    )
}

// <span>
//                 {t('hello')}
//             </span>