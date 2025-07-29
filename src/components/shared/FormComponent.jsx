import { FormContext } from "@/contexts/FormContexts";
import { useFormContext } from "@/hooks/useFormContext";
import { classNames } from "@/lib/utils";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

// Main Form Component
export const Form = ({ children, initialValues = {}, onSubmit, className, ...props }) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const updateField = (name, value) => {
        setValues((prev) => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const setFieldError = (name, error) => {
        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    const clearErrors = () => {
        setErrors({});
    };

    const reset = () => {
        setValues(initialValues);
        setErrors({});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        clearErrors();

        try {
            await onSubmit(values, { setFieldError, clearErrors, reset });
        } catch (error) {
            console.error("Form submission error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const contextValue = {
        values,
        errors,
        isSubmitting,
        updateField,
        setFieldError,
        clearErrors,
        reset,
    };

    return (
        <FormContext.Provider value={contextValue}>
            <form onSubmit={handleSubmit} className={className} {...props}>
                {children}
            </form>
        </FormContext.Provider>
    );
};

// Form Field Component
export const FormField = ({ name, label, type = "text", placeholder, required = false, className, ...props }) => {
    const { values, errors, updateField } = useFormContext();

    // Default styling
    const defaultFieldClassName = classNames(
        className
    );

    const defaultLabelClassName =
        "text-lg font-medium leading-none text-input-label peer-disabled:cursor-not-allowed peer-disabled:opacity-70";

    const defaultInputClassName =
        "flex h-10 w-full rounded-md border border-input-border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

    const defaultErrorClassName = "text-sm text-red-500";

    return (
        <div className={defaultFieldClassName}>
            {label && (
                <label htmlFor={name} className={defaultLabelClassName}>
                    {label}
                    {required && <span className="text-error-text ml-1">*</span>}
                </label>
            )}
            <Input
                id={name}
                name={name}
                type={type}
                value={values[name] || ""}
                placeholder={placeholder}
                onChange={(e) => updateField(name, e.target.value)}
                className={defaultInputClassName}
                aria-invalid={!!errors[name]}
                aria-describedby={errors[name] ? `${name}-error` : undefined}
                {...props}
            />
            {errors[name] && (
                <p id={`${name}-error`} className={defaultErrorClassName}>
                    {errors[name]}
                </p>
            )}
        </div>
    );
};

// Submit Button Component
export const SubmitButton = ({ children, className, variant = "default", size = "default", submittingText = "Submitting...", ...props }) => {
    const { isSubmitting } = useFormContext();

    return (
        <Button type="submit" disabled={isSubmitting} variant={variant} size={size} className={className} {...props}>
            {isSubmitting ? submittingText : children}
        </Button>
    );
};

// Form Group Component for better organization
export const FormGroup = ({ children, className, ...props }) => {
    return (
        <div className={className} {...props}>
            {children}
        </div>
    );
};

export const FormError = ({ message, className, ...props }) => {
    if (!message) return null;

    return (
        <div className={className} {...props}>
            {message}
        </div>
    );
};


export const FormSuccess = ({ message, className, ...props }) => {
    if (!message) return null;

    return (
        <div className={className} {...props}>
            {message}
        </div>
    );
};
