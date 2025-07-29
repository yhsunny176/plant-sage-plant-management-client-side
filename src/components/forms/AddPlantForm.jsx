import React from "react";
import { Form, FormField, FormGroup, SubmitButton } from "@/components/shared/FormComponent";
import { FormSelect, FormTextarea } from "@/components/shared/FormSelect";
import toast from "react-hot-toast";
import { HiMiniXCircle } from "react-icons/hi2";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const AddPlantForm = () => {
    const navigate = useNavigate();

    const initialValues = {
        image: "",
        plantName: "",
        category: "",
        description: "",
        careLevel: "",
        wateringFrequency: "",
        lastWateredDate: "",
        nextWateringDate: "",
        healthStatus: "",
    };

    // Category options
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

    // Care level options
    const careLevelOptions = [
        { value: "easy", label: "Easy" },
        { value: "moderate", label: "Moderate" },
        { value: "difficult", label: "Difficult" },
    ];

    // Health status options
    const healthStatusOptions = [
        { value: "excellent", label: "Excellent" },
        { value: "good", label: "Good" },
        { value: "fair", label: "Fair" },
        { value: "poor", label: "Poor" },
        { value: "critical", label: "Critical" },
    ];

    const validateForm = (values) => {
        const errors = {};

        // Image validation
        if (!values.image.trim()) {
            errors.image = "Plant image URL is required";
        } else if (!/^https?:\/\/.+/i.test(values.image.trim())) {
            errors.image = "Please enter a valid image URL";
        }

        // Plant name validation
        if (!values.plantName.trim()) {
            errors.plantName = "Plant name is required";
        } else if (values.plantName.trim().length < 2) {
            errors.plantName = "Plant name must be at least 2 characters long";
        }

        // Category validation
        if (!values.category) {
            errors.category = "Please select a category";
        }

        // Description validation
        if (!values.description.trim()) {
            errors.description = "Description is required";
        } else if (values.description.trim().length < 10) {
            errors.description = "Description must be at least 10 characters long";
        }

        // Care level validation
        if (!values.careLevel) {
            errors.careLevel = "Please select a care level";
        }

        // Watering frequency validation
        if (!values.wateringFrequency.trim()) {
            errors.wateringFrequency = "Watering frequency is required";
        }

        // Last watered date validation
        if (!values.lastWateredDate) {
            errors.lastWateredDate = "Last watered date is required";
        } else {
            const lastWateredDate = new Date(values.lastWateredDate);
            const today = new Date();
            if (lastWateredDate > today) {
                errors.lastWateredDate = "Last watered date cannot be in the future";
            }
        }

        // Next watering date validation
        if (!values.nextWateringDate) {
            errors.nextWateringDate = "Next watering date is required";
        } else {
            const nextWateringDate = new Date(values.nextWateringDate);
            const lastWateredDate = new Date(values.lastWateredDate);
            if (values.lastWateredDate && nextWateringDate <= lastWateredDate) {
                errors.nextWateringDate = "Next watering date must be after last watered date";
            }
        }

        // Health status validation
        if (!values.healthStatus) {
            errors.healthStatus = "Please select a health status";
        }

        return errors;
    };

    const handleSubmit = async (values, { setFieldError, reset }) => {
        // Validate form
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

            // Send data to backend API
            const response = await fetch("http://localhost:5000/add-plant", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(plantData),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to add plant");
            }

            // Reset form first
            reset();

            // Show sweet alert
            const swalResult = await Swal.fire({
                title: "Plant Added Successfully!",
                text: "Your plant has been added to your collection.",
                icon: "success",
                showCancelButton: true,
                confirmButtonText: "See All Plants",
                cancelButtonText: "Add Another Plant",
                confirmButtonColor: "#10b981",
                cancelButtonColor: "#6b7280",
                reverseButtons: true,
                allowOutsideClick: false,
                allowEscapeKey: false,
            });

            if (swalResult.isConfirmed) {
                // Navigate to all plants page
                navigate("/all-plants", {
                    state: { message: "Plant added successfully!", type: "success" },
                });
            }
            // If cancelled (Add Another Plant), stay on the current page
        } catch (error) {
            console.error("Add plant error:", error);
            toast.error("Failed to add plant. Please try again.", {
                duration: 4000,
                icon: <HiMiniXCircle />,
            });
        }
    };

    return (
        <div className="min-h-screen bg-background-body py-6 md:py-8 lg:py-12">
            <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-6 md:mb-8">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-heading-secondary mb-3 md:mb-4">
                        Add New Plant
                    </h1>
                    <p className="text-black-pg-light text-sm md:text-base lg:text-lg max-w-2xl mx-auto px-2">
                        Add a new plant to your collection and start tracking its care journey with love and attention.
                    </p>
                </div>

                {/* Form Container */}
                <div className="bg-background-body rounded-xl shadow-lg border border-input-border p-4 md:p-6 lg:p-8">
                    <Form initialValues={initialValues} onSubmit={handleSubmit}>
                        <FormGroup className="space-y-6 md:space-y-8">
                            {/* Plant Image */}
                            <FormField
                                name="image"
                                label="Plant Image"
                                type="url"
                                placeholder="Enter plant image URL"
                                required
                            />

                            {/* Plant Name */}
                            <FormField
                                name="plantName"
                                label="Plant Name"
                                type="text"
                                placeholder="Enter plant name"
                                required
                            />

                            {/* Category */}
                            <FormSelect
                                name="category"
                                label="Category"
                                options={categoryOptions}
                                placeholder="Select plant category"
                                required
                            />

                            {/* Description */}
                            <FormTextarea
                                name="description"
                                label="Description"
                                placeholder="Describe your plant (care tips, special features, etc.)"
                                rows={4}
                                required
                            />

                            {/* Care Level */}
                            <FormSelect
                                name="careLevel"
                                label="Care Level"
                                options={careLevelOptions}
                                placeholder="Select care difficulty level"
                                required
                            />

                            {/* Watering Frequency */}
                            <FormField
                                name="wateringFrequency"
                                label="Watering Frequency"
                                type="text"
                                placeholder="e.g., every 3 days, twice a week, etc."
                                required
                            />

                            {/* Date Fields Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                {/* Last Watered Date */}
                                <FormField name="lastWateredDate" label="Last Watered Date" type="date" required />

                                {/* Next Watering Date */}
                                <FormField name="nextWateringDate" label="Next Watering Date" type="date" required />
                            </div>

                            {/* Health Status */}
                            <FormSelect
                                name="healthStatus"
                                label="Health Status"
                                options={healthStatusOptions}
                                placeholder="Select current health status"
                                required
                            />
                        </FormGroup>

                        {/* Submit Button */}
                        <div className="pt-6">
                            <SubmitButton className="submit-btn-form login-btn" submittingText="Adding Plant...">
                                Add Plant
                            </SubmitButton>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default AddPlantForm;
