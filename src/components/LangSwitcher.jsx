import { Badge, Button, Tooltip } from "@nextui-org/react";
import { getLang, setLang } from "../i18n/i18n.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// TODO: not switching between langs yet
export function LangSwitcher() {
    const currentLang = getLang();
    console.log(currentLang);

    // TODO: Übersetzung einfügen
    return (
        <Badge
            content={currentLang}
            size={"lg"}
        >
            <Tooltip content={"Sprache ändern"}>
                <Button
                    isIconOnly
                    color={"none"}
                    endContent={<FontAwesomeIcon className={"text-xl"} icon={"globe"} />}
                    onClick={() => {
                        setLang(currentLang === "en" ? "de" : "en");
                    }}>
                    {

                    }
                </Button>
            </Tooltip>
        </Badge>
    )
}