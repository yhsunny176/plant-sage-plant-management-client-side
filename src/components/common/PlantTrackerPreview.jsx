import React from "react";
import { HiOutlineCalendar, HiOutlineCamera, HiOutlineBell } from "react-icons/hi2";
import trackerImg from "@/assets/Banner/section-banner-2.jpg";

const features = [
    {
        icon: <HiOutlineCalendar size={28} className="text-heading-secondary" />,
        title: "Track Watering & Growth",
        desc: "Log each watering, fertilizing, and growth milestone to keep your plants thriving.",
    },
    {
        icon: <HiOutlineCamera size={28} className="text-heading-secondary" />,
        title: "Photo Journal",
        desc: "Add photos to your plant's timeline and watch its progress over time.",
    },
    {
        icon: <HiOutlineBell size={28} className="text-heading-secondary" />,
        title: "Care Reminders",
        desc: "Set custom reminders for watering, repotting, and more—never miss a care day!",
    },
];

const PlantTrackerPreview = () => {
    return (
        <section className="w-full py-16 bg-background-body flex flex-col items-center justify-center">
            <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-10 px-4 md:px-8">
                {/* Image Card */}
                <div className="flex-1 flex items-center justify-center">
                    <div className="overflow-hidden rounded-2xl shadow-lg bg-card-background border border-card-stroke w-full max-w-lg aspect-[4/3] flex items-center justify-center">
                        <img
                            src={trackerImg}
                            alt="Plant Tracker Preview"
                            className="object-cover w-full h-full"
                            style={{ minHeight: 260 }}
                        />
                    </div>
                </div>
                {/* Text Card */}
                <div className="flex-1 flex flex-col gap-6 bg-card-background rounded-2xl shadow-lg border border-card-stroke px-6 py-8">
                    <h2 className="text-3xl md:text-4xl font-bold leading-tight text-heading-secondary">
                        Plant Tracker & Journal
                    </h2>
                    <p className="text-black-pg-base text-base md:text-lg">
                        Take your plant care to the next level! Track watering, growth, and care routines, add photos,
                        and set reminders—all in one place. Make every plant story memorable.
                    </p>
                    <ul className="flex flex-col gap-3 mt-2">
                        {features.map((f, i) => (
                            <li key={i} className="flex items-start gap-3">
                                {f.icon}
                                <div>
                                    <h3 className="font-semibold text-heading-secondary text-xl mb-2">{f.title}</h3>
                                    <p className="text-black-pg-base leading-relaxed text-base">{f.desc}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <button className="mt-6 w-fit px-6 py-2 rounded-full font-semibold shadow transition-colors duration-300 bg-btn-background-primary text-btn-text-primary hover:bg-btn-hover-bg border border-btn-outline">
                        More About This Feature
                    </button>
                </div>
            </div>
        </section>
    );
};

export default PlantTrackerPreview;
