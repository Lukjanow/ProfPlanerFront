import { Container } from "../components/Container";
import { Dropdown, DropdownMenu, DropdownTrigger, DropdownItem, Button } from "@nextui-org/react";


export default function ConflictsPage() {
    return (
        // TODO: Übersetzung einfügen
        <>
            <Container
                content={
                    <>
                        <h1>Test</h1>
                        <h1>Test</h1>
                    </>
                }
                title={"Allgemein"}
                showContentSwitch={false}
            />
            <Container
                content={
                    <>
                        <h1>Test</h1>
                        <h1>Test</h1>
                    </>
                }
                title={"Übung"}
                showContentSwitch={true}
            />
        </>
    )
}