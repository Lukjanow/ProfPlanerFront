import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import router from "./routes/router.jsx";
import {RouterProvider} from "react-router-dom";
import {NextUIProvider} from "@nextui-org/react";
import {ThemeProvider} from "next-themes";
import './plugins/i18n.js';
import './plugins/fontawesome';

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <NextUIProvider>
            <ThemeProvider defaultTheme="dark">
                <RouterProvider router={router}/>
            </ThemeProvider>
        </NextUIProvider>
    </React.StrictMode>
);
