import { IconContext } from "react-icons";

export const IconProvider = ({ children }) => (
    <IconContext.Provider value={{ size: 24 }}>{children}</IconContext.Provider>
);
