import {createBrowserRouter} from "react-router-dom";
import Root from "./root.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";
import TimetablePage from "../pages/TimetablePage.jsx";
import ComponentPage from "../pages/ComponentPage.jsx";

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
                element: <></>,
                errorElement: <ErrorPage/>
            },
            {
                path: "feedback",
                element: <></>,
                errorElement: <ErrorPage/>
            },
            {
                path: "settings",
                element: <></>,
                errorElement: <ErrorPage/>
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
