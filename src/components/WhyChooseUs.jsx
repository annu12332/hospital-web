import React, { useState } from 'react';
import { Link } from 'react-router'; 
import { motion, AnimatePresence } from 'framer-motion';
import {
    Microscope, ShieldAlert, Thermometer, Eye, Scissors, Brain, Baby, Pill,
    ChevronLeft, ChevronRight, Activity, Heart, Droplets, Stethoscope,
    User, Syringe, Radio, Wind, ArrowRight, CheckCircle2, Award
} from 'lucide-react';

const WhyChooseUs = () => {
    const [startIndex, setStartIndex] = useState(0);
    const itemsPerPage = 10;

    const specialityCards = [
        { id: "spec-001", name: "Accident & Emergency", icon: <ShieldAlert />, color: "rose" },
        { id: "spec-002", name: "Anaesthesia", icon: <Syringe />, color: "blue" },
        { id: "spec-003", name: "Blood Bank", icon: <Droplets />, color: "red" },
        { id: "spec-004", name: "Cancer Care Center", icon: <Activity />, color: "purple" },
        { id: "spec-005", name: "Cardiology", icon: <Heart />, color: "pink" },
        { id: "spec-006", name: "Cardiothoracic Surgery", icon: <Scissors />, color: "indigo" },
        { id: "spec-007", name: "Counselling Center", icon: <User />, color: "teal" },
        { id: "spec-008", name: "Critical Care Unit", icon: <Activity />, color: "orange" },
        { id: "spec-009", name: "Dental Surgery", icon: <Activity />, color: "sky" },
        { id: "spec-010", name: "Dermatology", icon: <Activity />, color: "cyan" },
        { id: "spec-011", name: "Dietetics & Nutrition", icon: <Pill />, color: "green" },
        { id: "spec-012", name: "Endocrinology", icon: <Thermometer />, color: "amber" },
        { id: "spec-013", name: "ENT Surgery", icon: <Activity />, color: "emerald" },
        { id: "spec-014", name: "Gastroenterology", icon: <Activity />, color: "violet" },
        { id: "spec-015", name: "General Surgery", icon: <Scissors />, color: "slate" },
        { id: "spec-016", name: "Internal Medicine", icon: <Stethoscope />, color: "blue" },
        { id: "spec-017", name: "Lab Medicine", icon: <Microscope />, color: "fuchsia" },
        { id: "spec-018", name: "Neonatology", icon: <Baby />, color: "sky" },
        { id: "spec-019", name: "Nephrology", icon: <Activity />, color: "blue" },
        { id: "spec-020", name: "Neurology", icon: <Brain />, color: "purple" },
        { id: "spec-021", name: "Neurosurgery", icon: <Brain />, color: "indigo" },
        { id: "spec-022", name: "Gynaecology", icon: <User />, color: "rose" },
        { id: "spec-023", name: "Ophthalmology", icon: <Eye />, color: "cyan" },
        { id: "spec-024", name: "Orthopaedics", icon: <Activity />, color: "stone" },
        { id: "spec-025", name: "Paediatrics", icon: <Baby />, color: "orange" },
        { id: "spec-026", name: "Radiology", icon: <Radio />, color: "blue" },
        { id: "spec-027", name: "Urology", icon: <Wind />, color: "teal" }
    ];

    const nextSlide = () => {
        if (startIndex + itemsPerPage < specialityCards.length) setStartIndex(startIndex + itemsPerPage);
    };

    const prevSlide = () => {
        if (startIndex - itemsPerPage >= 0) setStartIndex(startIndex - itemsPerPage);
    };

    const visibleCards = specialityCards.slice(startIndex, startIndex + itemsPerPage);

    const getColorClasses = (color) => {
        const classes = {
            rose: "bg-rose-50 border-rose-100 text-rose-600 hover:bg-rose-100",
            blue: "bg-blue-50 border-blue-100 text-blue-600 hover:bg-blue-100",
            red: "bg-red-50 border-red-100 text-red-600 hover:bg-red-100",
            purple: "bg-purple-50 border-purple-100 text-purple-600 hover:bg-purple-100",
            pink: "bg-pink-50 border-pink-100 text-pink-600 hover:bg-pink-100",
            indigo: "bg-indigo-50 border-indigo-100 text-indigo-600 hover:bg-indigo-100",
            teal: "bg-teal-50 border-teal-100 text-teal-600 hover:bg-teal-100",
            orange: "bg-orange-50 border-orange-100 text-orange-600 hover:bg-orange-100",
            sky: "bg-sky-50 border-sky-100 text-sky-600 hover:bg-sky-100",
            cyan: "bg-cyan-50 border-cyan-100 text-cyan-600 hover:bg-cyan-100",
            green: "bg-green-50 border-green-100 text-green-600 hover:bg-green-100",
            amber: "bg-amber-50 border-amber-100 text-amber-600 hover:bg-amber-100",
            emerald: "bg-emerald-50 border-emerald-100 text-emerald-600 hover:bg-emerald-100",
            violet: "bg-violet-50 border-violet-100 text-violet-600 hover:bg-violet-100",
            slate: "bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100",
            fuchsia: "bg-fuchsia-50 border-fuchsia-100 text-fuchsia-600 hover:bg-fuchsia-100",
            stone: "bg-stone-50 border-stone-100 text-stone-600 hover:bg-stone-100",
        };
        return classes[color] || classes.blue;
    };

    return (
        <section className="py-24 px-6 md:px-12 lg:px-20 bg-[#f8fbff] flex justify-center overflow-hidden">
            {/* Main Container - Controlled Width for better spacing */}
            <div className="max-w-6xl w-full">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-8">
                    <div className="max-w-xl text-center md:text-left">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold mb-4"
                        >
                            <Award size={14} />
                            <span>BANGLADESH'S MOST TRUSTED CARE</span>
                        </motion.div>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#002B49] leading-tight">
                            World-Class Care <span className="text-blue-600">Close to Home</span>
                        </h2>
                    </div>
                    <div className="max-w-sm">
                        <p className="text-gray-500 text-sm md:text-base border-l-4 border-blue-500 pl-4 leading-relaxed">
                            Evercare Hospital Chattogram provides advanced clinical care through 27+ specialized departments.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Side: Professional Branding */}
                    <div className="lg:w-1/3">
                        <div className="relative h-full min-h-[400px] rounded-[2.5rem] overflow-hidden group shadow-xl">
                            <img
                                src="https://media.istockphoto.com/id/2187596982/photo/portrait-of-smiling-african-woman-nurse.jpg?s=612x612&w=0&k=20&c=OC0idN57sR1dpEOCIaBX9ger5rJk9tl5hK7HX-xM8nA="
                                alt="Care"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#002B49] via-transparent to-transparent opacity-90" />
                            
                            <div className="absolute bottom-6 left-6 right-6 p-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl text-white">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 bg-blue-500 rounded-xl flex items-center justify-center">
                                        <CheckCircle2 size={20} />
                                    </div>
                                    <p className="font-bold text-lg">JCI Accredited</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Grid */}
                    <div className="lg:w-2/3 bg-white rounded-[2.5rem] p-6 md:p-8 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-bold text-[#002B49]">Specialized Services</h3>
                            <div className="flex gap-2">
                                <button onClick={prevSlide} disabled={startIndex === 0}
                                    className="p-2.5 rounded-full border border-gray-100 bg-gray-50 hover:bg-blue-600 hover:text-white transition-all disabled:opacity-20">
                                    <ChevronLeft size={18} />
                                </button>
                                <button onClick={nextSlide} disabled={startIndex + itemsPerPage >= specialityCards.length}
                                    className="p-2.5 rounded-full border border-gray-100 bg-gray-50 hover:bg-blue-600 hover:text-white transition-all disabled:opacity-20">
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                            <AnimatePresence mode="wait">
                                {visibleCards.map((item, idx) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ delay: idx * 0.03 }}
                                    >
                                        <Link
                                            to={`/spec/${item.id}`}
                                            className={`group flex flex-col items-center justify-center p-4 rounded-3xl border transition-all h-[130px] ${getColorClasses(item.color)}`}
                                        >
                                            <div className="mb-3 group-hover:scale-110 transition-transform">
                                                {React.cloneElement(item.icon, { size: 26, strokeWidth: 1.5 })}
                                            </div>
                                            <span className="text-[10px] font-bold uppercase tracking-tight leading-tight text-center">
                                                {item.name}
                                            </span>
                                        </Link>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        <div className="mt-8">
                            <Link
                                to="/all-spec"
                                className="w-full flex items-center justify-center gap-2 py-4 bg-[#002B49] text-white rounded-2xl font-bold text-xs hover:bg-blue-700 transition-colors tracking-widest uppercase"
                            >
                                VIEW ALL DEPARTMENTS
                                <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;