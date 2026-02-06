import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
    Phone, ArrowLeft, HeartPulse, ShieldCheck, Clock,
    CheckCircle2, Info, ArrowRight, Flame, Syringe,
    ClipboardList, MapPin, Zap, Activity, Microscope,
    Stethoscope, FileText, ChevronRight, Award
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import PackageBookingForm from '../forms/PackageBookingForm';

const PackageDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pkg, setPkg] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('tests');

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    useEffect(() => {
        fetch('/health-packages.json')
            .then(res => res.json())
            .then(data => {
                const found = data.find(item => item.id === parseInt(id));
                setPkg(found);
                setLoading(false);
            })
            .catch(err => console.error(err));
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) return (
        <div className="h-screen flex flex-col items-center justify-center bg-white">
            <Activity className="text-blue-600 animate-bounce" size={32} />
            <p className="mt-4 font-bold text-slate-500 text-sm tracking-widest uppercase">Loading Profile...</p>
        </div>
    );

    const allTests = pkg.full_details ? Object.values(pkg.full_details).flat() : [];

    return (
        <div className="bg-[#f8fafc] min-h-screen font-sans">
            {/* Scroll Indicator */}
            <motion.div className="fixed top-0 left-0 right-0 h-1 bg-blue-600 z-[100] origin-left" style={{ scaleX }} />

            <AnimatePresence>
                {isBookingOpen && (
                    <PackageBookingForm
                        selectedPackage={{ name: pkg.title, price: pkg.price }}
                        onClose={() => setIsBookingOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-slate-200/60 z-[90] h-16 md:h-20 flex items-center">
                <div className="max-w-7xl mx-auto w-full px-4 md:px-8 flex justify-between items-center">
                    <button onClick={() => navigate(-1)} className="flex items-center gap-2 font-bold text-slate-700 hover:text-blue-600 transition-colors">
                        <ArrowLeft size={20} />
                        <span className="hidden sm:inline text-sm">Back</span>
                    </button>

                    <div className="text-center">
                        <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 hidden md:block">Package Detail</p>
                        <h2 className="text-base md:text-lg font-black text-slate-900 leading-tight truncate max-w-[200px] md:max-w-full">
                            {pkg.title}
                        </h2>
                    </div>

                    <button className="p-2 bg-slate-100 rounded-xl text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-all">
                        <Info size={20} />
                    </button>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 md:px-8 pt-24 pb-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left Content */}
                    <div className="lg:col-span-7 space-y-8">

                        {/* Image Section */}
                        <div className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-xl aspect-[16/10] md:aspect-video bg-slate-200">
                            <img src={pkg.image} className="w-full h-full object-cover" alt={pkg.title} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-lg uppercase">Best Seller</span>
                                    <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-lg uppercase">Clinical Grade</span>
                                </div>
                                <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight leading-none">
                                    {pkg.title}
                                </h1>
                            </div>
                        </div>

                        {/*  Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { icon: <Clock size={20} />, label: 'Report Time', val: '24 Hours', color: 'text-blue-600' },
                                { icon: <Syringe size={20} />, label: 'Sample', val: 'Blood/Urine', color: 'text-rose-600' },
                                { icon: <MapPin size={20} />, label: 'Collection', val: 'Home/Lab', color: 'text-emerald-600' },
                                { icon: <Award size={20} />, label: 'Accuracy', val: '99.9%', color: 'text-amber-600' },
                            ].map((item, i) => (
                                <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm text-center md:text-left">
                                    <div className={`${item.color} mb-3 flex justify-center md:justify-start`}>{item.icon}</div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.label}</p>
                                    <p className="text-xs md:text-sm font-black text-slate-800">{item.val}</p>
                                </div>
                            ))}
                        </div>

                        {/* Tab Switcher */}
                        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                            <div className="flex p-1.5 bg-slate-50 border-b border-slate-100">
                                {['tests', 'prep', 'guide'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`flex-1 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-white text-blue-600 shadow-sm border border-slate-100' : 'text-slate-400 hover:text-slate-600'}`}
                                    >
                                        {tab === 'tests' ? `Tests (${allTests.length})` : tab === 'prep' ? 'Preparation' : 'Process'}
                                    </button>
                                ))}
                            </div>

                            <div className="p-6 md:p-8">
                                <AnimatePresence mode="wait">
                                    {activeTab === 'tests' && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                                            {allTests.map((test, i) => (
                                                <div key={i} className="flex items-center gap-3 py-2 border-b border-slate-50 last:border-0">
                                                    <CheckCircle2 size={16} className="text-blue-500 shrink-0" />
                                                    <span className="text-xs md:text-sm font-bold text-slate-600 uppercase tracking-tight">{test}</span>
                                                </div>
                                            ))}
                                        </motion.div>
                                    )}
                                    {activeTab === 'prep' && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                                            <div className="p-5 bg-orange-50 rounded-2xl border border-orange-100 flex gap-4">
                                                <Flame className="text-orange-600 shrink-0" size={24} />
                                                <div>
                                                    <h4 className="text-sm font-black text-slate-900 uppercase">10 Hours Fasting</h4>
                                                    <p className="text-xs text-slate-500 mt-1 leading-relaxed font-medium">Do not consume any food or drinks except plain water for 10-12 hours before the test.</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                    {/* Sticky Booking */}
                    <div className="lg:col-span-5 relative">
                        <div className="sticky top-28 space-y-6">
                            <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-10 text-white shadow-2xl relative overflow-hidden">
                                {/* Decor */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px] rounded-full" />

                                <div className="flex justify-between items-center mb-8">
                                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                                        <Zap className="text-blue-400" size={24} />
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400">Total Cost</p>
                                        <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-white">৳{pkg.price}</h3>
                                    </div>
                                </div>

                                <div className="space-y-4 mb-8">
                                    {['Home Sample Collection', 'Online Report Access', 'Free Physician Consultation'].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 text-sm font-medium text-slate-300">
                                            <ShieldCheck size={18} className="text-blue-400 shrink-0" />
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={() => setIsBookingOpen(true)}
                                    className="w-full bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl hover:shadow-blue-500/20 active:scale-95 flex items-center justify-center gap-2"
                                >
                                    Proceed to Booking <ArrowRight size={18} />
                                </button>
                            </div>

                            {/* Help Desk */}
                            <div className="bg-white rounded-3xl p-6 border border-slate-100 flex items-center justify-between group cursor-pointer hover:border-blue-200 transition-all shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        <Phone size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Support 24/7</p>
                                        <h4 className="text-xl font-black text-slate-900 tracking-tight">Call 10663</h4>
                                    </div>
                                </div>
                                <ChevronRight className="text-slate-300 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Mobile Footer Action */}
            <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-100 p-4 md:hidden z-[100] flex items-center justify-between px-6 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
                <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Price</p>
                    <p className="text-2xl font-black text-slate-900 leading-none">৳{pkg.price}</p>
                </div>
                <button
                    onClick={() => setIsBookingOpen(true)}
                    className="bg-blue-600 text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg active:scale-95"
                >
                    Book Now
                </button>
            </div>
        </div>
    );
};

export default PackageDetails;