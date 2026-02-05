import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, Phone, Mail, Stethoscope, Clock, ShieldCheck, CheckCircle2, ArrowLeft, ChevronDown } from 'lucide-react';
import { Link } from 'react-router';

const AppointmentPage = () => {
    const [allDoctors, setAllDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [bookingStatus, setBookingStatus] = useState('idle');
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', department: '', doctor: '', date: '', time: ''
    });

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await fetch('/doctors.json');
                const data = await response.json();
                setAllDoctors(data);

                const uniqueDepts = [...new Set(data.map(doc => doc.speciality))];
                setDepartments(uniqueDepts);
            } catch (error) {
                console.error("Error loading doctors:", error);
            }
        };
        fetchDoctors();
    }, []);

    useEffect(() => {
        if (formData.department) {
            const matched = allDoctors.filter(doc => doc.speciality === formData.department);
            setFilteredDoctors(matched);
            setFormData(prev => ({ ...prev, doctor: '' })); 
        } else {
            setFilteredDoctors([]);
        }
    }, [formData.department, allDoctors]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setBookingStatus('submitting');
        setTimeout(() => setBookingStatus('success'), 2000);
    };

    return (
        <div className="min-h-screen bg-white pt-28 pb-20 px-6">
            <div className="max-w-5xl mx-auto">
                
                <Link to="/" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-[#002B49] mb-10 transition-all">
                    <ArrowLeft size={16} /> Back to home
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    
                    {/* Left Side: Info */}
                    <div className="lg:col-span-4">
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                            <h1 className="text-4xl md:text-5xl font-black text-[#002B49] leading-tight mb-6">
                                Make an <span className="text-[#4FC3F7]">Appointment</span>
                            </h1>
                            <p className="text-gray-500 font-medium leading-relaxed mb-8">
                                আপনার পছন্দের বিশেষজ্ঞ ডাক্তারের সাথে পরামর্শ করতে নিচের ফর্মটি পূরণ করুন। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।
                            </p>
                            
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                                    <Clock className="text-[#4FC3F7]" />
                                    <span className="text-sm font-bold text-[#002B49]">Available 24/7 for support</span>
                                </div>
                                <div className="flex items-center gap-4 p-4 bg-green-50 rounded-2xl border border-green-100">
                                    <ShieldCheck className="text-green-600" />
                                    <span className="text-sm font-bold text-[#002B49]">Verified Specialist Doctors</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Side: Dynamic Form */}
                    <div className="lg:col-span-8">
                        <motion.form 
                            onSubmit={handleSubmit}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-[#F8FAFC] p-8 md:p-12 rounded-[3rem] border border-gray-100 shadow-sm space-y-8"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Name */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Patient Full Name</label>
                                    <input 
                                        required
                                        className="w-full p-5 rounded-2xl border-2 border-white bg-white focus:border-[#4FC3F7] outline-none transition-all font-bold text-[#002B49]"
                                        type="text" placeholder="e.g. Rahat Islam"
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    />
                                </div>

                                {/* Phone */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Phone Number</label>
                                    <input 
                                        required
                                        className="w-full p-5 rounded-2xl border-2 border-white bg-white focus:border-[#4FC3F7] outline-none transition-all font-bold text-[#002B49]"
                                        type="tel" placeholder="017XXXXXXXX"
                                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                    />
                                </div>

                                {/* Department Dropdown */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Select Speciality</label>
                                    <select 
                                        required
                                        className="w-full p-5 rounded-2xl border-2 border-white bg-white focus:border-[#4FC3F7] outline-none transition-all font-bold text-[#002B49] appearance-none cursor-pointer"
                                        onChange={(e) => setFormData({...formData, department: e.target.value})}
                                    >
                                        <option value="">Choose Speciality</option>
                                        {departments.map(dept => (
                                            <option key={dept} value={dept}>{dept}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Dynamic Doctor Dropdown */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Select Doctor</label>
                                    <select 
                                        required
                                        disabled={!formData.department}
                                        className="w-full p-5 rounded-2xl border-2 border-white bg-white focus:border-[#4FC3F7] outline-none transition-all font-bold text-[#002B49] appearance-none disabled:opacity-50 cursor-pointer"
                                        onChange={(e) => setFormData({...formData, doctor: e.target.value})}
                                        value={formData.doctor}
                                    >
                                        <option value="">{formData.department ? "Choose Doctor" : "Select Speciality First"}</option>
                                        {filteredDoctors.map(doc => (
                                            <option key={doc.id} value={doc.name}>{doc.name}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Date */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Preferred Date</label>
                                    <input 
                                        required
                                        className="w-full p-5 rounded-2xl border-2 border-white bg-white focus:border-[#4FC3F7] outline-none transition-all font-bold text-[#002B49]"
                                        type="date"
                                        min={new Date().toISOString().split('T')[0]}
                                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                                    />
                                </div>

                                {/* Time Slot */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Time Slot</label>
                                    <select 
                                        required
                                        className="w-full p-5 rounded-2xl border-2 border-white bg-white focus:border-[#4FC3F7] outline-none transition-all font-bold text-[#002B49] appearance-none cursor-pointer"
                                        onChange={(e) => setFormData({...formData, time: e.target.value})}
                                    >
                                        <option value="">Choose Time</option>
                                        <option value="Morning">Morning (10:00 AM - 01:00 PM)</option>
                                        <option value="Evening">Evening (05:00 PM - 08:00 PM)</option>
                                    </select>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button 
                                disabled={bookingStatus === 'submitting'}
                                className="w-full py-3 bg-[#002B49] text-white rounded-2xl font-black uppercase tracking-[0.3em] text-sm hover:shadow-2xl hover:shadow-blue-900/30 transition-all active:scale-95 disabled:opacity-70"
                            >
                                {bookingStatus === 'submitting' ? "Confirming..." : "Confirm Booking Now"}
                            </button>
                        </motion.form>
                    </div>
                </div>
            </div>

            {/* Success Animation Overlay */}
            <AnimatePresence>
                {bookingStatus === 'success' && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-[#002B49]/90 backdrop-blur-md z-[100] flex items-center justify-center p-6"
                    >
                        <motion.div 
                            initial={{ scale: 0.5, y: 20 }} animate={{ scale: 1, y: 0 }}
                            className="bg-white p-12 rounded-[3rem] max-w-sm w-full text-center shadow-2xl"
                        >
                            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
                                <CheckCircle2 size={50} />
                            </div>
                            <h2 className="text-3xl font-black text-[#002B49] mb-4">Request Sent!</h2>
                            <p className="text-gray-500 font-medium mb-10">We have received your appointment request. Our team will call you within 15 minutes.</p>
                            <button 
                                onClick={() => setBookingStatus('idle')}
                                className="w-full py-4 bg-[#4FC3F7] text-[#002B49] rounded-2xl font-black uppercase tracking-widest text-xs"
                            >
                                Great, Thanks!
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AppointmentPage;