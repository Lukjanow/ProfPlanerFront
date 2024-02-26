import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button, Tooltip } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    // TODO: Übersetzung einfügen
    return (
        <Tooltip content={"Erscheinungsbild ändern"}>
            <Button
                color={"none"}
                isIconOnly
                startContent={
                    theme === "light" ?
                        <FontAwesomeIcon className={"text-xl"} icon={"moon"} /> :
                        <FontAwesomeIcon className={"text-xl"} icon={"sun"} />
                }
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            </Button>
        </Tooltip>
    )
}
