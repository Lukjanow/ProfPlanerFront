import {useTheme} from "next-themes";
import {Switch} from "@nextui-org/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSun, faMoon} from "@fortawesome/free-solid-svg-icons";

export function ThemeSwitcher() {
    const {resolvedTheme, setTheme} = useTheme();
    // const [mounted, setMounted] = useState(false);
    // const { theme, setTheme } = useTheme();

    // useEffect(() => {
    //     setMounted(true);
    // }, []);
    //
    // if (!mounted) {
    //     return null;
    // }

    return (
        <>
            <Switch
                isSelected={resolvedTheme === "dark"}
                variant="shadow"
                size="lg"
                color="secondary"
                onValueChange={isSelected => setTheme(isSelected ? "dark" : "light")}
                thumbIcon={({isSelected}) =>
                    <FontAwesomeIcon
                        color="black"
                        icon={isSelected ? faMoon : faSun}
                        size="sm"
                    />
                }
            />
        </>
        // <Tooltip content={"Erscheinungsbild ändern"}>
        //     <Button
        //         color={"none"}
        //         isIconOnly
        //         startContent={
        //             theme === "light" ?
        //                 <FontAwesomeIcon className={"text-xl"} icon={"moon"} /> :
        //                 <FontAwesomeIcon className={"text-xl"} icon={"sun"} />
        //         }
        //         onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        //     </Button>
        // </Tooltip>
    )
}
