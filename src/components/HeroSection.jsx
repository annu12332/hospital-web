import React, { useState, useEffect, useCallback } from "react";
import { User, Calendar, FileText, Headphones, Map, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";

const HeroSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1800",
            title: "A Calmer Standard of Care",
            subtitle: "Thoughtfully designed healthcare experiences for your well-being."
        },
        {
            url: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1800",
            title: "Precision, Without Anxiety",
            subtitle: "Advanced diagnostics with human-first clarity and expert care."
        },
        {
            url: "https://media.istockphoto.com/id/1291088784/photo/female-ems-professional-paramedic-using-tablet-computer-to-fill-a-questionnaire-for-the.jpg?s=612x612&w=0&k=20&c=VVhRp3P_VpjimBgF0OfB1sZ5gPXLcUQBN4OY5AHpj08=",
            title: "Emergency Care 24/7",
            subtitle: "Rapid response and advanced life support whenever you need it most."
        }
    ];

    const actionCards = [
        { title: "find Doctor", icon: <User size={20} />, path: "/doctors", color: "text-blue-600", bg: "bg-blue-50" },
        { title: "Appointment", icon: <Calendar size={20} />, path: "/apointment", color: "text-emerald-600", bg: "bg-emerald-50" },
        { title: "Reports", icon: <FileText size={20} />, path: "#", color: "text-amber-600", bg: "bg-amber-50" },
        { title: "Tele Consult", icon: <Headphones size={20} />, path: "/consult", color: "text-purple-600", bg: "bg-purple-50" },
        { title: "Guide", icon: <Map size={20} />, path: "#", color: "text-rose-600", bg: "bg-rose-50" }
    ];

    const nextSlide = useCallback(() => {
        setCurrentSlide((p) => (p === slides.length - 1 ? 0 : p + 1));
    }, [slides.length]);

    useEffect(() => {
        const timer = setInterval(nextSlide, 6000);
        return () => clearInterval(timer);
    }, [nextSlide]);

    return (
        <section className="w-full bg-[#FDFDFD] mt-13 py-12 lg:py-24 overflow-hidden">
            <div className="max-w-6xl mx-auto px-6 lg:px-12">

                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* TEXT CONTENT - Mobile Order 2 */}
                    <div className="w-full lg:w-1/2 order-2 lg:order-1 text-center lg:text-left">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentSlide}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
                                    <span className="w-8 h-[2px] bg-blue-600 hidden lg:block"></span>
                                    <span className="text-[10px] tracking-[0.4em] font-bold text-blue-600 uppercase">
                                        Evercare Hospital
                                    </span>
                                </div>

                                <h1 className="text-4xl md:text-6xl font-serif text-slate-900 leading-[1.1] mb-6">
                                    {slides[currentSlide].title}
                                </h1>

                                <p className="text-base md:text-lg text-slate-500 max-w-sm mx-auto lg:mx-0 mb-10 font-light leading-relaxed">
                                    {slides[currentSlide].subtitle}
                                </p>

                                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8">
                                    <Link to="/apointment" className="group flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition-all duration-300 shadow-xl shadow-blue-100">
                                        <span className="text-xs font-bold uppercase tracking-widest">Book Now</span>
                                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                    <Link to="/doctors" className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors border-b-2 border-transparent hover:border-slate-900 pb-1">
                                        Find a Doctor
                                    </Link>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* IMAGE & ACTION BAR - Mobile Order 1 */}
                    <div className="w-full lg:w-1/2 order-1 lg:order-2 relative">
                        <div className="relative aspect-[4/3] md:aspect-[16/10] lg:aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={currentSlide}
                                    src={slides[currentSlide].url}
                                    initial={{ opacity: 0, scale: 1.15 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.9, ease: "easeOut" }}
                                    className="w-full h-full object-cover"
                                />
                            </AnimatePresence>
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
                        </div>

                        {/* ACTION BAR */}
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[95%] md:w-[90%] lg:w-[115%] lg:-left-12 lg:translate-x-0 z-30">
                            {/* Background container */}
                            <div className="bg-transparent md:transparent lg:transparent backdrop-blur-none md:backdrop-blur-2xl border-none md:border md:border-white/50 p-4 md:p-6 rounded-[2rem] shadow-none md:shadow-[0_25px_60px_rgba(0,0,0,0.12)] flex justify-between items-center gap-2 md:gap-4">

                                {actionCards.map((card, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{ y: [0, -6, 0] }}
                                        transition={{
                                            duration: 5,
                                            repeat: Infinity,
                                            delay: i * 0.5,
                                            ease: "easeInOut"
                                        }}
                                        className="flex-1"
                                    >
                                        <Link to={card.path} className="group flex flex-col items-center gap-3">

                                            {/* Icon */}
                                            <div
                                                className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl ${card.bg} ${card.color}
                                                            flex items-center justify-center
                                                            transition-all duration-300
                                                            group-hover:scale-110
                                                            shadow-[0_0_15px_rgba(0,0,0,0.1)] md:shadow-sm
                                                            `}
                                                style={{
                                                    filter: `drop-shadow(0 0 10px ${card.glowColor || 'rgba(99,102,241,0.8)'})`
                                                }}
                                            >
                                                {card.icon}
                                            </div>

                                            {/* Glowing Text */}
                                            <span
                                                className="text-[8px] md:text-[12px] lg:text-[15px] font-bold md:text-[10px]font-bold uppercase tracking-tighter text-blue-900
                                                            text-center
                                                            transition-all duration-300
                                                            filter
                                                            drop-shadow-[0_0_4px_rgba(0,0,0,0.4)]
                                                            group-hover:text-slate-900
                                                            group-hover:drop-shadow-[0_0_8px_rgba(99,102,241,0.9)]"
                                                style={{
                                                    filter: `drop-shadow(0 0 6px ${card.glowColor || 'rgba(99,102,241,0.8)'})`
                                                }}
                                            >
                                                {card.title}
                                            </span>

                                        </Link>
                                    </motion.div>
                                ))}

                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default HeroSection;