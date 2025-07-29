import Banner from "@/components/common/Banner";
import React, { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useLocation } from "react-router";

const Home = () => {
    const location = useLocation();
    const { message, type } = location.state || {};
    const toastShown = useRef(false);

    useEffect(() => {
        if (message && type === "success" && !toastShown.current) {
            toast.success(message, {
                duration: 4000,
                icon: <IoIosCheckmarkCircle />,
            });
            toastShown.current = true;
        }

        if (message) {
            window.history.replaceState({}, document.title);
        }
    }, [message, type]);

    return (
        <section className="w-full h-[320px] md:h-[440px] lg:h-[720px] xl:h-[780px]">
            <Banner />
        </section>
    );
};

export default Home;
