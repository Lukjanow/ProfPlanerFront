import {Outlet} from "react-router-dom";
import {NavigationBar} from "../components/NavigationBar.jsx";

export default function Root() {
    return (
        <>
            <NavigationBar/>
            <main className={"bg-neutral-50 min-w-full"} id="content">
                <Outlet/>
            </main>
        </>
    );
}
