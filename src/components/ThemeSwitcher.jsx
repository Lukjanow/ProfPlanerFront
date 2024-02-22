import {useTheme} from "next-themes";
import {Switch} from "@nextui-org/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSun, faMoon} from "@fortawesome/free-solid-svg-icons";

export function ThemeSwitcher() {
    const {setTheme} = useTheme();
    return (
        <>
            <Switch
                defaultSelected
                size="lg"
                color="secondary"
                onValueChange={isSelected => {
                    setTheme(isSelected ? "dark" : "light");
                }}
                thumbIcon={({ isSelected }) =>
                    <FontAwesomeIcon
                        color="black"
                        icon={isSelected ? faMoon : faSun}
                        size="sm"
                    />
                }
            />
        </>
    )
}
