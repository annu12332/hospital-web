import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Stethoscope, Clock, Award, BookOpen, 
  CheckCircle2, Phone, MapPin, 
  ShieldCheck, Send, ChevronLeft, Calendar
} from 'lucide-react';

const DoctorDetails = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingStatus, setBookingStatus] = useState('idle'); 

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await fetch('/doctors.json');
        const data = await response.json();
        const found = data.find(d => d.id === id);
        setDoctor(found);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };
    fetchDoctor();
  }, [id]);

  const handleBooking = (e) => {
    e.preventDefault();
    setBookingStatus('loading');
    setTimeout(() => setBookingStatus('success'), 1500);
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="w-10 h-10 border-4 border-[#4FC3F7] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!doctor) return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <h2 className="text-xl font-bold text-[#002B49]">Doctor Not Found</h2>
      <Link to="/doctors" className="text-[#4FC3F7] font-bold">Back to Doctors List</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24 md:pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation Back */}
        <Link to="/doctors" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#002B49] mb-8 transition-colors group">
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-widest">Back to Search</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: Profile Info */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Main Bio Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[2.5rem] p-6 md:p-10 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 items-center md:items-start"
            >
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-[2rem] overflow-hidden shadow-lg shrink-0 border-4 border-white">
                <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
              </div>

              <div className="flex-1 text-center md:text-left">
                <span className="bg-blue-50 text-[#4FC3F7] px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-blue-100 mb-4 inline-block">
                  {doctor.speciality} Specialist
                </span>
                <h1 className="text-2xl md:text-4xl font-black text-[#002B49] mb-2 leading-tight">{doctor.name}</h1>
                <p className="text-sm md:text-base font-bold text-gray-400 mb-6">{doctor.degree}</p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: 'Experience', val: doctor.experience },
                    { label: 'Fee', val: doctor.consultation_fee },
                    { label: 'Patients', val: doctor.patient_count },
                    { label: 'Success', val: doctor.success_rate }
                  ].map((stat, i) => (
                    <div key={i} className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
                      <p className="text-[8px] font-black text-gray-400 uppercase tracking-tighter mb-1">{stat.label}</p>
                      <p className="text-[#002B49] font-black text-sm">{stat.val}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* About & Education */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-gray-100"
            >
              <h3 className="text-xl font-black text-[#002B49] mb-4 flex items-center gap-3">
                <BookOpen size={20} className="text-[#4FC3F7]" /> About Specialist
              </h3>
              <p className="text-gray-500 leading-relaxed text-sm md:text-base mb-8">{doctor.about}</p>
              
              <h4 className="font-black text-[#002B49] mb-4 uppercase text-[10px] tracking-widest">Education & Background</h4>
              <div className="space-y-3">
                {doctor.education?.map((edu, i) => (
                  <div key={i} className="flex items-center gap-3 text-gray-600 font-medium bg-[#F8FAFC] p-4 rounded-xl border border-blue-50">
                    <CheckCircle2 size={16} className="text-[#4FC3F7]" />
                    <span className="text-sm">{edu}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Booking Form */}
          <div className="lg:col-span-4">
            <motion.div 
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              className="bg-[#002B49] rounded-[2.5rem] p-8 text-white shadow-2xl sticky top-28"
            >
              <h3 className="text-xl font-black mb-2">Book Appointment</h3>
              <p className="text-blue-200/60 text-[10px] mb-8 uppercase tracking-widest">Consultation Request</p>

              <form className="space-y-4" onSubmit={handleBooking}>
                <div>
                  <label className="text-[9px] font-black uppercase tracking-widest text-blue-300/50 ml-1">Patient Name</label>
                  <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#4FC3F7] outline-none transition-all mt-1" placeholder="Ex: John Doe" />
                </div>

                <div>
                  <label className="text-[9px] font-black uppercase tracking-widest text-blue-300/50 ml-1">Phone Number</label>
                  <input required type="tel" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#4FC3F7] outline-none transition-all mt-1" placeholder="017xxxxxxxx" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[9px] font-black uppercase tracking-widest text-blue-300/50 ml-1">Select Date</label>
                    <input required type="date" className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-[11px] focus:border-[#4FC3F7] outline-none transition-all mt-1" />
                  </div>
                  <div>
                    <label className="text-[9px] font-black uppercase tracking-widest text-blue-300/50 ml-1">Preferred Time</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-[11px] focus:border-[#4FC3F7] outline-none transition-all mt-1 appearance-none">
                      <option className="text-black">Morning (10AM-1PM)</option>
                      <option className="text-black">Evening (4PM-8PM)</option>
                    </select>
                  </div>
                </div>

                <button 
                  disabled={bookingStatus === 'loading'}
                  className={`w-full py-4 mt-4 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] transition-all flex items-center justify-center gap-2 ${
                    bookingStatus === 'success' ? 'bg-green-500 text-white' : 'bg-[#4FC3F7] hover:bg-white text-[#002B49]'
                  }`}
                >
                  {bookingStatus === 'loading' ? (
                    <div className="w-4 h-4 border-2 border-[#002B49] border-t-transparent rounded-full animate-spin"></div>
                  ) : bookingStatus === 'success' ? (
                    <><CheckCircle2 size={14} /> Confirmed</>
                  ) : (
                    <><Send size={14} /> Confirm Booking</>
                  )}
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-white/5 flex items-start gap-3">
                <ShieldCheck size={18} className="text-[#4FC3F7] shrink-0" />
                <p className="text-[9px] text-blue-100/40 leading-relaxed font-medium">
                  By confirming, you agree to our hospital's policy and patient guidelines. A confirmation SMS will be sent shortly.
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;