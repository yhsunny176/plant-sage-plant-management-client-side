import React from "react";
import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Error from "@/pages/Error";
import Authentication from "@/layouts/Authentication";
import Login from "@/pages/Login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
        ],
    },
    {
        path: "/auth",
        element: <Authentication />,
        children: [
            {
                path: "registration",
                element: <Registration />,
            },
            {
                path: "login",
                element: <Login />,
            },
        ],
    },
    {
        path: "/*",
        element: <Error />,
    },
]);

export default router;
