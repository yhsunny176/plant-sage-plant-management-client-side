import React from "react";
import { ClipLoader } from "react-spinners";

const LoaderSpinner = ({ size = 24, color = "#dc2626", className = "flex justify-center items-center min-h-64" }) => {
    return (
        <div className={className}>
            <ClipLoader
                color={color}
                size={size}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
};

export default LoaderSpinner;