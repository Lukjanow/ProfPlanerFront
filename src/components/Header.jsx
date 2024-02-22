import {LangSwitcher} from "./LangSwitcher.jsx";
import {ThemeSwitcher} from "./ThemeSwitcher.jsx";
import "../styles/components/Header.scss"
import logo from "../assets/logo_light.svg"

export function Header() {
        return (
            <header className={"py-2 px-5 items-center justify-between shadow-md sticky top-0"}>
                <div id={"logo"} className={"flex flex-row gap-3 items-center"}>
                    <img src={logo}/>
                    <h1 className={"text-xl font-bold"}>ProfPlaner</h1>
                </div>
                <div className={"flex flex-row gap-3"}>
                    <LangSwitcher/>
                    <ThemeSwitcher/>
                </div>
            </header>
        )
}