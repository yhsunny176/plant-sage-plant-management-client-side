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
            className="toggle-btn w-10 h-10 flex items-center justify-center rounded-full bg-toggle-background text-toggle-icon-color transition-colors duration-500 ease-in-out cursor-pointer"
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
