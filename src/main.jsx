import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./routes/Routes.jsx";
import { ThemeProvider } from "./providers/ThemeProvider";
import { IconProvider } from "./contexts/IconContext";
import AuthProvider from "./providers/AuthProvider";
import ToasterProvider from "./components/shared/ToasterProvider.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <IconProvider>
                <AuthProvider>
                    <RouterProvider router={router}></RouterProvider>
                    <ToasterProvider />
                </AuthProvider>
            </IconProvider>
        </ThemeProvider>
    </StrictMode>
);
