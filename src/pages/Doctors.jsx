import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Stethoscope, Clock, Award, User, ChevronRight } from 'lucide-react';
import { Link } from 'react-router';

const Doctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSpec, setSelectedSpec] = useState('All');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await fetch('/doctors.json');
                const data = await response.json();
                setDoctors(data);
                setFilteredDoctors(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching doctors:", error);
                setLoading(false);
            }
        };
        fetchDoctors();
    }, []);

    useEffect(() => {
        let result = doctors;
        if (selectedSpec !== 'All') {
            result = result.filter(doc => doc.speciality === selectedSpec);
        }
        if (searchTerm) {
            result = result.filter(doc =>
                doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                doc.speciality.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        setFilteredDoctors(result);
    }, [searchTerm, selectedSpec, doctors]);

    const categories = ['All', 'Cardiology', 'Neurology', 'Orthopaedics', 'Gastroenterology', 'Urology', 'Paediatrics'];

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="w-10 h-10 border-4 border-[#4FC3F7] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] pt-24 md:pt-32 pb-20 px-4 md:px-8 font-sans">
            <div className="max-w-7xl mx-auto">

                {/* TOP SEARCH & HEADER  */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-block px-3 py-1 bg-blue-50 rounded-full mb-3 border border-blue-100"
                    >
                        <span className="text-[#4FC3F7] font-black uppercase tracking-[0.2em] text-[9px]">Find Your Specialist</span>
                    </motion.div>
                    
                    <h2 className="text-2xl md:text-4xl font-black text-[#002B49] mb-6 leading-tight">
                        Consult with Our <br className="hidden md:block" />
                        <span className="text-[#4FC3F7]">World-Class</span> Doctors
                    </h2>

                    {/* Compact Search Bar */}
                    <div className="max-w-xl mx-auto relative group">
                        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                            <Search className="text-gray-400 group-focus-within:text-[#4FC3F7] transition-colors" size={18} />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by name or department..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-5 py-3.5 bg-white rounded-full shadow-lg shadow-blue-900/5 outline-none border border-gray-100 focus:border-[#4FC3F7] transition-all text-[#002B49] text-sm md:text-base"
                        />
                    </div>
                </div>

                <div className="flex flex-wrap justify-center gap-2 mb-10">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedSpec(cat)}
                            className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${selectedSpec === cat
                                ? 'bg-[#002B49] text-white shadow-md'
                                : 'bg-white text-gray-500 hover:text-[#4FC3F7] border border-gray-100 shadow-sm'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* DOCTORS GRID  */}
                <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredDoctors.map((doc) => (
                            <motion.div
                                key={doc.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="group bg-white rounded-[2rem] p-5 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col h-full"
                            >
                                {/* Doctor Image Area */}
                                <div className="relative mb-5 shrink-0">
                                    <div className="aspect-[4/5] rounded-[1.5rem] overflow-hidden bg-gray-50">
                                        <img
                                            src={doc.image}
                                            alt={doc.name}
                                            className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 bg-[#002B49] p-3 rounded-xl shadow-lg border-2 border-white">
                                        <Stethoscope size={16} className="text-[#4FC3F7]" />
                                    </div>
                                </div>

                                {/* Details Area */}
                                <div className="flex-1 flex flex-col">
                                    <div className="mb-4 text-left">
                                        <p className="text-[#4FC3F7] font-black text-[9px] uppercase tracking-[0.1em] mb-1">
                                            {doc.speciality}
                                        </p>
                                        <h3 className="text-lg font-black text-[#002B49] group-hover:text-[#4FC3F7] transition-colors leading-tight">
                                            {doc.name}
                                        </h3>
                                        <p className="text-gray-400 text-[10px] font-medium mt-1">
                                            {doc.degree}
                                        </p>
                                    </div>

                                    <div className="mt-auto space-y-2.5 pt-4 border-t border-gray-50">
                                        <div className="flex items-center gap-2.5 text-gray-500 text-[10px] font-bold">
                                            <Award size={14} className="text-[#4FC3F7]" />
                                            <span className="uppercase tracking-wide">{doc.position}</span>
                                        </div>
                                        <div className="flex items-center gap-2.5 text-gray-500 text-[10px] font-bold">
                                            <Clock size={14} className="text-[#4FC3F7]" />
                                            <span>{doc.availability}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* View Profile Action */}
                                <div className="mt-6">
                                    <Link
                                        to={`/doctor/${doc.id}`}
                                        className="w-full flex items-center justify-between bg-[#F8FAFC] group-hover:bg-[#002B49] text-[#002B49] group-hover:text-white px-5 py-3.5 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all group-active:scale-95"
                                    >
                                        View Profile
                                        <ChevronRight size={14} className="text-[#4FC3F7]" />
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Empty State */}
                {filteredDoctors.length === 0 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                        <User size={40} className="mx-auto text-gray-200 mb-4" />
                        <h3 className="text-lg font-black text-[#002B49]">No Doctors Found</h3>
                        <p className="text-gray-400 text-xs">Refine your search parameters.</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Doctors;