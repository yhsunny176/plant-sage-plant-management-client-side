import React, { useState } from "react";
import { Link } from "react-router";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { RxHamburgerMenu } from "react-icons/rx";
import useAuth from "@/hooks/useAuth";
import LoaderSpinner from "./Loader/LoaderSpinner";

const ResponsiveNavigation = () => {
    const { theme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const { user, loading, logOut } = useAuth();

    const handleLogOut = () => {
        logOut();
    };

    // Desktop Navigation Menu
    const DesktopNavigation = () => (
        <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className={"space-x-6"}>
                {/* Home Link */}
                <NavigationMenuItem>
                    <Link className={"nav-link"} to="/">
                        Home
                    </Link>
                </NavigationMenuItem>

                {/* About Link */}
                <NavigationMenuItem>
                    <Link className="nav-link" to="/all-plants">
                        All Plants
                    </Link>
                </NavigationMenuItem>

                {/* Services Link */}
                <NavigationMenuItem>
                    <Link className="nav-link" to="/add-plant">
                        Add Plants
                    </Link>
                </NavigationMenuItem>

                {/* Contact Link */}
                <NavigationMenuItem>
                    <Link className="nav-link" to="/my-plants/:email">
                        My Plants
                    </Link>
                </NavigationMenuItem>

                {/* Blog Link */}
                <NavigationMenuItem>
                    <Link className="nav-link" to="/care-tips">
                        Care Tips
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );

    // Mobile Navigation Menu
    const MobileNavigation = () => (
        <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <Button size={"nav"} className="lg:hidden cursor-pointer">
                        <RxHamburgerMenu size={20} />
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[500px] bg-background-body shadow-md">
                    <SheetHeader className="pb-4">
                        <SheetTitle className="flex items-center gap-6 text-left">
                            <img
                                src={theme === "light" ? "/logo-primary.png" : "/logo-darkmode.png"}
                                alt="Plant Sage Logo"
                                className="h-10 w-auto"
                            />
                        </SheetTitle>
                    </SheetHeader>
                    <nav className="flex flex-col gap-8 my-6 px-8">
                        {/* Home Link */}
                        <Link to="/" onClick={() => setIsOpen(false)} className={"nav-link-mobile"}>
                            Home
                        </Link>

                        {/* About Link */}
                        <Link to="/all-plants" onClick={() => setIsOpen(false)} className={"nav-link-mobile"}>
                            All Plants
                        </Link>

                        {/* Services Link */}
                        <Link to="/add-plant" onClick={() => setIsOpen(false)} className={"nav-link-mobile"}>
                            Add Plants
                        </Link>

                        {/* Contact Link */}
                        <Link to="/my-plants/:email" onClick={() => setIsOpen(false)} className={"nav-link-mobile"}>
                            My Plants
                        </Link>

                        {/* Blog Link */}
                        <Link to="/care-tips" onClick={() => setIsOpen(false)} className={"nav-link-mobile"}>
                            Blog
                        </Link>
                    </nav>

                    <div className="flex-none lg:hidden px-8">
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <LoaderSpinner size={20} color="#ffffff" className="flex justify-center items-center" />
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
                </SheetContent>
            </Sheet>
        </div>
    );

    return (
        <>
            <DesktopNavigation />
            <MobileNavigation />
        </>
    );
};

export default ResponsiveNavigation;
