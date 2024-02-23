import {LangSwitcher} from "./LangSwitcher.jsx";
import {ThemeSwitcher} from "./ThemeSwitcher.jsx";
import "../styles/components/Header.scss"
import logo from "../assets/logo.svg"
import {Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@nextui-org/react";

export function Header() {
        return (
            <Navbar isBordered maxWidth={"full"} className={"z-50 px-5 min-w-full"}>
                <NavbarContent className={""} justify={"start"}>
                    <NavbarBrand className={"max-h-full gap-3"}>
                        <img className={"w-10"} src={logo} alt={"logo"}/>
                        <h1 className={"text-xl font-bold"}>ProfPlaner</h1>
                    </NavbarBrand>
                </NavbarContent>
                <NavbarContent justify={"end"}>
                    <NavbarItem>
                        <LangSwitcher/>
                    </NavbarItem>
                    <NavbarItem>
                        <ThemeSwitcher/>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
        )
}