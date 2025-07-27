import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();
    const themes = ["light", "dark"];

    const handleThemeChange = () => {
        const newTheme = themes[(themes.indexOf(theme) + 1) % themes.length];
        setTheme(newTheme);
    };
    return (
        <button
            className="cursor-pointer text-black-pg-base transition-colors duration-500 ease-in-out"
            onClick={handleThemeChange}>
            {theme === "dark" && (
                <h1>
                    <Moon></Moon>
                </h1>
            )}
            {theme === "light" && (
                <h1>
                    <Sun></Sun>
                </h1>
            )}
        </button>
    );
};

export default ThemeToggle;
