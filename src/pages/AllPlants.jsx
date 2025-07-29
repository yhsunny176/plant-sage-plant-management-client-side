import React, { useEffect, useState } from "react";
import LoaderSpinner from "../components/shared/Loader/LoaderSpinner";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { Leaf } from "lucide-react";
import { format, parseISO } from "date-fns";

const AllPlants = () => {
    const [allPlants, setAllPlants] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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

    // Format date for display using date-fns
    const formatDate = (dateString) => {
        try {
            const date = parseISO(dateString);
            return format(date, 'MMM dd, yyyy');
        } catch (error) {
            console.error('Error formatting date:', error);
            return 'Invalid date';
        }
    };

    // Get status color based on health
    const getHealthStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'excellent':
                return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800';
            case 'good':
                return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800';
            case 'fair':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800';
            case 'poor':
                return 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800';
            case 'critical':
                return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800/20 dark:text-gray-400 dark:border-gray-700';
        }
    };

    // Get care level color
    const getCareLevelColor = (level) => {
        switch (level?.toLowerCase()) {
            case 'easy':
                return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800';
            case 'moderate':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800';
            case 'difficult':
                return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800/20 dark:text-gray-400 dark:border-gray-700';
        }
    };

    if (loading) {
        return (
            <div className="min-h-dvh flex items-center justify-center bg-background-primary">
                <LoaderSpinner />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background-primary py-6 md:py-8 lg:py-12">
            <div className="max-w-10/12 mx-auto px-4 md:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-6 md:mb-8">
                    <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold text-black-text-dark mb-3 md:mb-4 pt-6">
                        All Plants Collection
                    </h1>
                    <p className="text-black-text-light text-md lg:text-lg xl:text-xl max-w-2xl mx-auto px-2">
                        Discover and manage all the amazing plants in your collection.
                    </p>
                </div>

                {/* Plants Table Display */}
                {allPlants.length === 0 ? (
                    <div className="text-center py-8 md:py-12">
                        <div className="mb-4 bg-card-background max-w-max mx-auto p-6 rounded-lg">
                            <Leaf className="text-black-text-dark size-12" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-medium text-black-text-base mb-2">No Plants found</h3>
                        <p className="text-black-text-light mb-4 md:mb-6 text-md lg:text-lg xl:text-xl">
                            You have not added any plants yet.
                        </p>
                        <Link
                            to="/add-plant"
                            className="inline-flex items-center px-4 py-2 bg-btn-background-primary text-btn-text-primary rounded-md hover:bg-btn-hover-bg transition-colors duration-300"
                        >
                            Add Your First Plant
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto bg-card-background rounded-lg border border-card-stroke shadow-card-shadow">
                        <table className="min-w-full divide-y divide-card-stroke">
                            <thead className="bg-background-primary">
                                <tr>
                                    <th className="px-4 py-5 text-left text-md font-semibold text-black-text-base uppercase">
                                        Plant Name
                                    </th>
                                    <th className="px-4 py-5 text-left text-md font-semibold text-black-text-base uppercase">
                                        Category
                                    </th>
                                    <th className="px-4 py-5 text-left text-md font-semibold text-black-text-base uppercase">
                                        Care Level
                                    </th>
                                    <th className="px-4 py-5 text-left text-md font-semibold text-black-text-base uppercase">
                                        Health Status
                                    </th>
                                    <th className="px-4 py-5 text-left text-md font-semibold text-black-text-base uppercase">
                                        Watering Frequency
                                    </th>
                                    <th className="px-4 py-5 text-left text-md font-semibold text-black-text-base uppercase">
                                        Last Watered
                                    </th>
                                    <th className="px-4 py-5 text-left text-md font-semibold text-black-text-base uppercase">
                                        Next Watering
                                    </th>
                                    <th className="px-4 py-5 text-left text-md font-semibold text-black-text-base uppercase">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-card-background divide-y divide-card-stroke">
                                {allPlants.map((plant) => (
                                    <tr key={plant._id} className="hover:bg-background-primary/60 transition-colors">
                                        <td className="px-4 py-5 text-black-text-base font-medium whitespace-nowrap">
                                            <div className="flex items-center">
                                                <img
                                                    src={plant.image}
                                                    alt={plant.plantName}
                                                    className="w-10 h-10 rounded-full object-cover mr-3"
                                                />
                                                {plant.plantName}
                                            </div>
                                        </td>
                                        <td className="px-4 py-5 text-black-text-base whitespace-nowrap">
                                            <span className="inline-flex items-center px-2 py-1 rounded text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800 capitalize">
                                                {plant.category}
                                            </span>
                                        </td>
                                        <td className="px-4 py-5 text-black-text-base whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2 py-1 rounded text-sm font-medium border ${getCareLevelColor(plant.careLevel)}`}>
                                                {plant.careLevel}
                                            </span>
                                        </td>
                                        <td className="px-4 py-5 text-black-text-base whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2 py-1 rounded text-sm font-medium border ${getHealthStatusColor(plant.healthStatus)}`}>
                                                {plant.healthStatus}
                                            </span>
                                        </td>
                                        <td className="px-4 py-5 text-black-text-base whitespace-nowrap">
                                            {plant.wateringFrequency}
                                        </td>
                                        <td className="px-4 py-5 text-black-text-base whitespace-nowrap">
                                            {formatDate(plant.lastWateredDate)}
                                        </td>
                                        <td className="px-4 py-5 text-btn-background-primary font-bold whitespace-nowrap">
                                            {formatDate(plant.nextWateringDate)}
                                        </td>
                                        <td className="px-4 py-5 whitespace-nowrap">
                                            <button
                                                className="inline-flex items-center px-3 py-2 text-md font-medium text-white bg-btn-background-primary hover:bg-btn-hover-bg rounded-md transition-colors duration-300 cursor-pointer"
                                                title="View plant details"
                                                onClick={() => navigate(`/plant/${plant._id}`)}>
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllPlants;