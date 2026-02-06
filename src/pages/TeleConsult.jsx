import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Video, Calendar, Clock, Award, ThumbsUp,
    Star, ArrowRight, ShieldCheck, Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';

const TeleConsult = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/doctors.json')
            .then(res => res.json())
            .then(data => {
                setDoctors(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching data:", err);
                setLoading(false);
            });
    }, []);

    // Animation Configurations
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.2 }
        }
    };

    const cardVariants = {
        hidden: { y: 30, opacity: 0, scale: 0.95 },
        visible: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: { type: 'spring', stiffness: 100, damping: 12 }
        }
    };

    if (loading) return (
        <div className="h-screen w-full flex items-center justify-center bg-slate-50">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"
            />
        </div>
    );

    return (
        <div className="bg-[#f8fafc] min-h-screen py-13 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/40 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-100/40 rounded-full blur-[120px] -z-10" />

            <div className="max-w-7xl mx-auto">

                {/* Header Section */}
                <header className="relative text-center mb-24 mt-16 px-4">
                    {/* Minimal Background Glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10">
                        <div className="w-[500px] h-[300px] bg-blue-600/10 rounded-full blur-[120px]"></div>
                    </div>

                    {/* Thin Line Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-3 px-4 py-1.5 border-l-2 border-blue-600 bg-white shadow-sm mb-5"
                    >
                        <span className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-[0.3em]">
                            Telehealth 2026
                        </span>
                        <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
                        <span className="text-[10px] md:text-xs font-bold text-blue-600 uppercase tracking-widest">
                            Live Now
                        </span>
                    </motion.div>

                    {/*  Heading */}
                    <div className="relative">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="text-2xl md:text-4xl lg:text-6xl font-black text-[#0f172a] tracking-tight leading-none"
                        >
                            Expert Care. <br />
                            <span className="text-blue-600 italic font-light">Anywhere.</span>
                        </motion.h1>
                    </div>

                    {/* Clean Subtext */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="mt-2 max-w-xl mx-auto"
                    >
                        <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed border-t border-slate-100 pt-2">
                            Direct video access to board-certified specialists.
                            <span className="text-[#0f172a] block ">Simple, secure, and purely professional.</span>
                        </p>
                    </motion.div>

                    {/* Icons */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mt-2 flex justify-center items-center gap-8 md:gap-16"
                    >
                        {[
                            { icon: <Video size={20} />, label: "HD Video" },
                            { icon: <ShieldCheck size={20} />, label: "Encrypted" },
                            { icon: <Clock size={20} />, label: "24/7 Access" }
                        ].map((item, index) => (
                            <div key={index} className="flex flex-col items-center gap-2 group cursor-default">
                                <div className="text-slate-300 group-hover:text-blue-600 transition-colors duration-300">
                                    {item.icon}
                                </div>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                                    {item.label}
                                </span>
                            </div>
                        ))}
                    </motion.div>
                </header>

                {/* Doctors Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 xl:grid-cols-2 gap-10"
                >
                    <AnimatePresence>
                        {doctors.map((dr) => (
                            <motion.div
                                key={dr.id}
                                variants={cardVariants}
                                whileHover={{ y: -10 }}
                                className="group bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-white hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 flex flex-col md:flex-row gap-10 relative"
                            >
                                {/* Floating Badge */}
                                <div className="absolute top-8 right-8 z-20">
                                    <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${dr.status === 'online' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-100 text-slate-500 border border-slate-200'}`}>
                                        <span className={`w-2 h-2 rounded-full ${dr.status === 'online' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></span>
                                        {dr.status || 'Offline'}
                                    </div>
                                </div>

                                {/* Left: Profile Visual */}
                                <div className="md:w-[40%] flex flex-col items-center md:items-start text-center md:text-left">
                                    <div className="relative mb-6">
                                        <div className="absolute inset-0 bg-blue-600 rounded-[2rem] rotate-6 group-hover:rotate-12 transition-transform duration-500 opacity-10"></div>
                                        <img
                                            src={dr.image}
                                            alt={dr.name}
                                            className="w-40 h-40 md:w-48 md:h-48 rounded-[2rem] object-cover shadow-2xl relative z-10 grayscale-[0.3] group-hover:grayscale-0 transition-all duration-500"
                                        />
                                        <div className="absolute -bottom-4 -right-4 bg-white p-3 rounded-2xl shadow-xl z-20 border border-slate-50">
                                            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white p-2 rounded-xl">
                                                <Star size={18} fill="white" />
                                            </div>
                                        </div>
                                    </div>

                                    <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-tight group-hover:text-blue-600 transition-colors">
                                        {dr.name}
                                    </h2>
                                    <p className="text-blue-600 font-bold text-sm mt-2 uppercase tracking-tighter">
                                        {dr.speciality}
                                    </p>

                                    <div className="flex items-center gap-4 mt-6 p-3 bg-slate-50/50 rounded-2xl w-full justify-center md:justify-start">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-slate-400 font-bold uppercase">Experience</span>
                                            <span className="text-sm font-black text-slate-700">{dr.experience || '12+ Years'}</span>
                                        </div>
                                        <div className="w-px h-8 bg-slate-200"></div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-slate-400 font-bold uppercase">Patients</span>
                                            <span className="text-sm font-black text-slate-700">{dr.patient_count || '10k+'}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Info & Action */}
                                <div className="md:w-[60%] flex flex-col justify-between py-2">
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                                                <Video size={20} />
                                            </div>
                                            <h3 className="font-black text-slate-800 tracking-tight text-lg italic">Tele-Consultation</h3>
                                        </div>

                                        <div className="space-y-3">
                                            {[
                                                { icon: <Calendar size={18} />, text: dr.availableDays || dr.availability },
                                                { icon: <Clock size={18} />, text: dr.time || '08:00 PM - 10:00 PM' },
                                                { icon: <ShieldCheck size={18} />, text: 'HIPAA Compliant Secure Link' }
                                            ].map((item, i) => (
                                                <div key={i} className="flex items-center gap-4 text-slate-600 font-semibold text-sm p-2 hover:bg-white rounded-xl transition-colors">
                                                    <span className="text-blue-500">{item.icon}</span>
                                                    {item.text}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-10 pt-6 border-t border-slate-100 flex items-center justify-between">
                                        <div>
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pricing</span>
                                            <p className="text-3xl font-[1000] text-slate-900 tracking-tighter">৳{dr.consultation_fee || dr.fee}</p>
                                        </div>

                                        <Link to={`/doctor/${dr.id}`}>
                                            <motion.button
                                                whileTap={{ scale: 0.95 }}
                                                className="relative overflow-hidden bg-slate-900 hover:bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 flex items-center gap-3 shadow-xl hover:shadow-blue-500/20 group/btn"
                                            >
                                                Book Now
                                                <ArrowRight size={20} className="group-hover/btn:translate-x-2 transition-transform" />
                                            </motion.button>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
};

export default TeleConsult;