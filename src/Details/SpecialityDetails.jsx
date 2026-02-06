import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import { Phone, Calendar, ArrowLeft, CheckCircle2, Activity, AlertCircle, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const SpecialityDetails = () => {
    const { id } = useParams();
    const [speciality, setSpeciality] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        const getSpecialityData = async () => {
            setLoading(true);
            setError(false);
            try {
                const response = await fetch('/spec.json');
                if (!response.ok) throw new Error("Data load failed");
                const data = await response.json();
                const foundData = data.find(item => String(item.id) === String(id));
                if (foundData) {
                    setSpeciality(foundData);
                } else {
                    setError(true);
                }
            } catch (err) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        getSpecialityData();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white">
            <div className="w-10 h-10 border-4 border-gray-100 border-t-[#4FC3F7] rounded-full animate-spin"></div>
            <p className="mt-4 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Loading Excellence</p>
        </div>
    );

    if (error || !speciality) return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-gray-50">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
                <AlertCircle size={40} className="text-red-500" />
            </div>
            <h2 className="text-3xl font-black text-[#002B49] mb-2">Department Not Found</h2>
            <p className="text-gray-500 max-w-md mb-8 font-medium">We couldn't locate the clinical department you're looking for. It might be moved or renamed.</p>
            <Link to="/" className="inline-flex items-center gap-2 bg-[#002B49] text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:shadow-2xl hover:shadow-blue-900/20 transition-all active:scale-95">
                <ArrowLeft size={16} /> Back to Home
            </Link>
        </div>
    );

    return (
        <div className="bg-white min-h-screen font-sans">
            <div className="relative h-[450px] md:h-[600px] overflow-hidden">
                <motion.img 
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5 }}
                    src={speciality.image || "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d"} 
                    alt={speciality.title} 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#002B49] via-[#002B49]/40 to-transparent">
                    <div className="max-w-7xl mx-auto px-6 md:px-12 h-full flex flex-col justify-end pb-16 md:pb-24">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            <Link to="/" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#4FC3F7] mb-6 hover:text-white transition-colors group">
                                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Clinical Departments
                            </Link>
                            <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-[0.9] mb-4">
                                {speciality.title}
                            </h1>
                            <div className="flex items-center gap-4">
                                <span className="h-[2px] w-12 bg-[#4FC3F7]"></span>
                                <p className="text-blue-100 font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs">
                                    {speciality.category || "Center of Excellence"}
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                <div className="lg:col-span-7">
                    <section className="mb-16">
                        <div className="flex items-center gap-3 text-[#002B49] mb-8">
                            <Activity size={24} className="text-[#4FC3F7]" />
                            <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight">Clinical Overview</h2>
                        </div>
                        <p className="text-gray-500 text-lg md:text-xl leading-relaxed font-medium mb-12">
                            {speciality.description}
                        </p>
                    </section>

                    <section>
                        <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-8">Specialized Services</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {(speciality.features || ["Advanced Care", "Diagnostic Imaging", "Surgical Excellence", "Recovery Support"]).map((feature) => (
                                <div key={feature} className="flex items-center gap-4 p-6 bg-[#F8FAFC] rounded-[1.5rem] border border-gray-100 hover:border-[#4FC3F7]/30 transition-all group">
                                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:bg-[#4FC3F7] transition-colors">
                                        <CheckCircle2 className="text-[#4FC3F7] group-hover:text-white" size={18} />
                                    </div>
                                    <span className="font-black text-[#002B49] text-xs uppercase tracking-wide">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <div className="lg:col-span-5">
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="sticky top-28 bg-[#002B49] text-white p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-blue-900/40 overflow-hidden relative"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <ShieldCheck size={120} />
                        </div>

                        <div className="relative z-10">
                            <h3 className="text-2xl md:text-3xl font-black mb-4 tracking-tight">Need Medical Assistance?</h3>
                            <p className="text-blue-200/60 mb-10 text-sm leading-relaxed font-medium">
                                Contact our specialized coordination team for appointments, pricing, or emergency admissions.
                            </p>
                            
                            <div className="space-y-4">
                                <a href="tel:10663" className="flex items-center justify-between w-full bg-[#4FC3F7] text-[#002B49] p-5 rounded-2xl font-black uppercase tracking-widest text-[16px] hover:bg-white transition-all transform active:scale-95 group">
                                    <span className="flex items-center gap-3"><Phone size={18} /> Emergency 10663</span>
                                    <ArrowLeft size={16} className="rotate-180 opacity-0 group-hover:opacity-100 transition-all" />
                                </a>
                                <Link to="/apointment" className="flex items-center justify-center gap-3 w-full border border-white/20 text-white p-5 rounded-2xl font-black uppercase tracking-widest text-[16px] hover:bg-white/10 transition-all active:scale-95">
                                    <Calendar size={18} /> Book Appointment
                                </Link>
                            </div>

                            <div className="mt-10 pt-8 border-t border-white/10">
                                <div className="flex items-center gap-4 mb-2">
                                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-200">Department Live</span>
                                </div>
                                <p className="text-[10px] text-blue-200/40 font-bold uppercase tracking-widest leading-loose">
                                    Evercare Hospital Excellence • 24/7 Clinical Support
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default SpecialityDetails;