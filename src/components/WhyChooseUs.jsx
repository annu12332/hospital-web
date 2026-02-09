import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    Microscope, ShieldAlert, Thermometer, Eye, Scissors, Brain, Baby, Pill,
    Activity, Heart, Droplets, Stethoscope, User, Syringe, Radio, Wind,
    ArrowRight, Award, Zap, Star, Sparkles
} from "lucide-react";

const WhyChooseUs = () => {
    const specialityCards = [
        { id: "spec-001", name: "Accident & Emergency", icon: <ShieldAlert />, color: "from-rose-500/90 to-rose-600", shadow: "shadow-rose-200" },
        { id: "spec-002", name: "Anaesthesia", icon: <Syringe />, color: "from-blue-500/90 to-blue-600", shadow: "shadow-blue-200" },
        { id: "spec-003", name: "Blood Bank", icon: <Droplets />, color: "from-red-500/90 to-red-600", shadow: "shadow-red-200" },
        { id: "spec-004", name: "Cancer Care Center", icon: <Activity />, color: "from-purple-500/90 to-purple-700", shadow: "shadow-purple-200" },
        { id: "spec-005", name: "Cardiology", icon: <Heart />, color: "from-pink-400/90 to-pink-600", shadow: "shadow-pink-200" },
        { id: "spec-006", name: "Cardiothoracic Surgery", icon: <Scissors />, color: "from-indigo-500/90 to-indigo-700", shadow: "shadow-indigo-200" },
        { id: "spec-007", name: "Counselling Center", icon: <User />, color: "from-teal-400/90 to-teal-600", shadow: "shadow-teal-200" },
        { id: "spec-008", name: "Critical Care Unit", icon: <Zap />, color: "from-orange-400/90 to-orange-600", shadow: "shadow-orange-200" },
        { id: "spec-009", name: "Dental Surgery", icon: <Star />, color: "from-sky-400/90 to-sky-600", shadow: "shadow-sky-200" },
        { id: "spec-010", name: "Dermatology", icon: <Activity />, color: "from-cyan-400/90 to-cyan-600", shadow: "shadow-cyan-200" },
        { id: "spec-011", name: "Dietetics & Nutrition", icon: <Pill />, color: "from-green-400/90 to-green-600", shadow: "shadow-green-200" },
        { id: "spec-012", name: "Endocrinology", icon: <Thermometer />, color: "from-amber-400/90 to-amber-600", shadow: "shadow-amber-200" },
        { id: "spec-013", name: "ENT Surgery", icon: <Activity />, color: "from-emerald-400/90 to-emerald-600", shadow: "shadow-emerald-200" },
        { id: "spec-014", name: "Gastroenterology", icon: <Activity />, color: "from-violet-500/90 to-violet-700", shadow: "shadow-violet-200" },
        { id: "spec-015", name: "General Surgery", icon: <Scissors />, color: "from-slate-500/90 to-slate-700", shadow: "shadow-slate-300" },
        { id: "spec-016", name: "Internal Medicine", icon: <Stethoscope />, color: "from-blue-500/90 to-blue-700", shadow: "shadow-blue-300" },
        { id: "spec-017", name: "Lab Medicine", icon: <Microscope />, color: "from-fuchsia-500/90 to-fuchsia-700", shadow: "shadow-fuchsia-200" },
        { id: "spec-018", name: "Neonatology", icon: <Baby />, color: "from-sky-300/90 to-sky-500", shadow: "shadow-sky-100" },
        { id: "spec-019", name: "Nephrology", icon: <Activity />, color: "from-blue-600/90 to-blue-800", shadow: "shadow-blue-400" },
        { id: "spec-020", name: "Neurology", icon: <Brain />, color: "from-purple-600/90 to-purple-800", shadow: "shadow-purple-400" },
        { id: "spec-021", name: "Neurosurgery", icon: <Brain />, color: "from-indigo-600/90 to-indigo-800", shadow: "shadow-indigo-400" },
        { id: "spec-022", name: "Gynaecology", icon: <User />, color: "from-rose-500/90 to-rose-700", shadow: "shadow-rose-300" },
        { id: "spec-023", name: "Ophthalmology", icon: <Eye />, color: "from-cyan-500/90 to-cyan-700", shadow: "shadow-cyan-300" },
        { id: "spec-024", name: "Orthopaedics", icon: <Activity />, color: "from-stone-500/90 to-stone-700", shadow: "shadow-stone-300" },
        { id: "spec-025", name: "Paediatrics", icon: <Baby />, color: "from-orange-500/90 to-orange-700", shadow: "shadow-orange-300" },
        { id: "spec-026", name: "Radiology", icon: <Radio />, color: "from-blue-700/90 to-blue-900", shadow: "shadow-blue-500" },
        { id: "spec-027", name: "Urology", icon: <Wind />, color: "from-teal-500/90 to-teal-700", shadow: "shadow-teal-300" }
    ];

    const row1 = [...specialityCards.slice(0, 14), ...specialityCards.slice(0, 14)];
    const row2 = [...specialityCards.slice(14), ...specialityCards.slice(14)];
    const duplicatedCardsFull = [...specialityCards, ...specialityCards];

    return (
        <section className="py-12 md:py-24 relative overflow-hidden bg-white">
            {/* Background Accents */}
            <div className="absolute top-0 left-0 w-72 h-72 md:w-[500px] md:h-[500px] bg-blue-50/50 rounded-full blur-[80px] md:blur-[120px] -z-0" />

            <div className="max-w-7xl mx-auto px-5 md:px-12 mb-6 md:mb-10 relative z-10">
                <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end gap-6 md:gap-10">
                    <div className="text-center lg:text-left space-y-2 md:space-y-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100"
                        >
                            <Sparkles size={12} className="text-blue-600 animate-pulse" />
                            <span className="text-blue-600 font-bold text-[9px] tracking-[0.2em] uppercase">Centers of Excellence</span>
                        </motion.div>

                        <h2 className="text-3xl md:text-5xl font-black text-[#002B49] leading-[1.1]">
                            <span className="font-light italic text-slate-400 font-serif text-2xl md:text-4xl">Exceptional</span> <br />
                            Medical <span className="text-blue-600">Specialities</span>
                        </h2>
                    </div>

                    <div className="hidden lg:block">
                        <ExploreBtn />
                    </div>
                </div>
            </div>

            {/* --- Compact Slider Section --- */}
            <div className="relative flex flex-col gap-4 md:gap-6 overflow-hidden py-4 md:py-7">
                
                {/* Row 1 */}
                <motion.div
                    className="flex gap-4 md:gap-6 flex-nowrap"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ ease: "linear", duration: 40, repeat: Infinity }}
                    style={{ width: "fit-content" }}
                >
                    {(window.innerWidth < 1024 ? row1 : duplicatedCardsFull).map((item, index) => (
                        <Card key={`${item.id}-r1-${index}`} item={item} />
                    ))}
                </motion.div>

                {/* Mobile: Row 2 */}
                <div className="lg:hidden">
                    <motion.div
                        className="flex gap-4 flex-nowrap"
                        animate={{ x: ["-50%", "0%"] }}
                        transition={{ ease: "linear", duration: 45, repeat: Infinity }}
                        style={{ width: "fit-content" }}
                    >
                        {row2.map((item, index) => (
                            <Card key={`${item.id}-r2-${index}`} item={item} />
                        ))}
                    </motion.div>
                </div>

                {/* Edge Fades (Smaller on mobile) */}
                <div className="absolute inset-y-0 left-0 w-16 md:w-48 bg-gradient-to-r from-white via-white/50 to-transparent pointer-events-none z-10" />
                <div className="absolute inset-y-0 right-0 w-16 md:w-48 bg-gradient-to-l from-white via-white/50 to-transparent pointer-events-none z-10" />
            </div>

            {/* Mobile Explore Button */}
            <div className="lg:hidden flex justify-center mt-6 px-5 relative z-10">
                <ExploreBtn fullWidth />
            </div>

            {/* --- Elegant Trust Footer --- */}
            <div className="max-w-6xl mx-auto px-5 mt-10 md:mt-16 pt-8 border-t border-slate-100">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    <TrustItem icon={<Award size={20}/>} title="Accreditation" sub="JCI Gold Quality" color="text-blue-600" bg="bg-blue-50" />
                    <TrustItem icon={<ShieldAlert size={20}/>} title="Emergency" sub="24/7 Response" color="text-rose-600" bg="bg-rose-50" />
                    <TrustItem icon={<Stethoscope size={20}/>} title="Certified" sub="Expert Staff" color="text-emerald-600" bg="bg-emerald-50" />
                </div>
            </div>
        </section>
    );
};

const Card = ({ item }) => (
    <Link
        to={`/spec/${item.id}`}
        className="flex-shrink-0 flex flex-col items-center justify-center w-32 h-36 md:w-48 md:h-52 rounded-[2rem] md:rounded-[3rem] bg-white/40 backdrop-blur-md border border-slate-100 hover:border-blue-300 transition-all duration-700 group relative shadow-sm hover:-translate-y-1"
    >
        {/* Compact Icon Box */}
        <div className={`mb-2 md:mb-4 p-2.5 md:p-5 rounded-2xl md:rounded-[1.5rem] bg-gradient-to-br ${item.color} text-white shadow-md ${item.shadow} group-hover:scale-105 transition-all duration-500`}>
            {React.cloneElement(item.icon, { className: "w-4 h-4 md:w-7 md:h-7", strokeWidth: 2.5 })}
        </div>
        <span className="text-[8px] md:text-[11px] font-black uppercase text-slate-700 text-center tracking-tighter md:tracking-widest leading-tight px-3 md:px-6">
            {item.name}
        </span>
    </Link>
);

const ExploreBtn = ({ fullWidth }) => (
    <Link to="/all-spec" className={`group relative px-6 py-3.5 md:px-8 md:py-4 bg-[#002B49] rounded-xl md:rounded-2xl text-white text-[10px] md:text-xs font-bold tracking-widest uppercase overflow-hidden transition-all ${fullWidth ? 'w-full flex justify-center' : ''}`}>
        <span className="relative z-10 flex items-center gap-2 md:gap-3">
            Explore All <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </span>
        <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
    </Link>
);

const TrustItem = ({ icon, title, sub, color, bg }) => (
    <div className="flex items-center gap-3 group justify-center md:justify-start">
        <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center ${color} border border-slate-50 shadow-sm`}>
            {icon}
        </div>
        <div>
            <p className="text-[9px] font-black uppercase tracking-tight text-slate-400">{title}</p>
            <p className="text-xs md:text-sm font-bold text-[#002B49]">{sub}</p>
        </div>
    </div>
);

export default WhyChooseUs;