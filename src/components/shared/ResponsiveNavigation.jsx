import React, { useState } from "react";
import { Link, useLocation } from "react-router";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { RxHamburgerMenu } from "react-icons/rx";

const ResponsiveNavigation = () => {
    const { theme } = useTheme();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    // Desktop Navigation Menu
    const DesktopNavigation = () => (
        <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className={"space-x-6"}>
                {/* Home Link */}
                <NavigationMenuItem className={"nav-link"}>
                    <Link to="/">
                        <NavigationMenuLink className={"nav-link"}>Home</NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>

                {/* About Link */}
                <NavigationMenuItem>
                    <Link to="/all-plants">
                        <NavigationMenuLink className={"nav-link"}>All Plants</NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>

                {/* Services Link */}
                <NavigationMenuItem>
                    <Link to="/add-plants">
                        <NavigationMenuLink className={"nav-link"}>Add Plants</NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>

                {/* Contact Link */}
                <NavigationMenuItem>
                    <Link to="/my-plants">
                        <NavigationMenuLink className={"nav-link"}>My Plants</NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>

                {/* Blog Link */}
                <NavigationMenuItem>
                    <Link to="/care-tips">
                        <NavigationMenuLink className={"nav-link"}>Care Tips</NavigationMenuLink>
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
                    <nav className="flex flex-col gap-6 mt-6 px-8 *:text-xl">
                        {/* Home Link */}
                        <Link to="/" onClick={() => setIsOpen(false)} className={"nav-link"}>
                            Home
                        </Link>

                        {/* About Link */}
                        <Link to="/all-plants" onClick={() => setIsOpen(false)} className={"nav-link"}>
                            All Plants
                        </Link>

                        {/* Services Link */}
                        <Link to="/add-plants" onClick={() => setIsOpen(false)} className={"nav-link"}>
                            Add Plants
                        </Link>

                        {/* Contact Link */}
                        <Link to="/my-plants" onClick={() => setIsOpen(false)} className={"nav-link"}>
                            My Plants
                        </Link>

                        {/* Blog Link */}
                        <Link to="/care-tips" onClick={() => setIsOpen(false)} className={"nav-link"}>
                            Blog
                        </Link>
                    </nav>
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
