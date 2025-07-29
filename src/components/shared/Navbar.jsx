import React from "react";
import { Link } from "react-router";
import { useTheme } from "@/hooks/useTheme";
import useAuth from "@/hooks/useAuth";
import ResponsiveNavigation from "./ResponsiveNavigation";
import ThemeToggle from "./ThemeToggle";
import LoaderSpinner from "./Loader/LoaderSpinner";
import { Button } from "../ui/button";
import Avatar from "./Avatar";

const Navbar = () => {
    const { theme } = useTheme();
    const { user, loading, logOut } = useAuth();

    const handleLogOut = () => {
        logOut();
    };

    return (
        <nav className="w-full flex flex-col items-center bg-background-body h-20 py-4 shadow-nav-menu">
            <div className="container flex h-16 items-center justify-between mx-auto max-w-10/12 xl:max-w-6xl 2xl:max-w-7xl">
                {/* Logo */}
                <Link to="/" className="flex items-center justify-center">
                    <div className="w-40 h-12">
                        <img
                            src={theme === "light" ? "/logo-primary.png" : "/logo-darkmode.png"}
                            className="w-full h-full object-contain"
                            alt="Plant Sage Logo"
                        />
                    </div>
                </Link>

                {/* Navigation */}
                <div className="flex items-center gap-6 2xl:gap-32">
                    {/* Mobile Theme Toggle */}
                    <div className="lg:hidden">
                        <ThemeToggle />
                    </div>

                    <div className="flex-none lg:hidden">
                        <Avatar />
                    </div>

                    <ResponsiveNavigation />

                    <div className="flex items-center gap-4">
                        {/* Desktop Theme Toggle */}
                        <div className="hidden lg:block">
                            <ThemeToggle />
                        </div>

                        <div className="flex-none hidden lg:block">
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <LoaderSpinner
                                        size={20}
                                        color="#ffffff"
                                        className="flex justify-center items-center"
                                    />
                                </div>
                            ) : user ? (
                                <Button className="login-btn" onClick={handleLogOut}>
                                    Logout
                                </Button>
                            ) : (
                                <Button asChild>
                                    <Link to={"/auth/login"} className={"login-btn"}>
                                        Login
                                    </Link>
                                </Button>
                            )}
                        </div>

                        <div className="flex-none hidden lg:block">
                            <Avatar />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
