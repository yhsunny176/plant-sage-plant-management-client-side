import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import MainLayout from "./layouts/MainLayout.jsx";
import { RouterProvider } from "react-router";
import router from "./routes/Routes.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router}>
            <MainLayout />
        </RouterProvider>
    </StrictMode>
);
