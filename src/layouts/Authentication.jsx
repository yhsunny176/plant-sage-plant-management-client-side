import React from "react";
import { Outlet } from "react-router";

const Authentication = () => {
    return (
        <div className="h-full">
            <Outlet />
        </div>
    );
};

export default Authentication;
