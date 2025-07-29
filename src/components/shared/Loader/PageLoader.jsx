import React from "react";
import Lottie from "lottie-react";
import pageLoader from "@/assets/Loading/pageloader.json";

const PageLoader = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-loading-bg z-50">
            <div className="w-40 h-40 flex items-center justify-center">
                <Lottie animationData={pageLoader} loop={true} />
            </div>
        </div>
    );
};

export default PageLoader;
