import { useFormContext } from "@/hooks/useFormContext";
import { classNames } from "@/lib/utils";

// Custom FormSelect Component for dropdown fields
export const FormSelect = ({ name, label, options = [], placeholder, required = false, className, ...props }) => {
    const { values, errors, updateField } = useFormContext();

    // Default styling matching FormField
    const defaultFieldClassName = classNames(className);

    const defaultLabelClassName =
        "text-lg font-medium leading-none text-input-label peer-disabled:cursor-not-allowed peer-disabled:opacity-70";

    const defaultSelectClassName =
        "flex h-10 w-full rounded-md bg-input-background border border-input-border px-3 py-2 text-input-text-primary text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none cursor-pointer";

    const defaultErrorClassName = "text-sm text-red-500";

    return (
        <div className={defaultFieldClassName}>
            {label && (
                <label htmlFor={name} className={defaultLabelClassName}>
                    {label}
                    {required && <span className="text-error-text ml-1">*</span>}
                </label>
            )}
            <div className="relative">
                <select
                    id={name}
                    name={name}
                    value={values[name] || ""}
                    onChange={(e) => updateField(name, e.target.value)}
                    className={defaultSelectClassName}
                    aria-invalid={!!errors[name]}
                    aria-describedby={errors[name] ? `${name}-error` : undefined}
                    {...props}>
                    {placeholder && (
                        <option value="" disabled>
                            {placeholder}
                        </option>
                    )}
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                {/* Dropdown arrow icon */}
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width={20}
                        height={20}
                        color={"#000000"}
                        fill={"none"}>
                        <path
                            d="M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            </div>
            {errors[name] && (
                <p id={`${name}-error`} className={defaultErrorClassName}>
                    {errors[name]}
                </p>
            )}
        </div>
    );
};

// Custom FormTextarea Component for description field
export const FormTextarea = ({ name, label, placeholder, required = false, rows = 4, className, ...props }) => {
    const { values, errors, updateField } = useFormContext();

    const defaultFieldClassName = classNames(className);

    const defaultLabelClassName =
        "text-lg font-medium leading-none text-input-label peer-disabled:cursor-not-allowed peer-disabled:opacity-70";

    const defaultTextareaClassName =
        "flex min-h-[80px] w-full rounded-md bg-input-background border border-input-border px-3 py-2 text-input-text-primary placeholder-input-placeholder text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-vertical";

    const defaultErrorClassName = "text-sm text-red-500";

    return (
        <div className={defaultFieldClassName}>
            {label && (
                <label htmlFor={name} className={defaultLabelClassName}>
                    {label}
                    {required && <span className="text-error-text ml-1">*</span>}
                </label>
            )}
            <textarea
                id={name}
                name={name}
                value={values[name] || ""}
                placeholder={placeholder}
                rows={rows}
                onChange={(e) => updateField(name, e.target.value)}
                className={defaultTextareaClassName}
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
