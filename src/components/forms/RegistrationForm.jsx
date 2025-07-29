import React, { useContext } from "react";
import { Form, FormField, FormGroup, SubmitButton } from "@/components/shared/FormComponent";
import toast from "react-hot-toast";
import { HiMiniXCircle } from "react-icons/hi2";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "@/contexts/AuthContext";
import { Link, useNavigate } from "react-router";

const RegistrationForm = () => {
    const { createUser, updateUser, setUser, signInWithGoogle } = useContext(AuthContext);

    const navigate = useNavigate();

    const initialValues = {
        name: "",
        email: "",
        password: "",
        photoURL: "",
    };

    const validateForm = (values) => {
        const errors = {};

        // Name validation
        if (!values.name.trim()) {
            errors.name = "Name is required";
        } else if (values.name.trim().length < 3) {
            errors.name = "Name must be at least 3 characters long";
        }

        // Email validation
        if (!values.email.trim()) {
            errors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
            errors.email = "Please enter a valid email address";
        }

        // Photo URL validation
        if (!values.photoURL.trim()) {
            errors.photoURL = "Photo URL is required";
        } else if (!/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(values.photoURL.trim())) {
            errors.photoURL = "Please enter a valid image URL (jpg, jpeg, png, gif, webp)";
        }

        // Password validation
        if (!values.password) {
            errors.password = "Password is required";
        } else if (!/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(values.password)) {
            errors.password =
                "Password must be at least 6 characters long and contain both uppercase and lowercase letters";
        }

        return errors;
    };

    const handleSubmit = async (values, { setFieldError, reset }) => {

        // Validate form
        const errors = validateForm(values);

        const username = values.name.trim();
        const email = values.email.trim();
        const photo = values.photoURL.trim();
        const password = values.password;

        if (Object.keys(errors).length > 0) {
            Object.entries(errors).forEach(([field, error]) => {
                setFieldError(field, error);
            });
            return;
        }

        try {
            const result = await createUser(email, password);
            const user = result.user;
            
            // Prepare profile update data
            const profileData = {};
            if (username) {
                profileData.displayName = username;
            }
            if (photo) {
                profileData.photoURL = photo;
            }
            
            if (Object.keys(profileData).length > 0) {
                await updateUser(profileData);
            }
            
            reset();
            navigate("/", {
                state: { message: "Registration successful! Welcome to our platform.", type: "success" },
            });
        } catch (error) {
            console.error("Registration error:", error);
            toast.error("Registration failed. Please try again.", {
                duration: 4000,
                icon: <HiMiniXCircle />,
            });
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
            navigate("/", {
                state: { message: "Registration successful! Welcome to our platform.", type: "success" },
            });
        } catch (error) {
            console.error("Google sign-in error:", error);
            toast.error("Google sign-in failed. Please try again.", {
                duration: 4000,
                icon: <HiMiniXCircle />,
            });
        }
    };

    return (
        <div className="max-w-11/12 mx-auto">
            {/* Logo */}
            <div className="flex justify-center md:justify-start mb-8">
                <Link to="/">
                    <img
                        src="/logo-primary.png"
                        alt="Logo"
                        className="h-12 w-auto cursor-pointer hover:opacity-80 transition-opacity duration-300"
                    />
                </Link>
            </div>
            
            <div className="mb-4 sm:mb-6">
                <h2 className="text-4xl text-center sm:text-2xl lg:text-3xl font-bold md:text-left mb-2 text-heading-secondary">
                    Let's Grow Together
                </h2>
                <p className="text-black-pg-light text-center md:text-left text-base sm:text-base leading-relaxed">
                    Join and start tracking your plant babies with love, care, and timely reminders.
                </p>
            </div>

            <Form initialValues={initialValues} onSubmit={handleSubmit}>
                <FormGroup className="space-y-8 sm:space-y-6">
                    <FormField
                        name="name"
                        label="Full Name"
                        type="text"
                        placeholder="Enter your full name"
                        required
                    />

                    <FormField
                        name="email"
                        label="Email Address"
                        type="email"
                        placeholder="Enter your email"
                        required
                    />

                    <FormField
                        name="photoURL"
                        label="Photo URL"
                        type="url"
                        placeholder="Enter your photo URL"
                        required
                    />

                    <FormField
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="Create a password"
                        required
                    />
                </FormGroup>

                <SubmitButton
                    className="submit-btn-form login-btn"
                    submittingText="Signing Up..."
                >
                    Create Account
                </SubmitButton>

                {/* Divider */}
                <div className="flex items-center my-6">
                    <div className="flex-1 border-t border-input-border"></div>
                    <span className="px-4 text-sm text-black-pg-light">or</span>
                    <div className="flex-1 border-t border-input-border"></div>
                </div>

                {/* Google Login Button */}
                <div>
                    <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        className="w-full flex items-center justify-center gap-2 bg-input-background text-black-pg-base p-3 rounded-lg border border-input-border font-semibold hover:bg-background-body cursor-pointer transition ease-in duration-400">
                        <FcGoogle size={24} />
                        Sign up with Google
                    </button>
                </div>

                <div className="text-center mt-3 sm:mt-4">
                    <p className="text-base text-black-pg-light">
                        Already have an account?{" "}
                        <Link to="/auth/login" className="link-form">
                            Sign in here
                        </Link>
                    </p>
                </div>
            </Form>
        </div>
    );
};

export default RegistrationForm;
