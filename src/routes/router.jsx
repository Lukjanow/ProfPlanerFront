import { Outlet, createBrowserRouter } from "react-router-dom";
import Root from "./root.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";
import TimetablePage from "../pages/TimetablePage.jsx";
import ComponentPage from "../pages/ComponentPage.jsx";
import BasicDataPage from "../pages/BasicDataPage.jsx";
import SettingsPage from "../pages/SettingsPage.jsx";
import ConflictsPage from "../pages/ConflictsPage.jsx";
import ApiDebugPage from "../pages/ApiDebugPage.jsx";
import RoomDetailPage from "../pages/RoomDetailPage.jsx";
import DozentDetailPage from "../pages/DozentDetailPage.jsx";
import EditModulesPage from "../pages/EditModulesPage.jsx";
import Testpage from "../pages/Testpage.jsx";
import StudyCourseDetailPage from "../pages/StudyCourseDetailPage.jsx";


// TODO: make for example /dozent-details, /room-details a child from /basicdata
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
        path: "conflicts",
        element: <ConflictsPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "basicdata",
        element: <Outlet />,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <BasicDataPage />
          },
          {
            path: "dozent-details",
            element: <DozentDetailPage />,
            errorElement: <ErrorPage />,
          },
          {
            path: "dozent-details/:dozentId",
            element: <DozentDetailPage />,
            errorElement: <ErrorPage />,
          },
          {
            path: "room-details",
            element: <RoomDetailPage />,
            errorElement: <ErrorPage />,
          },
          {
            path: "room-details/:roomId",
            element: <RoomDetailPage />,
            errorElement: <ErrorPage />,
          },
          {
            path: "module-details",
            element: <EditModulesPage />,
            errorElement: <ErrorPage />,
          },
          {
            path: "module-details/:moduleId",
            element: <EditModulesPage />,
            errorElement: <ErrorPage />,
          },
          {
            path: "studycourse-details",
            element: <StudyCourseDetailPage />,
            errorElement: <ErrorPage />,
          },
          {
            path: "studycourse-details/:studycourseId",
            element: <StudyCourseDetailPage />,
            errorElement: <ErrorPage />,
          },
        ]
      },
      {
        path: "settings",
        element: <SettingsPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "debug",
        element: <ApiDebugPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "component",
        element: <ComponentPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "test",
        element: <Testpage />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

export default router;
