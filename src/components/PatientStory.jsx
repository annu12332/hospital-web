import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Calendar, User, MapPin, ChevronRight, PlayCircle, Loader2, Quote, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

const PatientStory = () => {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        AOS.init({ duration: 800, once: true });

        const fetchStories = async () => {
            try {
                const response = await fetch('/story.json');
                if (!response.ok) throw new Error('Data fetch failed');
                const data = await response.json();
                setStories(data);
            } catch (error) {
                console.error("Error fetching patient stories:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStories();
    }, []);

    if (loading) {
        return (
            <div className="h-[300px] flex flex-col items-center justify-center">
                <Loader2 className="animate-spin text-blue-600 mb-2" size={30} />
                <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Loading...</span>
            </div>
        );
    }

    return (
        <section className="py-16 bg-[#F9FBFF] px-6 md:px-12 lg:px-20 flex justify-center">
            {/* Main Wrapper */}
            <div className="max-w-6xl w-full">

                {/* --- Section Header (More Compact) --- */}
                <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 gap-4">
                    <div className="text-center md:text-left" data-aos="fade-up">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[9px] font-bold uppercase tracking-widest mb-2">
                            <Quote size={10} className="fill-current" />
                            <span>Testimonials</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black text-[#002B49]">
                            Recovery <span className="text-blue-600">Stories</span>
                        </h2>
                    </div>
                    
                    <Link to="/all-story" className="text-[11px] font-bold text-[#002B49] hover:text-blue-600 transition-colors uppercase tracking-widest flex items-center gap-2 group">
                        See All Stories 
                        <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                </div>

                {/* --- Compact Stories Grid --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stories.slice(0, 6).map((story, index) => (
                        <motion.div
                            key={story.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            className="bg-white rounded-[1.5rem] flex flex-col group border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden"
                        >
                            {/* Smaller Media Section */}
                            <div className="relative h-44 overflow-hidden">
                                <img
                                    src={story.image}
                                    alt={story.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#002B49]/60 via-transparent to-transparent opacity-40" />
                                
                                {/* Compact Badge */}
                                <div className="absolute top-3 left-3">
                                    <span className="bg-white/90 backdrop-blur-sm text-[#002B49] text-[8px] font-black px-2.5 py-1 rounded-md shadow-sm uppercase tracking-wider">
                                        {story.speciality}
                                    </span>
                                </div>

                                {story.video_url && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-10 h-10 bg-white/90 text-blue-600 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                                            <PlayCircle size={24} fill="currentColor" className="opacity-90" />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Compact Content Body */}
                            <div className="p-5 flex flex-col flex-grow">
                                {/* Small Meta Info */}
                                <div className="flex items-center gap-3 mb-3 text-[9px] font-bold text-gray-400 uppercase tracking-tighter">
                                    <span className="flex items-center gap-1"><Calendar size={11} className="text-blue-500" /> {story.published_date}</span>
                                    <span className="flex items-center gap-1"><MapPin size={11} className="text-blue-500" /> {story.city}</span>
                                </div>

                                {/* Title - Reduced size */}
                                <h3 className="text-base font-bold text-[#002B49] mb-2 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                                    {story.title}
                                </h3>

                                {/* Shortened Excerpt */}
                                <p className="text-gray-500 text-[12px] leading-relaxed mb-5 line-clamp-2 opacity-80">
                                    {story.content}
                                </p>

                                {/* Bottom Info Bar - More Compact */}
                                <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                            <User size={14} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[8px] text-gray-400 font-bold uppercase tracking-tight">Consultant</span>
                                            <span className="text-[11px] font-bold text-[#002B49]">{story.doctor_name}</span>
                                        </div>
                                    </div>

                                    <Link 
                                        to={`/story/${story.id}`}
                                        className="w-7 h-7 rounded-full bg-gray-50 text-[#002B49] hover:bg-blue-600 hover:text-white flex items-center justify-center transition-all"
                                    >
                                        <ChevronRight size={14} />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PatientStory;