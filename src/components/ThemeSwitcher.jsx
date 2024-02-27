import { useTheme } from "next-themes";
import { Button, Tooltip } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";


export function ThemeSwitcher() {
    const { t } = useTranslation();
    const { theme, setTheme } = useTheme();

    return (
        <Tooltip content={t("themeSwitch")}>
            <Button
                color={"none"}
                isIconOnly
                startContent={<FontAwesomeIcon className={"text-xl"} icon={theme === "light" ? "moon" : "sun"} />}
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            </Button>
        </Tooltip>
    )
}
