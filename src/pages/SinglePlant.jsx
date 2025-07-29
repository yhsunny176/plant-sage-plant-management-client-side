import LoaderSpinner from "@/components/shared/Loader/LoaderSpinner";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import { toast } from "react-hot-toast";

const SinglePlant = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [plant, setPlant] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        const apiUrl = `${import.meta.env.VITE_SERVER_URL}/plant-detail/${id}`;

        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((res) => {
                if (res.success === false) {
                    throw new Error(res.message || "Failed to fetch plant");
                }
                setPlant(res.data);
                setLoading(false);
            })
            .catch((err) => {
                const message = err?.message || "Failed to fetch plant";
                toast.error(message);
                setLoading(false);
            });
    }, [id]);

    const {
        plantName,
        image,
        category,
        careLevel,
        wateringFrequency,
        lastWateredDate,
        nextWateringDate,
        healthStatus,
        description,
    } = plant || {};

    // Format dates for display
    const formatDate = (dateString) => {
        if (!dateString) return "Not set";
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    // Get care level color
    const getCareColor = (level) => {
        switch (level?.toLowerCase()) {
            case "easy":
                return "text-success-text";
            case "moderate":
                return "text-black-pg-base";
            case "difficult":
                return "text-error-text";
            default:
                return "text-black-pg-base";
        }
    };

    // Get health status color
    const getHealthColor = (status) => {
        switch (status?.toLowerCase()) {
            case "excellent":
                return "text-success-text";
            case "good":
                return "text-success-text";
            case "fair":
                return "text-black-pg-base";
            case "poor":
                return "text-error-text";
            case "critical":
                return "text-error-text";
            default:
                return "text-black-pg-base";
        }
    };

    return (
        <div className="min-h-[300px] flex flex-col justify-center items-center bg-background-body">
            {loading && (
                <div className="my-10 text-2xl font-bold bg-background-body">
                    <LoaderSpinner />
                </div>
            )}
            {!loading && plant && (
                <div className="max-w-11/12 md:max-w-10/12 lg:max-w-11/12 xl:max-w-9/12 2xl:max-w-8/12 py-12 xl:py-16 mx-auto">
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
                        {/* Image */}
                        <div className="w-full mb-6 lg:mb-0">
                            <img
                                src={image}
                                alt={`This is the image of ${plantName}`}
                                className="w-full h-full object-cover rounded-xl border-2 border-input-border"
                            />
                        </div>

                        <div className="w-full flex flex-col gap-6 sm:gap-8">
                            <div className="flex flex-col gap-2 sm:gap-3">
                                <span className="font-pg text-lg font-bold text-btn-background-primary">Name</span>
                                <h1 className="font-bold gap-2 text-2xl sm:text-3xl text-heading-secondary">
                                    {plantName}
                                </h1>
                            </div>

                            {/* Responsive row for Category and Care Level on mobile, stacked on md+ */}
                            <div className="flex flex-row md:flex-col gap-12 md:gap-8 sm:gap-3 items-stretch w-full">
                                <div className="flex-1 flex flex-col gap-1">
                                    <span className="font-pg text-lg font-bold text-btn-background-primary">
                                        Category
                                    </span>
                                    <h1 className="font-bold gap-2 text-lg sm:text-xl text-heading-secondary capitalize">
                                        {category}
                                    </h1>
                                </div>
                                <div className="hidden md:block h-2"></div>
                                <div className="flex items-center md:hidden px-3">
                                    <div className="w-px h-8 bg-input-border"></div>
                                </div>
                                <div className="flex-1 flex flex-col gap-1">
                                    <span className="font-pg text-lg font-bold text-btn-background-primary">
                                        Care Level
                                    </span>
                                    <h1
                                        className={`font-bold gap-2 text-lg sm:text-xl capitalize ${getCareColor(
                                            careLevel
                                        )}`}>
                                        {careLevel}
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 md:gap-8 py-8 w-full items-stretch">
                        <div className="flex gap-2 sm:gap-3 items-center justify-between md:justify-start">
                            <span className="font-pg text-base sm:text-lg font-bold text-black-pg-light mt-1">
                                Watering:
                            </span>
                            <h1 className="font-bold gap-2 text-2xl sm:text-3xl text-heading-secondary items-center">
                                {wateringFrequency}
                            </h1>
                        </div>

                        <div className="hidden md:block border-r-2 border-input-border"></div>

                        <div className="flex gap-2 sm:gap-3 items-center justify-between md:justify-start">
                            <span className="font-pg text-base sm:text-lg font-bold text-black-pg-light mt-1">
                                Health Status:
                            </span>
                            <h1
                                className={`font-bold gap-2 text-2xl sm:text-3xl items-center capitalize ${getHealthColor(
                                    healthStatus
                                )}`}>
                                {healthStatus}
                            </h1>
                        </div>

                        <div className="hidden md:block border-r-2 border-input-border"></div>

                        <div className="flex gap-2 sm:gap-3 items-center justify-between md:justify-start">
                            <span className="font-pg text-base sm:text-lg font-bold text-black-pg-light mt-1">
                                Last Watered:
                            </span>
                            <h1 className="font-bold gap-2 text-lg sm:text-xl text-heading-secondary items-center">
                                {formatDate(lastWateredDate)}
                            </h1>
                        </div>
                    </div>

                    <div className="border-t-1 border-input-border w-full"></div>

                    <div className="flex flex-col md:flex-row gap-6 md:gap-8 py-6 w-full items-stretch">
                        <div className="flex gap-2 sm:gap-3 items-center justify-between md:justify-start flex-1">
                            <span className="font-pg text-base sm:text-lg font-bold text-black-pg-light mt-1">
                                Next Watering:
                            </span>
                            <h1 className="font-bold gap-2 text-lg sm:text-xl text-heading-secondary items-center">
                                {formatDate(nextWateringDate)}
                            </h1>
                        </div>
                    </div>

                    <div className="border-t-1 border-input-border w-full"></div>

                    <div className="max-w-full flex flex-col gap-3 py-8 sm:py-10">
                        <span className="font-pg text-lg font-bold text-btn-background-primary">Description</span>
                        <p className="text-base sm:text-lg leading-7 sm:leading-8 text-black-pg-light">{description}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SinglePlant;
