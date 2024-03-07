import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/components/NavigationBar.scss";


export default function NavigationBarItem(props) {
    return (
        <NavLink className={"flex flex-col gap-1 w-full"} to={props.item.path}>
            <FontAwesomeIcon className={"text-xl"} icon={props.item.icon} />
            <span className={"text-[9px] font-extralight"}>{props.item.label}</span>
        </NavLink>
    )
}