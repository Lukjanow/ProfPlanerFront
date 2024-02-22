import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "../styles/components/NavigationBar.scss"

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
        <nav className={"fixed w-[80px] shadow-md"}>
            {
                navigationBarItems.map((navigationItem, index) => (
                        <Link className={"transition-colors"} key={index} to={navigationItem.path}>
                            <FontAwesomeIcon icon={navigationItem.icon}/>
                            <span>{navigationItem.label}</span>
                        </Link>
                   )
                )
            }
        </nav>
    )
}