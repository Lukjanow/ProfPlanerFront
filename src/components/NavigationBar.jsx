import "../styles/components/NavigationBar.scss";
import {
  Badge,
  Button,
  Navbar,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import NavigationBarItem from "./NavigationBarItem.jsx";
import { useTranslation } from "react-i18next";
import { useLocation } from 'react-router-dom';

export function NavigationBar() {
  const { t } = useTranslation();
  const location = useLocation();
  const activeNavItem = location.pathname.split("/")[1]

  const navigationBarItems = [
    {
      path: "timetable",
      label: t("scheduling"),
      icon: "calendar-days",
    },
    {
      path: "conflicts",
      label: t("conflicts"),
      icon: "triangle-exclamation",
    },
    {
      path: "basicdata",
      label: t("basicData"),
      icon: "database",
    },
    {
      path: "settings",
      label: t("settings"),
      icon: "gear",
    },
  ];

  return (
    <Navbar className={"fixed min-h-full w-[90px] py-20 items-start px-0 z-40"}>
      <NavbarContent className={"flex flex-col gap-1 px-1"}>
        {navigationBarItems.map((navigationBarItem, index) => (
          <NavbarItem className={"w-20 h-20 px-0"} key={index}>
            <Button color="" className={`p-0 h-20 ${activeNavItem === navigationBarItem.path ? "bg-activeButton" : ""}`}>
              {navigationBarItem.path === "conflicts" ? (
                <Badge content="8" color="danger" size="md">
                  <NavigationBarItem item={navigationBarItem} />
                </Badge>
              ) : (
                <NavigationBarItem item={navigationBarItem} />
              )}
            </Button>
          </NavbarItem>
        ))}
      </NavbarContent>
    </Navbar>
  );
}
