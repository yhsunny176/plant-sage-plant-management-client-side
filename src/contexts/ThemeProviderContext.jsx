import React, { createContext } from "react";

export const ThemeProviderContext = createContext({
    theme: "light",
    setTheme: () => null,
});
