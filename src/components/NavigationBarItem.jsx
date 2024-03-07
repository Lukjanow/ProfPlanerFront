import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function NavigationBarItem(props) {
    return (
        <Link className={"flex flex-col gap-1 w-full"} to={props.item.path}>
            <FontAwesomeIcon className={"text-xl"} icon={props.item.icon} />
            <span className={"text-[9px] font-extralight"}>{props.item.label}</span>
        </Link>
    )
}