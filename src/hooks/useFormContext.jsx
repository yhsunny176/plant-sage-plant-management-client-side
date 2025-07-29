import { FormContext } from "@/contexts/FormContexts";
import { useContext } from "react";

// Custom hook to use Form Context
export const useFormContext = () => {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error("Form components must be used within a Form component");
    }
    return context;
};
