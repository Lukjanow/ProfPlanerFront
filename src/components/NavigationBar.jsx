import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "../styles/components/NavigationBar.scss"
import {Button, Navbar, NavbarContent, NavbarItem} from "@nextui-org/react";

export function NavigationBar() {

    //TODO: NavigationBarItems Label übersetzen
    const navigationBarItems = [
        {
            path: "timetable",
            label: "Lehrplanung",
            icon: "calendar-days"
        },
        {
            path: "basicdata",
            label: "Stammdaten",
            icon: "database"
        },
        {
            path: "feedback",
            label: "Rückmeldung",
            icon: "message"
        },
        {
            path: "settings",
            label: "Einstellungen",
            icon: "gear"
        }
    ]

    return (
        <Navbar className={"fixed min-h-full w-20 py-20 items-start px-0 z-40"}>
            <NavbarContent className={"flex flex-col gap-1 px-0"}>
                {
                    navigationBarItems.map((navigationItem, index) => (
                        <NavbarItem className={"w-20 px-0"} key={index}>
                            <Button color="" className={"w-8 p-9"}>
                                <Link className={"flex flex-col gap-1"} to={navigationItem.path}>
                                    <FontAwesomeIcon  className={"text-xl"} icon={navigationItem.icon}/>
                                    <span className={"text-[9px] font-extralight"}>{navigationItem.label}</span>
                                </Link>
                            </Button>
                        </NavbarItem>
                        )
                    )
                }
            </NavbarContent>
        </Navbar>
    )
}