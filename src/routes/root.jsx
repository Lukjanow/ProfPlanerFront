import { Outlet } from "react-router-dom";
import { NavigationBar } from "../components/NavigationBar.jsx";
import { Header } from "../components/Header.jsx";
import { Footer } from "../components/Footer.jsx";
import { useTranslation } from "react-i18next";
import { useLangStore } from "../stores/langStore.js";
import { CardBody, Card } from "@nextui-org/react";

import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SnackBar from "../components/SnackBar.jsx";

export default function Root() {
    const { i18n } = useTranslation();
    const lang = useLangStore(state => state.lang);
    const setLang = useLangStore(state => state.setLang);

    useEffect(() => {
        setLang(i18n, lang);
    }, []);

    return (
        <>
            <Header />
            <NavigationBar />
            <main className={"min-w-full"} id="content">
                <Outlet />
                <Footer />
            </main>
        </>
    );
}
