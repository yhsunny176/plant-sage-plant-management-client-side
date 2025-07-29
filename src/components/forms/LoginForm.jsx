import React, { useContext } from "react";
import { Form, FormField, FormGroup, SubmitButton } from "@/components/shared/FormComponent";
import toast from "react-hot-toast";
import { HiMiniXCircle } from "react-icons/hi2";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "@/contexts/AuthContext";
import { Link, useNavigate } from "react-router";

const LoginForm = () => {
    const { signInUser, signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const initialValues = {
        email: "",
        password: "",
    };

    const validateForm = (values) => {
        const errors = {};

        // Email validation
        if (!values.email.trim()) {
            errors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
            errors.email = "Please enter a valid email address";
        }

        // Password validation
        if (!values.password) {
            errors.password = "Password is required";
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
            await signInUser(values.email, values.password);

            reset();
            navigate("/", {
                state: { message: "Login successful! Welcome back.", type: "success" },
            });
        } catch (error) {
            console.error("Login error:", error);
            toast.error("Login failed. Please check your credentials and try again.", {
                duration: 4000,
                icon: <HiMiniXCircle />,
            });
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
            navigate("/", {
                state: { message: "Login successful! Welcome back.", type: "success" },
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
                    <img src="/logo-primary.png" alt="Logo" className="h-12 w-auto cursor-pointer hover:opacity-80 transition-opacity duration-300" />
                </Link>
            </div>

            <div className="mb-4 sm:mb-6">
                <h2 className="text-4xl text-center sm:text-2xl lg:text-3xl font-bold md:text-left mb-2 text-heading-secondary">
                    Welcome Back
                </h2>
                <p className="text-black-pg-light text-center md:text-left text-base sm:text-base leading-relaxed">
                    Sign in to your account to continue
                </p>
            </div>

            <Form initialValues={initialValues} onSubmit={handleSubmit}>
                <FormGroup className="space-y-8 sm:space-y-6">
                    <FormField
                        name="email"
                        label="Email Address"
                        type="email"
                        placeholder="Enter your email"
                        required
                    />

                    <FormField
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        required
                    />
                </FormGroup>

                <div className="flex items-center justify-between">
                    <Link to="/forgot-password" className="text-base text-black-pg-base mt-6 hover:underline">
                        Forgot password?
                    </Link>
                </div>

                <SubmitButton
                    className="w-full mt-4 sm:mt-6 login-btn h-10 sm:h-11 text-base md:text-lg px-4 py-2 rounded-md font-medium transition-all duration-300"
                    submittingText="Signing In...">
                    Sign In
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
                        className="w-full flex items-center justify-center gap-2 bg-background-body text-btn-background-primary p-3 rounded-lg border border-input-border font-semibold hover:bg-background-body cursor-pointer transition ease-in duration-400">
                        <FcGoogle size={24} />
                        Sign in with Google
                    </button>
                </div>

                <div className="text-center mt-3 sm:mt-4">
                    <p className="text-base text-black-pg-light">
                        Don't have an account?{" "}
                        <a href="/auth/registration" className="link-form">
                            Create one here
                        </a>
                    </p>
                </div>
            </Form>
        </div>
    );
};

export default LoginForm;
