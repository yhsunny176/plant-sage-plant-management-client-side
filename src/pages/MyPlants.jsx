import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import LoaderSpinner from "../components/shared/Loader/LoaderSpinner";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
// import Swal from "sweetalert2";
import { HiMiniPencil, HiMiniTrash } from "react-icons/hi2";

const MyPlants = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [myPlants, setMyPlants] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch user's plants
    useEffect(() => {
        if (!user?.email) return;

        const fetchMyPlants = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/my-plants/${user.email}`);
                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.message || "Failed to fetch plants");
                }

                setMyPlants(result.data);
            } catch (err) {
                console.error("Error fetching plants:", err);
                toast.error("Failed to fetch your plants. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchMyPlants();
    }, [user?.email]);

    // Format date for display
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    // Get status color based on health
    const getHealthStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case "excellent":
                return "bg-green-100 text-green-800 border-green-200";
            case "good":
                return "bg-blue-100 text-blue-800 border-blue-200";
            case "fair":
                return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "poor":
                return "bg-orange-100 text-orange-800 border-orange-200";
            case "critical":
                return "bg-red-100 text-red-800 border-red-200";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    // Get care level color
    const getCareLevelColor = (level) => {
        switch (level?.toLowerCase()) {
            case "easy":
                return "bg-green-100 text-green-800 border-green-200";
            case "moderate":
                return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "difficult":
                return "bg-red-100 text-red-800 border-red-200";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    // Backend update and delete functionality removed as requested.

    return (
        <section className="bg-background-body py-6 md:py-8 lg:py-12 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-6 md:mb-8">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-heading-secondary mb-3 md:mb-6">
                        My Plants
                    </h2>
                    <p className="text-black-pg-light text-base md:text-lg lg:text-xl max-w-2xl mx-auto px-2">
                        Manage and track all the plants you've added to your collection.
                    </p>
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="flex items-center justify-center py-8">
                        <LoaderSpinner size={40} />
                    </div>
                ) : (
                    <>
                        {/* Plants Grid */}
                        {myPlants.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                                {myPlants.map((plant) => (
                                    <div
                                        key={plant._id}
                                        className="bg-background-body rounded-lg overflow-hidden hover:shadow-nav-menu transition-shadow duration-300 border border-input-border flex flex-col h-full">
                                        <div className="relative">
                                            <img
                                                src={plant.image}
                                                alt={plant.plantName}
                                                className="w-full h-40 md:h-48 object-cover"
                                            />
                                            <div className="absolute top-2 md:top-3 left-2 md:left-3">
                                                <span className="inline-flex items-center px-2 md:px-3 py-1 md:py-1.5 rounded-lg text-lg font-bold bg-white-base black-pg-static border border-input-border capitalize">
                                                    {plant.category}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-4 md:p-6 flex flex-col flex-grow">
                                            <h3 className="font-bold text-lg md:text-xl text-heading-secondary mb-2 md:mb-3">
                                                {plant.plantName}
                                            </h3>

                                            <p className="text-black-pg-light text-base mb-4 md:mb-6 leading-relaxed line-clamp-2">
                                                {plant.description}
                                            </p>

                                            <div className="mt-auto space-y-3 md:space-y-4">
                                                {/* Care Level, Health Status and Watering Frequency */}
                                                <div className="grid grid-cols-2 gap-4 text-base border-y border-input-border py-3">
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-black-pg-base">
                                                            <span className="font-bold">Care Level:</span>
                                                        </span>
                                                        <span
                                                            className={`inline-flex items-center px-4 py-2 rounded text-base font-bold border capitalize ${getCareLevelColor(
                                                                plant.careLevel
                                                            )} w-fit`}>
                                                            {plant.careLevel}
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-black-pg-base">
                                                            <span className="font-bold">Health Status:</span>
                                                        </span>
                                                        <span
                                                            className={`inline-flex items-center px-4 py-2 rounded text-base font-bold border capitalize ${getHealthStatusColor(
                                                                plant.healthStatus
                                                            )} w-fit`}>
                                                            {plant.healthStatus}
                                                        </span>
                                                    </div>
                                                    <div className="col-span-2">
                                                        <span className="text-black-pg-base">
                                                            <span className="font-bold">Watering Frequency:</span>
                                                        </span>
                                                        <p className="text-black-pg-light text-base mt-1">
                                                            {plant.wateringFrequency}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Watering Dates */}
                                                <div className="flex justify-between items-center text-base">
                                                    <div>
                                                        <span className="text-black-pg-base font-bold">
                                                            Last Watered:
                                                        </span>
                                                        <p className="text-black-pg-light text-base">
                                                            {formatDate(plant.lastWateredDate)}
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="text-black-pg-base font-bold">
                                                            Next Watering:
                                                        </span>
                                                        <p className="text-btn-background-primary text-base font-bold">
                                                            {formatDate(plant.nextWateringDate)}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="flex gap-2">
                                                    <Button
                                                        className="flex-1 bg-btn-background-primary hover:bg-btn-background-primary-hover text-white cursor-pointer"
                                                        title="Update plant details">
                                                        <HiMiniPencil className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
                                                        <span>Update</span>
                                                    </Button>
                                                    <Button
                                                        className="flex-1 bg-btn-background-danger hover:bg-btn-background-danger-hover text-white cursor-pointer"
                                                        title="Delete plant">
                                                        <HiMiniTrash className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
                                                        <span>Delete</span>
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 md:py-12">
                                <h3 className="text-lg md:text-xl font-bold text-heading-primary mb-2">
                                    No plants found
                                </h3>
                                <p className="text-black-pg-light mb-4 md:mb-6 text-base md:text-lg">
                                    You haven't added any plants yet. Start building your plant collection!
                                </p>
                                <Button
                                    size="lg"
                                    className="font-bold cursor-pointer"
                                    onClick={() => navigate("/add-plant")}>
                                    Add Your First Plant
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
};

export default MyPlants;
