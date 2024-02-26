import "../styles/components/NavigationBar.scss"
import { Badge, Button, Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";
import NavigationBarItem from "./NavigationBarItem.jsx";

export function NavigationBar() {
  //TODO: NavigationBarItems Label übersetzen
  const navigationBarItems = [
    {
      path: "timetable",
      label: "Lehrplanung",
      icon: "calendar-days",
    },
    {
      path: "conflicts",
      label: "Konflikte",
      icon: "triangle-exclamation",
    },
    {
      path: "basicdata",
      label: "Stammdaten",
      icon: "database",
    },
    {
      path: "settings",
      label: "Einstellungen",
      icon: "gear",
    },
  ];

    //TODO: NavigationBarItems Label übersetzen
    const navigationBarItems = [
        {
            path: "timetable",
            label: "Lehrplanung",
            icon: "calendar-days"
        },
        {
            path: "conflicts",
            label: "Konflikte",
            icon: "triangle-exclamation"
        },
        {
            path: "basicdata",
            label: "Stammdaten",
            icon: "database"
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
                    navigationBarItems.map((navigationBarItem, index) => (
                        <NavbarItem className={"w-20 px-0"} key={index}>
                            <Button color="" className={"w-8 p-9"}>
                                {
                                    navigationBarItem.path === "conflicts" ?
                                        <Badge
                                            content="8"
                                            color="danger"
                                            size="md"
                                        >
                                            <NavigationBarItem item={navigationBarItem} />
                                        </Badge> :
                                        <NavigationBarItem item={navigationBarItem} />
                                }
                            </Button>
                        </NavbarItem>
                    )
                    )
                }
            </NavbarContent>
        </Navbar>
    )
}
