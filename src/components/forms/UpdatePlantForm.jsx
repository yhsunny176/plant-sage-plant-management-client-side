import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Form, FormField, FormGroup, SubmitButton } from "@/components/shared/FormComponent";
import { FormSelect, FormTextarea } from "@/components/shared/FormSelect";
import toast from "react-hot-toast";
import { HiMiniXCircle } from "react-icons/hi2";
import useAuth from "@/hooks/useAuth";
import LoaderSpinner from "../shared/Loader/LoaderSpinner";

const UpdatePlantForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [initialValues, setInitialValues] = useState(null);
    const [loading, setLoading] = useState(true);

    // Options (same as AddPlantForm)
    const categoryOptions = [
        { value: "succulent", label: "Succulent" },
        { value: "fern", label: "Fern" },
        { value: "flowering", label: "Flowering" },
        { value: "herb", label: "Herb" },
        { value: "tree", label: "Tree" },
        { value: "shrub", label: "Shrub" },
        { value: "vine", label: "Vine" },
        { value: "grass", label: "Grass" },
        { value: "other", label: "Other" },
    ];
    const careLevelOptions = [
        { value: "easy", label: "Easy" },
        { value: "moderate", label: "Moderate" },
        { value: "difficult", label: "Difficult" },
    ];
    const healthStatusOptions = [
        { value: "excellent", label: "Excellent" },
        { value: "good", label: "Good" },
        { value: "fair", label: "Fair" },
        { value: "poor", label: "Poor" },
        { value: "critical", label: "Critical" },
    ];

    // Fetch plant data by id
    useEffect(() => {
        const fetchPlant = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/plant-detail/${id}`);
                const result = await response.json();
                if (!response.ok || !result.data) throw new Error(result.message || "Failed to fetch plant");
                // Pre-fill all fields
                setInitialValues({
                    image: result.data.image || "",
                    plantName: result.data.plantName || "",
                    category: result.data.category || "",
                    description: result.data.description || "",
                    careLevel: result.data.careLevel || "",
                    wateringFrequency: result.data.wateringFrequency || "",
                    lastWateredDate: result.data.lastWateredDate ? result.data.lastWateredDate.slice(0, 10) : "",
                    nextWateringDate: result.data.nextWateringDate ? result.data.nextWateringDate.slice(0, 10) : "",
                    healthStatus: result.data.healthStatus || "",
                });
            } catch (err) {
                toast.error("Failed to load plant data.");
            } finally {
                setLoading(false);
            }
        };
        fetchPlant();
    }, [id]);

    const validateForm = (values) => {
        const errors = {};
        if (!values.image.trim()) {
            errors.image = "Plant image URL is required";
        } else if (!/^https?:\/\/.+/i.test(values.image.trim())) {
            errors.image = "Please enter a valid image URL";
        }
        if (!values.plantName.trim()) {
            errors.plantName = "Plant name is required";
        } else if (values.plantName.trim().length < 2) {
            errors.plantName = "Plant name must be at least 2 characters long";
        }
        if (!values.category) {
            errors.category = "Please select a category";
        }
        if (!values.description.trim()) {
            errors.description = "Description is required";
        } else if (values.description.trim().length < 10) {
            errors.description = "Description must be at least 10 characters long";
        }
        if (!values.careLevel) {
            errors.careLevel = "Please select a care level";
        }
        if (!values.wateringFrequency.trim()) {
            errors.wateringFrequency = "Watering frequency is required";
        }
        if (!values.lastWateredDate) {
            errors.lastWateredDate = "Last watered date is required";
        } else {
            const lastWateredDate = new Date(values.lastWateredDate);
            const today = new Date();
            if (lastWateredDate > today) {
                errors.lastWateredDate = "Last watered date cannot be in the future";
            }
        }
        if (!values.nextWateringDate) {
            errors.nextWateringDate = "Next watering date is required";
        } else {
            const nextWateringDate = new Date(values.nextWateringDate);
            const lastWateredDate = new Date(values.lastWateredDate);
            if (values.lastWateredDate && nextWateringDate <= lastWateredDate) {
                errors.nextWateringDate = "Next watering date must be after last watered date";
            }
        }
        if (!values.healthStatus) {
            errors.healthStatus = "Please select a health status";
        }
        return errors;
    };

    const handleSubmit = async (values, { setFieldError }) => {
        const errors = validateForm(values);
        if (Object.keys(errors).length > 0) {
            Object.entries(errors).forEach(([field, error]) => {
                setFieldError(field, error);
            });
            return;
        }
        try {
            const plantData = {
                ...values,
                image: values.image.trim(),
                plantName: values.plantName.trim(),
                description: values.description.trim(),
                wateringFrequency: values.wateringFrequency.trim(),
            };
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/update-plant/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(plantData),
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.message || "Failed to update plant");
            toast.success("Plant updated successfully!");
            navigate(`/my-plants/${user.email}`);
        } catch (error) {
            console.error("Update plant error:", error);
            toast.error("Failed to update plant. Please try again.", {
                duration: 4000,
                icon: <HiMiniXCircle />,
            });
        }
    };

    if (loading || !initialValues) {
        return (
            <div className="text-center py-12">
                <LoaderSpinner />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background-body py-6 md:py-8 lg:py-12">
            <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-6 md:mb-8">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-heading-secondary mb-3 md:mb-4">
                        Update Plant
                    </h1>
                    <p className="text-black-pg-light text-sm md:text-base lg:text-lg max-w-2xl mx-auto px-2">
                        Update your plant's information and keep its care journey up to date.
                    </p>
                </div>
                <div className="bg-background-body rounded-xl shadow-lg border border-input-border p-4 md:p-6 lg:p-8">
                    <Form initialValues={initialValues} onSubmit={handleSubmit}>
                        <FormGroup className="space-y-6 md:space-y-8">
                            <FormField
                                name="image"
                                label="Plant Image"
                                type="url"
                                placeholder="Enter plant image URL"
                                required
                            />
                            <FormField
                                name="plantName"
                                label="Plant Name"
                                type="text"
                                placeholder="Enter plant name"
                                required
                            />
                            <FormSelect
                                name="category"
                                label="Category"
                                options={categoryOptions}
                                placeholder="Select plant category"
                                required
                            />
                            <FormTextarea
                                name="description"
                                label="Description"
                                placeholder="Describe your plant (care tips, special features, etc.)"
                                rows={4}
                                required
                            />
                            <FormSelect
                                name="careLevel"
                                label="Care Level"
                                options={careLevelOptions}
                                placeholder="Select care difficulty level"
                                required
                            />
                            <FormField
                                name="wateringFrequency"
                                label="Watering Frequency"
                                type="text"
                                placeholder="e.g., every 3 days, twice a week, etc."
                                required
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                <FormField name="lastWateredDate" label="Last Watered Date" type="date" required />
                                <FormField name="nextWateringDate" label="Next Watering Date" type="date" required />
                            </div>
                            <FormSelect
                                name="healthStatus"
                                label="Health Status"
                                options={healthStatusOptions}
                                placeholder="Select current health status"
                                required
                            />
                        </FormGroup>
                        <div className="pt-6">
                            <SubmitButton className="submit-btn-form login-btn" submittingText="Updating Plant...">
                                Update Plant
                            </SubmitButton>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default UpdatePlantForm;
