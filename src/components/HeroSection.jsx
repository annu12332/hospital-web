import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, User, Calendar, FileText, Headphones, Map, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router';
import { path } from 'framer-motion/client';

const HeroSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1600",
            title: "Expert Care for You",
            subtitle: "Advanced technology meets compassionate care at Evercare Hospital."
        },
        {
            url: "https://images.unsplash.com/photo-1758206523745-1f334f702660?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWVkaWNhbCUyMHN1cHBvcnR8ZW58MHx8MHx8fDA%3D",
            title: "24/7 Medical Support",
            subtitle: "Our international experts are always ready to help you and your family."
        },
        {
            url: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1600",
            title: "Safe & Trusted Labs",
            subtitle: "Get accurate results and diagnostics from our world-class laboratory."
        }
    ];

    const actionCards = [
        { title: "Find Doctor", icon: <User size={20} />, path: "/doctors" },
        { title: "Appointment", icon: <Calendar size={20} /> , path: "/apointment"},
        { title: "Reports", icon: <FileText size={20} />, },
        { title: "Tele-Consult", icon: <Headphones size={20} />,path: "/consult" },
        { title: "Guide", icon: <Map size={20} /> },
    ];

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, [slides.length]);

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, [nextSlide]);

    return (
        <section className="relative w-full bg-[#F8FAFC] pt-24 pb-12">
            {/* --- SLIDER CONTAINER --- */}
            <div className="max-w-7xl mx-auto px-4 md:px-10">
                <div className="relative h-[350px] md:h-[450px] lg:h-[500px] w-full overflow-hidden rounded-[32px] shadow-2xl">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8 }}
                            className="absolute inset-0"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-[#002B49]/80 via-[#002B49]/20 to-transparent z-10" />
                            <img
                                src={slides[currentSlide].url}
                                alt="Evercare"
                                className="w-full h-full object-cover"
                            />

                            {/* Text Content */}
                            <div className="absolute inset-0 z-20 flex items-center px-8 md:px-16">
                                <div className="max-w-xl">
                                    <motion.h2
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight"
                                    >
                                        {slides[currentSlide].title}
                                    </motion.h2>
                                    <motion.p
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.1 }}
                                        className="text-gray-100 text-sm md:text-base mb-6 font-medium"
                                    >
                                        {slides[currentSlide].subtitle}
                                    </motion.p>
                                    <Link to ="/about"><button className="bg-[#4FC3F7] text-[#002B49] px-6 py-3 rounded-xl font-bold text-xs uppercase hover:bg-white transition-all shadow-lg flex items-center gap-2">
                                        Learn More <ArrowRight size={16} />
                                    </button></Link>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Dots */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
                        {slides.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentSlide(i)}
                                className={`h-1.5 transition-all rounded-full ${i === currentSlide ? 'w-8 bg-[#4FC3F7]' : 'w-2 bg-white/50'}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

         {/* --- QUICK ACTION CARDS --- */}
<div className="max-w-6xl mx-auto px-6 -mt-10 relative z-40">
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
        {actionCards.map((card, index) => (
            <Link 
                key={index} 
                to={card.path} 
                className={`block ${
                    index === actionCards.length - 1 ? 'col-span-2 sm:col-span-1' : ''
                }`}
            >
                <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-white hover:bg-[#002B49] group border border-gray-100 p-4 rounded-2xl shadow-sm flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 h-full"
                >
                    <div className="w-10 h-10 bg-blue-50 group-hover:bg-white/10 rounded-full flex items-center justify-center mb-2 text-[#002B49] group-hover:text-[#4FC3F7] transition-colors">
                        {card.icon}
                    </div>
                    <h3 className="text-[11px] md:text-xs font-bold text-[#002B49] group-hover:text-white uppercase tracking-wide transition-colors">
                        {card.title}
                    </h3>
                </motion.div>
            </Link>
        ))}
    </div>
</div>

            {/* Bottom Accent Line */}
            <div className="mt-12 flex h-1 w-full opacity-20">
                <div className="flex-1 bg-[#002B49]"></div>
                <div className="flex-1 bg-[#4FC3F7]"></div>
                <div className="flex-1 bg-[#002B49]"></div>
            </div>
        </section>
    );
};

export default HeroSection;