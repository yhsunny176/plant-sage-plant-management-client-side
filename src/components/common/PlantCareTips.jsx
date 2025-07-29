import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "../../css/swiper.css";

import { HiArrowLongLeft, HiArrowLongRight } from "react-icons/hi2";

import banner1 from "@/assets/Banner/section-banner-1.png";
import banner2 from "@/assets/Banner/section-banner-2.jpg";
import banner3 from "@/assets/Banner/section-banner-3.jpg";

const slides = [
    {
        image: banner1,
        title: "Let Soil Dry Between Waterings",
        desc: "Allow the top inch of soil to dry out before watering again. Overwatering is a common cause of root rot in houseplants.",
    },
    {
        image: banner2,
        title: "Rotate Plants For Even Growth",
        desc: "Turn your plants every week so all sides receive sunlight. This helps prevent leaning and promotes balanced growth.",
    },
    {
        image: banner3,
        title: "Clean Leaves To Boost Health",
        desc: "Wipe leaves gently with a damp cloth to remove dust. Clean leaves absorb more light and help your plant thrive.",
    },
];

const PlantCareTips = () => {
    const swiperRef = useRef(null);

    return (
        <div className="relative w-full min-h-[480px] flex items-center justify-center overflow-hidden">
            <Swiper
                modules={[Navigation, Autoplay]}
                navigation={{
                    prevEl: ".plant-tips-prev",
                    nextEl: ".plant-tips-next",
                }}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                loop={true}
                className="plant-tips-swiper w-full h-full"
                onSwiper={(swiper) => (swiperRef.current = swiper)}>
                {slides.map((slide, idx) => (
                    <SwiperSlide key={idx}>
                        <div className="relative w-full h-[480px] flex items-center justify-center">
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="absolute inset-0 w-full h-full object-cover z-0 transition-all duration-700"
                                style={{ filter: "brightness(0.6)" }}
                            />
                            <div className="banner-main-container justify-center items-center text-center h-full">
                                <div className="relative banner-text-container items-center text-center p-4 sm:p-6 md:p-8">
                                    <div className="absolute inset-0 rounded-sm bg-white-base/40 backdrop-blur-lg opacity-90 -z-10" />
                                    <h2 className="banner-heading">{slide.title}</h2>
                                    <p className="text-white-base">{slide.desc}</p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            {/* Custom navigation arrows */}
            <div className="absolute bottom-4 right-4 flex gap-2 z-20">
                <button
                    className="plant-tips-prev flex items-center justify-center w-10 h-10 rounded-full border-white-base border-[1.5px] bg-transparent text-white-base hover:bg-white-base/10 transition-colors duration-300"
                    aria-label="Previous tip">
                    <HiArrowLongLeft size={24} className="text-white-base-base transition-colors duration-300 cursor-pointer" />
                </button>
                <button
                    className="plant-tips-next flex items-center justify-center w-10 h-10 rounded-full border-white-base border-[1.5px] bg-transparent text-white-base hover:bg-white-base/10 transition-colors duration-300"
                    aria-label="Next tip">
                    <HiArrowLongRight size={24} className="text-white-base transition-colors duration-300 cursor-pointer" />
                </button>
            </div>
        </div>
    );
};

export default PlantCareTips;
