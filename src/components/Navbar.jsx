import React, { useState, useEffect } from 'react';
import { Phone, ChevronDown, Home, Menu, X, ArrowRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const location = useLocation();
    const [isSpecialitiesOpen, setIsSpecialitiesOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileSpecOpen, setIsMobileSpecOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [scrolled, setScrolled] = useState(false);

    // scroll handle
    useEffect(() => {
        const controlNavbar = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > 80) {
                setScrolled(true);
                if (currentScrollY > lastScrollY) setIsVisible(false);
                else setIsVisible(true);
            } else {
                setScrolled(false);
                setIsVisible(true);
            }
            setLastScrollY(currentScrollY);
        };
        window.addEventListener('scroll', controlNavbar);
        return () => window.removeEventListener('scroll', controlNavbar);
    }, [lastScrollY]);

    // mobile menu logic
    useEffect(() => {
        if (isMobileMenuOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'unset';
    }, [isMobileMenuOpen]);

    const navLinks = [
        { name: 'Home', path: '/', hasDropdown: false },
        { name: 'About Us', path: '/about', hasDropdown: false },
        { name: 'Specialities', path: '/all-spec', hasDropdown: true },
        { name: 'Health Check', path: '/health-check', hasDropdown: false },
        { name: 'Online Report', path: '/reports', hasDropdown: false },
        { name: 'Patient Stories', path: '/all-story', hasDropdown: false },
        { name: 'Career', path: '/career', hasDropdown: false },
    ];

    const specialitiesData = [
        { id: "spec-001", title: "Accident & Emergency" },
        { id: "spec-002", title: "Anaesthesia" },
        { id: "spec-003", title: "Blood Bank" },
        { id: "spec-004", title: "Cancer Care Center" },
        { id: "spec-005", title: "Cardiology" },
        { id: "spec-006", title: "Cardiothoracic Surgery" },
        { id: "spec-007", title: "Counselling Center" },
        { id: "spec-008", title: "Critical Care Unit" },
        { id: "spec-009", title: "Dental Surgery" },
        { id: "spec-010", title: "Dermatology" },
        { id: "spec-011", title: "Dietetics & Nutrition" },
        { id: "spec-012", title: "Endocrinology" },
        { id: "spec-013", title: "ENT Surgery" },
        { id: "spec-014", title: "Gastroenterology" },
        { id: "spec-015", title: "General Surgery" },
        { id: "spec-016", title: "Internal Medicine" },
        { id: "spec-017", title: "Lab Medicine" },
        { id: "spec-018", title: "Neonatology" },
        { id: "spec-019", title: "Nephrology" },
        { id: "spec-020", title: "Neurology" },
        { id: "spec-021", title: "Neurosurgery" },
        { id: "spec-022", title: "Gynaecology" },
        { id: "spec-023", title: "Ophthalmology" },
        { id: "spec-024", title: "Orthopaedics" },
        { id: "spec-025", title: "Paediatrics" },
        { id: "spec-026", title: "Radiology" },
        { id: "spec-027", title: "Urology" }
    ];

    const columns = [];
    const itemsPerColumn = 7;
    for (let i = 0; i < specialitiesData.length; i += itemsPerColumn) {
        columns.push(specialitiesData.slice(i, i + itemsPerColumn));
    }

    return (
        <header className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
            
            {/* TOP BAR - Slimmer for Mobile */}
            <div className={`bg-[#002B49] text-white px-5 md:px-10 flex justify-between items-center transition-all duration-500 overflow-hidden ${scrolled ? 'h-0 opacity-0' : 'h-8 md:h-10 opacity-100'}`}>
                <div className="flex items-center gap-4">
                    <Link to="/" className="bg-[#4FC3F7] px-2 py-0.5 md:px-3 md:py-1 rounded flex items-center gap-1.5 font-bold text-[#002B49] text-[10px] md:text-xs transition-colors hover:bg-white">
                        <Home size={12} /> Evercarebd
                    </Link>
                </div>
                <div className="flex items-center gap-2 font-black text-xs md:text-sm">
                    <Phone size={14} className="text-[#4FC3F7]" /> 10663
                </div>
            </div>

            {/* MAIN NAVBAR - Slimmer Height on Small Screens */}
            <div className={`px-5 md:px-10 flex justify-between items-center h-[60px] md:h-[75px] transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-white shadow-sm'}`}>
                <Link to="/" className="flex flex-col">
                    <h1 className="text-2xl md:text-3xl font-black text-[#002B49] leading-none">evercare<span className="text-[#4FC3F7]">.</span></h1>
                    <p className="text-[8px] md:text-[10px] font-bold text-[#002B49] tracking-widest uppercase">Hospital</p>
                </Link>

                {/* DESKTOP NAV */}
                <nav className="hidden lg:flex items-center h-full">
                    {navLinks.map((item) => (
                        <div 
                            key={item.name}
                            className="h-full flex items-center relative"
                            onMouseEnter={() => item.hasDropdown && setIsSpecialitiesOpen(true)}
                            onMouseLeave={() => item.hasDropdown && setIsSpecialitiesOpen(false)}
                        >
                            <Link 
                                to={item.path} 
                                className={`px-5 h-full flex items-center font-bold text-[14px] transition-all duration-300 ${location.pathname === item.path ? 'text-[#4FC3F7]' : 'text-[#002B49] hover:text-[#4FC3F7]'}`}
                            >
                                {item.name} {item.hasDropdown && <ChevronDown size={14} className={`ml-1 transition-transform ${isSpecialitiesOpen ? 'rotate-180' : ''}`} />}
                            </Link>

                            {item.hasDropdown && (
                                <AnimatePresence>
                                    {isSpecialitiesOpen && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: 15 }} 
                                            animate={{ opacity: 1, y: 0 }} 
                                            exit={{ opacity: 0, y: 15 }}
                                            className="absolute top-[75px] left-1/2 -translate-x-1/2 w-[1100px] bg-white shadow-2xl rounded-b-3xl p-10 grid grid-cols-4 gap-8 border-t-4 border-[#002B49]"
                                        >
                                            {columns.map((col, idx) => (
                                                <div key={idx} className="flex flex-col gap-3">
                                                    {col.map(spec => (
                                                        <Link 
                                                            key={spec.id} 
                                                            to={`/spec/${spec.id}`} 
                                                            className="text-[13px] text-gray-600 hover:text-[#002B49] hover:font-extrabold transition-colors leading-snug"
                                                        >
                                                            {spec.title}
                                                        </Link>
                                                    ))}
                                                </div>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            )}
                        </div>
                    ))}
                </nav>

                {/* RIGHT SIDE */}
                <div className="flex items-center gap-3 md:gap-4">
                    <Link 
                        to="/query" 
                        className="hidden md:block bg-[#002B49] text-white px-7 py-3 rounded-xl font-bold text-xs uppercase hover:bg-[#4FC3F7] hover:text-[#002B49] transition-all shadow-md active:scale-95"
                    >
                        Query
                    </Link>
                    {/* Slimmer Mobile Menu Trigger */}
                    <button 
                        onClick={() => setIsMobileMenuOpen(true)} 
                        className="lg:hidden p-1.5 bg-gray-50 border border-gray-100 rounded-lg text-[#002B49]"
                    >
                        <Menu size={22} />
                    </button>
                </div>
            </div>

            {/* MOBILE SIDEBAR remains same for usability */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <div className="fixed inset-0 z-[999] lg:hidden h-screen w-screen">
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            exit={{ opacity: 0 }} 
                            onClick={() => setIsMobileMenuOpen(false)} 
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
                        />
                        
                        <motion.div 
                            initial={{ x: '100%' }} 
                            animate={{ x: 0 }} 
                            exit={{ x: '100%' }} 
                            transition={{ type: 'tween', duration: 0.3 }} 
                            className="absolute right-0 top-0 h-full w-[85%] max-w-[320px] bg-white flex flex-col shadow-2xl"
                        >
                            <div className="p-5 flex justify-between items-center border-b shrink-0">
                                <div className="flex flex-col">
                                    <h1 className="text-xl font-black text-[#002B49]">evercare<span className="text-[#4FC3F7]">.</span></h1>
                                    <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#002B49]">Hospital</span>
                                </div>
                                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-gray-100 rounded-full text-gray-500">
                                    <X size={18} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto pt-2 bg-white">
                                {navLinks.map((item) => (
                                    <div key={item.name} className="border-b border-gray-50 last:border-0">
                                        {item.hasDropdown ? (
                                            <>
                                                <button 
                                                    onClick={() => setIsMobileSpecOpen(!isMobileSpecOpen)} 
                                                    className="w-full flex items-center justify-between px-6 py-4 text-[14px] font-bold text-[#002B49]"
                                                >
                                                    {item.name} 
                                                    <ChevronDown size={16} className={`transition-transform duration-300 ${isMobileSpecOpen ? 'rotate-180' : ''}`} />
                                                </button>
                                                
                                                <AnimatePresence>
                                                    {isMobileSpecOpen && (
                                                        <motion.div 
                                                            initial={{ height: 0, opacity: 0 }} 
                                                            animate={{ height: 'auto', opacity: 1 }} 
                                                            exit={{ height: 0, opacity: 0 }} 
                                                            className="overflow-hidden bg-gray-50"
                                                        >
                                                            <div className="py-1">
                                                                {specialitiesData.map((spec) => (
                                                                    <Link 
                                                                        key={spec.id} 
                                                                        to={`/spec/${spec.id}`} 
                                                                        onClick={() => setIsMobileMenuOpen(false)} 
                                                                        className="block px-10 py-2.5 text-[13px] text-gray-600 hover:text-[#002B49]"
                                                                    >
                                                                        {spec.title}
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </>
                                        ) : (
                                            <Link 
                                                to={item.path} 
                                                onClick={() => setIsMobileMenuOpen(false)} 
                                                className="flex items-center justify-between px-6 py-4 text-[14px] font-bold text-[#002B49] hover:bg-gray-50"
                                            >
                                                {item.name} <ArrowRight size={14} className="text-[#4FC3F7] opacity-60" />
                                            </Link>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="p-5 bg-gray-50 border-t shrink-0">
                                <Link 
                                    to="/query" 
                                    onClick={() => setIsMobileMenuOpen(false)} 
                                    className="w-full bg-[#002B49] text-white py-3.5 rounded-xl font-bold flex justify-center shadow-lg uppercase text-xs tracking-widest"
                                >
                                    Query
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;