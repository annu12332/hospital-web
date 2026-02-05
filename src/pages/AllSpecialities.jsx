import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronRight, Stethoscope, Filter, ArrowRight } from 'lucide-react';

const AllSpecialities = () => {
    const [specialities, setSpecialities] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch('/spec.json')
            .then(res => res.json())
            .then(data => {
                setSpecialities(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching data:", err);
                setLoading(false);
            });
    }, []);

    const categories = ["All", ...new Set(specialities.map(item => item.category))];

    const filteredData = specialities.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // Framer Motion Animation Settings
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
        }
    };

    const cardVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1,
            transition: { type: "spring", stiffness: 120, damping: 12 }
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="w-10 h-10 border-4 border-gray-100 border-t-[#002B49] rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#FBFDFF] font-sans pb-32">
            
            {/* --- Hero Section --- */}
            <div className="bg-[#002B49] pt-28 pb-24 md:pt-36 md:pb-32 px-6">
                <div className="max-w-5xl mx-auto text-center">
                    <motion.span 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[#4FC3F7] text-[10px] font-black uppercase tracking-[0.4em] mb-4 block"
                    >
                        Medical Departments
                    </motion.span>
                    <motion.h1 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-5xl font-black text-white tracking-tight"
                    >
                        Clinical <span className="text-[#4FC3F7]">Specialities</span>
                    </motion.h1>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-8 md:px-12 lg:px-16 -mt-10">
                
                {/* --- Search & Filter Bar --- */}
                <div className="bg-white p-3 md:p-4 rounded-[2rem] shadow-xl shadow-blue-900/5 border border-gray-100 flex flex-col md:flex-row gap-4 items-center mb-16">
                    <div className="relative w-full md:w-72 group">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#002B49] transition-colors" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search..." 
                            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#4FC3F7]/20 outline-none transition-all font-bold text-[#002B49] text-sm"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar w-full scroll-smooth">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`shrink-0 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all
                                    ${selectedCategory === cat 
                                        ? 'bg-[#002B49] text-white shadow-lg shadow-blue-900/10' 
                                        : 'bg-white text-gray-400 border border-gray-50 hover:border-gray-200'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* --- Compact Cards Grid --- */}
                <AnimatePresence mode="wait">
                    {filteredData.length > 0 ? (
                        <motion.div 
                            key={selectedCategory + searchTerm}
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                        >
                            {filteredData.map((item) => (
                                <motion.div
                                    key={item.id}
                                    variants={cardVariants}
                                    whileHover={{ y: -5 }}
                                    className="h-full"
                                >
                                    <Link 
                                        to={`/spec/${item.id}`} 
                                        className="flex flex-col h-full bg-white rounded-[1.5rem] overflow-hidden border border-gray-100/60 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all group"
                                    >
                                        {/* Smaller Image Box */}
                                        <div className="relative h-44 bg-gray-50 overflow-hidden">
                                            {item.image ? (
                                                <img 
                                                    src={item.image} 
                                                    alt={item.title}
                                                    className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-gray-50">
                                                    <Stethoscope size={30} className="text-gray-200" />
                                                </div>
                                            )}
                                        </div>

                                        {/* Compact Content Box */}
                                        <div className="p-5 flex flex-col flex-grow">
                                            <span className="text-[9px] font-black text-[#4FC3F7] uppercase tracking-widest mb-1">
                                                {item.category}
                                            </span>
                                            <h3 className="text-base font-black text-[#002B49] mb-2 leading-tight group-hover:text-blue-600 transition-colors line-clamp-1">
                                                {item.title}
                                            </h3>
                                            <p className="text-gray-400 text-[11px] font-medium line-clamp-2 leading-relaxed mb-4">
                                                {item.description}
                                            </p>
                                            
                                            <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                                                <span className="text-[9px] font-black uppercase text-gray-400 group-hover:text-[#002B49] transition-colors">Details</span>
                                                <ArrowRight size={14} className="text-gray-300 group-hover:text-[#002B49] group-hover:translate-x-1 transition-all" />
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <div className="py-20 text-center">
                            <p className="text-gray-400 text-sm italic font-medium">No specialities found matching your search.</p>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default AllSpecialities;