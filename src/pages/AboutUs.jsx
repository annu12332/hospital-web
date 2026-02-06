import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Award, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router';

const AboutUs = () => {
    const stats = [
        { label: "Patients Healed", value: "500k+" },
        { label: "Expert Doctors", value: "150+" },
        { label: "Success Rate", value: "98%" },
        { label: "Years of Care", value: "25+" }
    ];

    const values = [
        { 
            icon: <Heart size={24} />, 
            title: "Compassion", 
            text: "আমরা শুধু রোগ নয়, রোগীকে বুঝতে চেষ্টা করি।",
            color: "from-rose-500 to-red-600"
        },
        { 
            icon: <Award size={24} />, 
            title: "Excellence", 
            text: "আন্তর্জাতিক মানের প্রতিটি প্রোটোকল কঠোরভাবে মানা হয়।",
            color: "from-emerald-500 to-teal-600"
        },
        { 
            icon: <ShieldCheck size={24} />, 
            title: "Integrity", 
            text: "সচ্ছতা এবং আস্থার সাথে আমরা প্রতিটি জীবন রক্ষা করি।",
            color: "from-blue-500 to-indigo-600"
        }
    ];

    return (
        <div className="min-h-screen bg-white font-sans overflow-x-hidden">
            
            {/* --- Compact Hero --- */}
            <section className="pt-28 md:pt-36 pb-12 px-8 md:px-16 lg:px-24">
                <div className="max-w-6xl mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 mb-4"
                    >
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Since 1999</span>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl sm:text-5xl md:text-6xl font-black text-[#002B49] leading-[1.1] tracking-tighter"
                        >
                            Defining The <br /> Future <span className="text-gray-300 italic font-serif font-light tracking-normal text-3xl md:text-5xl">Of Care.</span>
                        </motion.h1>
                        
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-gray-500 text-sm md:text-base leading-relaxed max-w-md border-l-2 border-blue-600 pl-6 italic"
                        >
                            আমরা কেবল একটি হাসপাতাল নই; আমরা একটি আশার নাম। অত্যাধুনিক প্রযুক্তি এবং মানবিক স্পর্শের সমন্বয়ে আমরা গড়ি সুস্থ আগামীর গল্প।
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* --- Split Section (Image & Mission) --- */}
            <section className="py-12 md:py-20 px-8 md:px-16 lg:px-24 bg-gray-50">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="rounded-2xl overflow-hidden shadow-xl grayscale hover:grayscale-0 transition-all duration-700 h-[300px] md:h-[400px]"
                    >
                        <img 
                            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000" 
                            className="w-full h-full object-cover"
                        />
                    </motion.div>
                    <div className="space-y-6">
                        <h2 className="text-2xl md:text-3xl font-black text-[#002B49] uppercase tracking-tighter">Our Excellence. <br/> Your Recovery.</h2>
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                            এভারকেয়ার হসপিটাল বাংলাদেশের স্বাস্থ্যসেবায় এক নতুন দিগন্ত উন্মোচন করেছে। আমাদের প্রতিটি পদক্ষেপের মূলে রয়েছে রোগীর নিরাপত্তা এবং আন্তর্জাতিক মানের চিকিৎসা।
                        </p>
                        <button className="flex items-center gap-2 text-[#002B49] font-black text-[10px] uppercase tracking-widest border-b-2 border-[#002B49] pb-1 hover:text-blue-600 hover:border-blue-600 transition-all">
                            Learn More <ArrowRight size={14} />
                        </button>
                    </div>
                </div>
            </section>

            {/* --- Compact Stats --- */}
            <section className="py-12 md:py-20 px-8 md:px-16 lg:px-24">
                <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="p-4 bg-white rounded-2xl border border-gray-50 shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-3xl md:text-4xl font-black text-[#002B49] tracking-tighter">{stat.value}</h3>
                            <p className="text-[9px] font-bold uppercase tracking-widest text-blue-500 mt-1">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- Colorful Core Values --- */}
            <section className="py-16 md:py-24 px-8 md:px-16 lg:px-24 bg-white">
                <div className="max-w-6xl mx-auto text-center mb-12">
                    <Sparkles size={24} className="mx-auto text-blue-600 mb-4" />
                    <h2 className="text-3xl font-black text-[#002B49] uppercase tracking-tighter">Core Values</h2>
                </div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                    {values.map((item, idx) => (
                        <motion.div 
                            key={idx}
                            whileHover={{ y: -5 }}
                            className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
                        >
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-gradient-to-br ${item.color} text-white shadow-lg`}>
                                {item.icon}
                            </div>
                            <h4 className="text-lg font-black text-[#002B49] uppercase tracking-tighter mb-3">{item.title}</h4>
                            <p className="text-gray-500 text-xs md:text-sm leading-relaxed italic opacity-80">"{item.text}"</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* --- Compact CTA --- */}
            <section className="px-8 md:px-16 lg:px-24 pb-20">
                <div className="max-w-5xl mx-auto bg-[#002B49] rounded-[2.5rem] p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
                    <div className="relative z-10">
                        <h2 className="text-2xl md:text-4xl font-black text-white mb-8 tracking-tighter">Ready to experience <br/> world-class care?</h2>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link to ="/apointment"><button className="bg-white text-[#002B49] px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-50 transition-all">
                                Book Appointment
                            </button></Link>
                            <Link to ="/doctors"><button className="border border-white/20 text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                                View Teams
                            </button></Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;