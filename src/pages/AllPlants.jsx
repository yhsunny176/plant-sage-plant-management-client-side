import React, { useEffect, useState } from "react";
import LoaderSpinner from "../components/shared/Loader/LoaderSpinner";
import toast from "react-hot-toast";
import { Link } from "react-router";

const AllPlants = () => {
    const [allPlants, setAllPlants] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch all plants
    useEffect(() => {
        const fetchAllPlants = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/all-plants`);
                const result = await response.json();
                
                if (!response.ok) {
                    throw new Error(result.message || "Failed to fetch plants");
                }
                
                setAllPlants(result.data);
            } catch (err) {
                console.error("Error fetching plants:", err);
                toast.error("Failed to fetch plants. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchAllPlants();
    }, []);

    // Format date for display
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Get status color based on health
    const getHealthStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'excellent':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'good':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'fair':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'poor':
                return 'bg-orange-100 text-orange-800 border-orange-200';
            case 'critical':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    // Get care level color
    const getCareLevelColor = (level) => {
        switch (level?.toLowerCase()) {
            case 'easy':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'moderate':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'difficult':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background-body">
                <LoaderSpinner size={40} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background-body py-6 md:py-8 lg:py-12">
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-6 md:mb-8">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-heading-secondary mb-3 md:mb-6">
                        All Plants Collection
                    </h1>
                    <p className="text-black-pg-light text-base md:text-lg lg:text-xl max-w-2xl mx-auto px-2">
                        Discover and manage all the amazing plants in your collection.
                    </p>
                </div>

                {/* Plants Display */}
                {allPlants.length === 0 ? (
                    <div className="text-center py-8 md:py-12">
                        <div className="mb-4">
                            <svg
                                className="mx-auto h-16 w-16 md:h-24 md:w-24 text-black-pg-light"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1}
                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                />
                            </svg>
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-heading-primary mb-2">No plants found</h3>
                        <p className="text-black-pg-light mb-4 md:mb-6 text-base md:text-lg">
                            No plants have been added yet.
                        </p>
                        <Link
                            to="/add-plant"
                            className="inline-flex items-center px-4 py-2 bg-btn-background-primary text-btn-text-primary rounded-md hover:bg-btn-hover-bg transition-colors duration-300"
                        >
                            Add Your First Plant
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                            {allPlants.map((plant) => (
                                <div
                                    key={plant._id}
                                    className="bg-background-body rounded-lg overflow-hidden hover:shadow-nav-menu transition-shadow duration-300 border border-input-border flex flex-col h-full cursor-pointer"
                                >
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
                                                    <span className={`inline-flex items-center px-2 py-1 rounded text-base font-bold border ${getCareLevelColor(plant.careLevel)} w-fit`}>
                                                        {plant.careLevel}
                                                    </span>
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-black-pg-base">
                                                        <span className="font-bold">Health Status:</span>
                                                    </span>
                                                    <span className={`inline-flex items-center px-2 py-1 rounded text-base font-bold border ${getHealthStatusColor(plant.healthStatus)} w-fit`}>
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
                                                    <span className="text-black-pg-base font-bold">Last Watered:</span>
                                                    <p className="text-black-pg-light text-base">
                                                        {formatDate(plant.lastWateredDate)}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-black-pg-base font-bold">Next Watering:</span>
                                                    <p className="text-btn-background-primary text-base font-bold">
                                                        {formatDate(plant.nextWateringDate)}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* View Details Button */}
                                            <button
                                                className="w-full inline-flex items-center justify-center px-3 md:px-4 py-2 md:py-3 text-base font-bold text-btn-text-primary bg-btn-background-primary hover:bg-btn-hover-bg rounded-md transition-colors duration-300 cursor-pointer"
                                                title="View plant details"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2"
                                                    viewBox="0 0 24 24"
                                                    width={20}
                                                    height={20}
                                                    fill="none"
                                                >
                                                    <path
                                                        d="M21.544 11.045C21.848 11.4713 22 11.6845 22 12C22 12.3155 21.848 12.5287 21.544 12.955C20.1779 14.8706 16.6892 19 12 19C7.31078 19 3.8221 14.8706 2.45604 12.955C2.15201 12.5287 2 12.3155 2 12C2 11.6845 2.15201 11.4713 2.45604 11.045C3.8221 9.12944 7.31078 5 12 5C16.6892 5 20.1779 9.12944 21.544 11.045Z"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                    />
                                                    <path
                                                        d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                    />
                                                </svg>
                                                <span>View Details</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Results Summary */}
                        <div className="text-center mt-8 text-black-pg-light">
                            <p className="text-base">
                                Showing {allPlants.length} plants
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default AllPlants;