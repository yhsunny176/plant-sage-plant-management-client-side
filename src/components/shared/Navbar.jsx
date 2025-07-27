import React from "react";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
    return (
        <div className="xl:max-w-6xl">
            <div className="toggle-btn">
                <ThemeToggle />
            </div>
        </div>
    );
};

export default Navbar;
