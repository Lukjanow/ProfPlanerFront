import {useTheme} from "next-themes";
import {useEffect, useState} from "react";
import {Button} from "@nextui-org/react";

export function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <>
            <Button isIconOnly onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
                {theme}
            </Button>
        </>
    )
}
