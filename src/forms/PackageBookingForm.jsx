import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    X, CheckCircle2, User, Phone, 
    Calendar, ArrowRight, Loader2, Sparkles, MapPin
} from 'lucide-react';

const PackageBookingForm = ({ selectedPackage, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: '', phone: '', date: '', address: ''
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setIsSuccess(true);
        }, 1800);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white w-full max-w-[420px] rounded-[2.5rem] overflow-hidden shadow-2xl relative border border-slate-100"
            >
                <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
                
                <button 
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 bg-slate-50 hover:bg-slate-100 text-slate-400 rounded-xl transition-all z-10"
                >
                    <X size={16} />
                </button>

                {!isSuccess ? (
                    <div className="p-7 md:p-9">
                        <div className="mb-8">
                            <div className="flex items-center gap-2 mb-1">
                                <Sparkles size={12} className="text-blue-500" fill="currentColor" />
                                <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Quick Booking</span>
                            </div>
                            <h2 className="text-xl font-black text-slate-800 tracking-tight truncate">
                                {selectedPackage?.name || "Premium Plan"}
                            </h2>
                            <p className="text-[13px] font-bold text-slate-400 mt-1">
                                Total: <span className="text-slate-900 italic">৳{selectedPackage?.price}</span>
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-3.5">
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={16} />
                                <input 
                                    required
                                    type="text" 
                                    name="name"
                                    placeholder="Full Name"
                                    onChange={handleInputChange}
                                    className="w-full bg-slate-50/50 border-2 border-transparent focus:border-blue-50 focus:bg-white rounded-2xl py-3.5 pl-11 pr-4 text-sm font-bold text-slate-700 transition-all outline-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="relative group">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" size={16} />
                                    <input 
                                        required
                                        type="tel" 
                                        name="phone"
                                        placeholder="Phone"
                                        className="w-full bg-slate-50/50 border-2 border-transparent focus:border-emerald-50 focus:bg-white rounded-2xl py-3.5 pl-11 pr-4 text-sm font-bold text-slate-700 outline-none transition-all"
                                    />
                                </div>
                                <div className="relative group">
                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-purple-500 transition-colors" size={16} />
                                    <input 
                                        required
                                        type="date" 
                                        className="w-full bg-slate-50/50 border-2 border-transparent focus:border-purple-50 focus:bg-white rounded-2xl py-3.5 pl-11 pr-4 text-[12px] font-bold text-slate-500 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="relative group">
                                <MapPin className="absolute left-4 top-4 text-slate-300 group-focus-within:text-pink-500 transition-colors" size={16} />
                                <textarea 
                                    required
                                    rows="2"
                                    placeholder="Address"
                                    className="w-full bg-slate-50/50 border-2 border-transparent focus:border-pink-50 focus:bg-white rounded-2xl py-3.5 pl-11 pr-4 text-sm font-bold text-slate-700 transition-all outline-none resize-none"
                                ></textarea>
                            </div>

                            <button 
                                disabled={loading}
                                className="w-full relative mt-4 bg-slate-900 hover:bg-blue-600 text-white py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.15em] flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.98] disabled:opacity-70"
                            >
                                {loading ? (
                                    <Loader2 className="animate-spin" size={18} />
                                ) : (
                                    <>
                                        Confirm Now
                                        <ArrowRight size={16} />
                                    </>
                                )}
                            </button>
                        </form>
                        <p className="text-center text-[9px] text-slate-300 mt-5 font-bold uppercase tracking-widest">
                            ⚡ Fast & Secure Processing
                        </p>
                    </div>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-12 text-center"
                    >
                        <div className="w-16 h-16 bg-emerald-500 text-white rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-100">
                            <CheckCircle2 size={32} />
                        </div>
                        <h2 className="text-xl font-black text-slate-900 mb-2 tracking-tight">Confirmed!</h2>
                        <p className="text-xs text-slate-500 font-bold leading-relaxed mb-8">
                            We've received your booking. <br/> Stay tuned for our call.
                        </p>
                        <button 
                            onClick={onClose}
                            className="w-full bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-900 py-4 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all"
                        >
                            Close
                        </button>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default PackageBookingForm;