import useAuth from "@/hooks/useAuth";
import { useState } from "react";
import LoaderSpinner from "./Loader/LoaderSpinner";
import avatarPlaceholder from "@/assets/avatar-placeholder.png";

const Avatar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { user, loading } = useAuth();

    return (
        <div>
            {/* Avatar */}
            {loading ? (
                <LoaderSpinner />
            ) : user ? (
                <div className="flex-none relative cursor-pointer">
                    <div onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                        {user?.photoURL ? (
                            <img
                                src={user.photoURL}
                                alt={"User Avatar"}
                                className="avatar-img"
                                onError={(e) => {
                                    e.target.src = avatarPlaceholder;
                                }}
                            />
                        ) : (
                            <img
                                src={avatarPlaceholder}
                                alt="User Avatar"
                                className="avatar-img"
                            />
                        )}
                    </div>
                    {/* Dropdown menu */}
                    <div
                        className={`absolute right-0 space-y-4 px-2 text-center top-full mt-2 w-48 bg-white-base rounded-lg shadow-md py-2 z-50 transform origin-top
                                    transition-all duration-300 ease-in-out ${
                                        isDropdownOpen
                                            ? "opacity-100 scale-y-100 translate-y-0"
                                            : "opacity-0 scale-y-95 translate-y-2 pointer-events-none"
                                    }`}>
                        <span className="text-xl font-bold text-black-pg-base">Username:</span>
                        <p className="font-medium text-base text-black-light-static">
                            {user.displayName || user.email?.split('@')[0] || 'User'}
                        </p>
                    </div>
                    {isDropdownOpen && (
                        <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)}></div>
                    )}
                </div>
            ) : null}
        </div>
    );
};

export default Avatar;
