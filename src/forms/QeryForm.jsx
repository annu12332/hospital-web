import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Mail, MessageSquare, Phone, CheckCircle2 } from 'lucide-react';

const QueryForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        //  API cl hbe
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitted(true);
        }, 2000);
    };

    return (
        <section className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans pt-30">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl w-full bg-white rounded-[2rem] shadow-2xl shadow-blue-900/10 overflow-hidden flex flex-col md:flex-row"
            >
                {/* left content */}
                <div className="md:w-2/5 bg-[#002B49] p-8 md:p-12 text-white flex flex-col justify-between">
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-3xl font-black mb-4"
                        >
                            Have a Question<span className="text-[#4FC3F7]">?</span>
                        </motion.h2>
                        <p className="text-blue-100/80 leading-relaxed mb-8">
                            আমাদের স্পেশালিস্টদের সাথে সরাসরি যোগাযোগ করতে নিচের ফর্মটি পূরণ করুন। আমরা ২৪ ঘণ্টার মধ্যে আপনার সাথে যোগাযোগ করবো।
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                                <Phone size={20} className="text-[#4FC3F7]" />
                            </div>
                            <p className="font-bold text-lg">10663</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                                <Mail size={20} className="text-[#4FC3F7]" />
                            </div>
                            <p className="text-sm">query@evercarebd.com</p>
                        </div>
                    </div>
                </div>

                {/* form*/}
                <div className="md:w-3/5 p-8 md:p-12 relative">
                    <AnimatePresence mode="wait">
                        {!submitted ? (
                            <motion.form
                                key="query-form"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onSubmit={handleSubmit}
                                className="space-y-6"
                            >
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {/* Name Input */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-[#002B49] uppercase tracking-wider ml-1">Full Name</label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <input
                                                required
                                                type="text"
                                                placeholder="your name"
                                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#4FC3F7] transition-all outline-none text-[#002B49] placeholder:text-gray-300 shadow-inner"
                                            />
                                        </div>
                                    </div>

                                    {/* Phone Input */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-[#002B49] uppercase tracking-wider ml-1">Phone Number</label>
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <input
                                                required
                                                type="tel"
                                                placeholder="01712xxxxxx"
                                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#4FC3F7] transition-all outline-none text-[#002B49] placeholder:text-gray-300 shadow-inner"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Email Input */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-[#002B49] uppercase tracking-wider ml-1">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            required
                                            type="email"
                                            placeholder="example@mail.com"
                                            className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#4FC3F7] transition-all outline-none text-[#002B49] placeholder:text-gray-300 shadow-inner"
                                        />
                                    </div>
                                </div>

                                {/* Message Input */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-[#002B49] uppercase tracking-wider ml-1">Your Message</label>
                                    <div className="relative">
                                        <MessageSquare className="absolute left-4 top-4 text-gray-400" size={18} />
                                        <textarea
                                            required
                                            rows="4"
                                            placeholder="Write your query here..."
                                            className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#4FC3F7] transition-all outline-none text-[#002B49] placeholder:text-gray-300 shadow-inner resize-none"
                                        ></textarea>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={isSubmitting}
                                    className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-lg shadow-blue-500/20 ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#002B49] hover:bg-[#4FC3F7] hover:text-[#002B49] text-white'}`}
                                >
                                    {isSubmitting ? (
                                        <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            Send Query <Send size={18} />
                                        </>
                                    )}
                                </motion.button>
                            </motion.form>
                        ) : (
                            /* Success Message */
                            <motion.div
                                key="success-msg"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="h-full flex flex-col items-center justify-center text-center space-y-4"
                            >
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-2">
                                    <CheckCircle2 size={48} />
                                </div>
                                <h3 className="text-2xl font-black text-[#002B49]">Sent Successfully!</h3>
                                <p className="text-gray-500">আপনার প্রশ্নটি আমরা পেয়েছি। খুব শীঘ্রই আমাদের প্রতিনিধি যোগাযোগ করবেন।</p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="mt-6 text-[#4FC3F7] font-bold hover:underline"
                                >
                                    Send another query
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </section>
    );
};

export default QueryForm;