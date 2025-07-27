import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import MainLayout from "./layouts/MainLayout.jsx";
import { RouterProvider } from "react-router";
import router from "./routes/Routes.jsx";
import { ThemeProvider } from "./providers/ThemeProvider";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <RouterProvider router={router}>
                <MainLayout />
            </RouterProvider>
        </ThemeProvider>
    </StrictMode>
);
