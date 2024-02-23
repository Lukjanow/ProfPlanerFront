import {Outlet} from "react-router-dom";
import {NavigationBar} from "../components/NavigationBar.jsx";
import {Header} from "../components/Header.jsx";
import {Footer} from "../components/Footer.jsx";

export default function Root() {
    return (
        <>
            <Header/>
            <NavigationBar/>
            <main className={"min-w-full"} id="content">
                <Outlet/>
                <Footer/>
            </main>
        </>
    );
}
