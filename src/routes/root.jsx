import { Outlet } from "react-router-dom";
import { NavigationBar } from "../components/NavigationBar.jsx";
import { Header } from "../components/Header.jsx";
import { Footer } from "../components/Footer.jsx";
import { useTranslation } from "react-i18next";
import { useLangStore } from "../stores/langStore.js";
import { useEffect, useState } from "react";
import SnackBar from "../components/SnackBar.jsx";
import TimedComponent from "../components/TimedComponent.jsx";
import { createContext } from "react";


export const Context = createContext();


export default function Root() {
    const { i18n } = useTranslation();
    const lang = useLangStore(state => state.lang);
    const setLang = useLangStore(state => state.setLang);
    const { t } = useTranslation();
    const [snackbarData, setSnackbarData] = useState({
        type: "success",
        message: t("message"),
        visible: false
    })

    useEffect(() => {
        setLang(i18n, lang);
    }, []);

    return (
        <>
            {snackbarData.visible && (
                <TimedComponent duration={4000} onClose={() => setSnackbarData(prevState => ({ ...prevState, visible: false }))}>
                    <SnackBar type={snackbarData.type} message={snackbarData.message} />
                </TimedComponent>
            )}
            <Header />
            <NavigationBar />
            <Context.Provider value={[setSnackbarData]}>
                <main className={"min-w-full"} id="content">
                    <Outlet />
                    <Footer />
                </main>
            </Context.Provider >
        </>
    );
}
