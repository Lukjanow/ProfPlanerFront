import { Outlet, createBrowserRouter } from "react-router-dom";
import Root from "./root.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";
import TimetablePage from "../pages/TimetablePage.jsx";
import BasicDataPage from "../pages/BasicDataPage.jsx";
import RoomDetailPage from "../pages/RoomDetailPage.jsx";
import DozentDetailPage from "../pages/DozentDetailPage.jsx";
import ModuleDetailPage from "../pages/ModuleDetailPage.jsx";
import StudyCourseDetailPage from "../pages/StudyCourseDetailPage.jsx";


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
            element: <ModuleDetailPage />,
            errorElement: <ErrorPage />,
          },
          {
            path: "module-details/:moduleId",
            element: <ModuleDetailPage />,
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
      }
    ],
  },
]);

export default router;
