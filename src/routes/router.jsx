import {createBrowserRouter} from "react-router-dom";
import Root from "./root.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";
import TimetablePage from "../pages/TimetablePage.jsx";
import ComponentPage from "../pages/ComponentPage.jsx";
import BasicDataPage from "../pages/BasicDataPage.jsx";
import SettingsPage from "../pages/SettingsPage.jsx";
import ConflictsPage from "../pages/ConflictsPage.jsx";
import {ApiDebugPage} from "../pages/ApiDebugPage.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "timetable",
                element: <TimetablePage />,
                errorElement: <ErrorPage />,
            },
            {
                path: "basicdata",
                element: <BasicDataPage />,
                errorElement: <ErrorPage/>
            },
            {
                path: "conflicts",
                element: <ConflictsPage />,
                errorElement: <ErrorPage/>
            },
            {
                path: "settings",
                element: <SettingsPage />,
                errorElement: <ErrorPage/>
            },
            {
                path: "/debug",
                element: <ApiDebugPage />,
                errorElement: <ErrorPage />,
            }
        ]
    },
    {
        path: "/component",
        element: <ComponentPage />,
        errorElement: <ErrorPage />,
    },
]);

export default router;
