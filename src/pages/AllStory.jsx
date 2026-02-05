import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Quote, ArrowRight, Heart, Sparkles } from 'lucide-react';

const AllStories = () => {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const response = await fetch('/story.json');
                const data = await response.json();
                setStories(data);
                setTimeout(() => setLoading(false), 600);
            } catch (error) {
                console.error("Error loading stories:", error);
                setLoading(false);
            }
        };
        fetchStories();
    }, []);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <motion.div 
                animate={{ scale: [1, 1.1, 1], opacity: [1, 0.5, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="text-[#002B49] font-black text-2xl tracking-tighter"
            >
                EVERCARE<span className="text-blue-500">.</span>
            </motion.div>
        </div>
    );

    return (
        <div className="min-h-screen bg-white font-sans">
            
            {/* --- Minimalist Hero --- */}
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-center items-center gap-2 mb-6"
                    >
                        <div className="h-[1px] w-12 bg-blue-200"></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-500">The Human Spirit</span>
                        <div className="h-[1px] w-12 bg-blue-200"></div>
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black text-[#002B49] leading-[0.9] tracking-tighter mb-8"
                    >
                        Real Stories. <br />
                        <span className="text-gray-300 italic font-serif font-light">Real Recovery.</span>
                    </motion.h1>
                    <p className="text-gray-500 max-w-xl mx-auto text-lg leading-relaxed font-medium italic">
                        একটি সুস্থ আগামীর পথে আমাদের রোগীদের অপ্রতিরোধ্য ফিরে আসার গল্প।
                    </p>
                </div>
            </section>

            {/* --- 3-Column Stories Grid with Side Spacing --- */}
            {/* max-w-7xl ensures enough room for 3 columns while keeping side space */}
            <main className="max-w-7xl mx-auto px-10 md:px-16 lg:px-20 pb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
                    {stories.map((story, index) => (
                        <motion.div
                            key={story.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group cursor-pointer"
                        >
                            <Link to={`/story/${story.id}`}>
                                {/* Image Container - Aspect Square for 3-col balance */}
                                <div className="relative aspect-[4/5] overflow-hidden bg-gray-50 rounded-sm mb-6">
                                    <img
                                        src={story.image}
                                        alt={story.patient_name}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                                    />
                                    
                                    {/* Video Overlay Info */}
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                        <div className="w-14 h-14 rounded-full border border-white/50 backdrop-blur-md flex items-center justify-center text-white">
                                            <Play fill="white" size={18} />
                                        </div>
                                    </div>

                                    {/* Floating Category Tag */}
                                    <div className="absolute top-5 left-5">
                                        <span className="text-[8px] font-black uppercase tracking-widest text-white bg-[#002B49] px-3 py-1">
                                            {story.speciality}
                                        </span>
                                    </div>
                                </div>

                                {/* Story Details */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                                        <span>{story.published_date}</span>
                                        <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                                        <span>{story.city}</span>
                                    </div>

                                    <h3 className="text-xl font-black text-[#002B49] leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                                        {story.title}
                                    </h3>

                                    <div className="relative pl-6 border-l-2 border-gray-100 group-hover:border-blue-500/30 transition-colors">
                                        <Quote size={14} className="absolute left-1.5 top-0 text-blue-500 opacity-20" />
                                        <p className="text-gray-500 text-[13px] leading-relaxed line-clamp-2 italic">
                                            {story.content}
                                        </p>
                                    </div>

                                    <div className="pt-4 flex items-center justify-between border-t border-gray-50">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200">
                                                <img 
                                                    src={`https://ui-avatars.com/api/?name=${story.doctor_name}&background=002B49&color=fff`} 
                                                    alt="doctor" 
                                                />
                                            </div>
                                            <div>
                                                <p className="text-[8px] text-gray-400 font-black uppercase tracking-tighter">Consultant</p>
                                                <p className="text-[11px] font-bold text-[#002B49]">{story.doctor_name}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="text-[#002B49] group-hover:text-blue-600 transition-transform group-hover:translate-x-1">
                                            <ArrowRight size={18} />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </main>

            {/* --- Simple Aesthetic Footer Call --- */}
            <section className="bg-gray-50 py-24 px-6 text-center">
                <Sparkles size={32} className="mx-auto text-blue-200 mb-6" />
                <h2 className="text-3xl font-black text-[#002B49] mb-4 tracking-tighter uppercase">Share Your Journey</h2>
                <p className="text-gray-500 mb-8 max-w-md mx-auto text-sm leading-relaxed">আপনার সুস্থতার গল্প হতে পারে অন্য কারো অনুপ্রেরণা। আমাদের সাথে যোগাযোগ করুন।</p>
                <button className="bg-[#002B49] text-white px-10 py-4 rounded-sm text-[10px] font-black uppercase tracking-[0.3em] hover:bg-blue-600 transition-all shadow-lg shadow-blue-900/10">
                    Contact Us
                </button>
            </section>
        </div>
    );
};

export default AllStories;