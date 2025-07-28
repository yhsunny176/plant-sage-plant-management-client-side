import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import banner1 from "../../assets/Banner/banner-1.webp";
import banner2 from "../../assets/Banner/banner-2.webp";
import banner3 from "../../assets/Banner/banner-3.webp";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import "../../css/swiper.css";

// import required modules
import { Autoplay, Keyboard, EffectFade, Pagination } from "swiper/modules";
import { Link, useNavigate } from "react-router";
import { Button } from "../ui/button";

const Banner = () => {
    const navigate = useNavigate();
    const handleSeeAllDishes = () => {
        navigate("/all-foods");
    };
    return (
        <>
            <Swiper
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                keyboard={{
                    enabled: true,
                }}
                effect={"fade"}
                modules={[Autoplay, Keyboard, EffectFade, Pagination]}
                className="mySwiper">
                {/* Slider 1 */}
                <SwiperSlide>
                    <div className="relative h-full w-full">
                        {/* Image */}
                        <img
                            src={banner1}
                            alt="Banner image 1 containing dracaena genus plants"
                            className="banner-img"
                        />

                        {/* Texts */}
                        <div className="banner-main-container">
                            <div className="banner-text-container">
                                <h1 className="banner-heading">
                                    Water Wisely, <span className="italic">Not Excessively</span>
                                </h1>
                                <p className="banner-subtext">
                                    Step into a world of refined flavors, where each dish tells a story and every bite
                                    is an unforgettable experience.
                                </p>

                                <Button asChild className="btn-banner">
                                    <Link to="/all-plants">See Plants</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                {/* Slider 2 */}
                <SwiperSlide>
                    <div className="relative h-full w-full">
                        {/* Image */}
                        <img
                            src={banner2}
                            alt="Banner image 1 containing dracaena genus plants"
                            className="banner-img"
                        />

                        {/* Texts */}
                        <div className="banner-main-container">
                            <div className="banner-text-container">
                                <h1 className="banner-heading">
                                    Sunlight Secrets for <span className="italic">Healthy Growth</span>
                                </h1>
                                <p className="banner-subtext">
                                    Place Dracaenas in bright, indirect sunlight to keep their leaves vibrant. Avoid
                                    harsh direct sun, which can cause leaf burn.
                                </p>

                                <Button asChild className="btn-banner">
                                    <Link to="/all-plants">See Plants</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                {/* Slider 3 */}
                <SwiperSlide>
                    <div className="relative h-full w-full">
                        {/* Image */}
                        <img
                            src={banner3}
                            alt="Banner image 1 containing dracaena genus plants"
                            className="banner-img"
                        />

                        {/* Texts */}
                        <div className="banner-main-container">
                            <div className="banner-text-container">
                                <h1 className="banner-heading">
                                    Feeding Your Green <span className="italic">Companion</span>
                                </h1>
                                <p className="banner-subtext">
                                    Fertilize Dracaenas monthly during spring and summer with a balanced houseplant
                                    fertilizer. Skip feeding during winter to let the plant rest.
                                </p>

                                <Button asChild className="btn-banner">
                                    <Link to="/all-plants">See Plants</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    );
};

export default Banner;
