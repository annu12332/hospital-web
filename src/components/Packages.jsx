import React, { useState, useEffect } from 'react';
import { Link } from 'react-router'; 
import { ChevronRight, ArrowRight, Activity } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Packages = () => {
    const [packagesData, setPackagesData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-out',
        });

        // Simulating Fetch
        fetch('/health-packages.json')
            .then((res) => res.json())
            .then((data) => {
                setPackagesData(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) return (
        <div className="max-w-7xl mx-auto py-20 px-6 text-center animate-pulse font-bold text-[#002B49]">
            Loading Health Packages...
        </div>
    );

    return (
        <section className="py-24 px-6 md:px-12 bg-[#FDFEFF] flex justify-center overflow-hidden">
            {/* Main Container - Controlled Width for better spacing */}
            <div className="max-w-6xl w-full">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div className="max-w-xl text-center md:text-left" data-aos="fade-up">
                        <div className="inline-flex items-center gap-2 text-blue-600 font-bold text-[10px] uppercase tracking-[0.2em] mb-4 bg-blue-50 px-3 py-1 rounded-full">
                            <Activity size={14} />
                            <span>Preventive Care</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#002B49] leading-tight">
                            Health Check <span className="text-blue-500">Packages</span>
                        </h2>
                        <div className="w-16 h-1 bg-blue-500 rounded-full mt-3 mx-auto md:mx-0"></div>
                    </div>
                    <div className="max-w-xs" data-aos="fade-up" data-aos-delay="100">
                        <p className="text-gray-500 text-sm md:text-right border-r-0 md:border-r-4 border-blue-100 pr-0 md:pr-4 leading-relaxed">
                            Internationally standardized diagnostic screenings for you and your family.
                        </p>
                    </div>
                </div>

                {/* Packages Grid - 4 Columns on Large Screens */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
                    {packagesData?.slice(0, 8).map((pkg, index) => (
                        <div
                            key={pkg.id}
                            data-aos="fade-up"
                            data-aos-delay={index * 50}
                            className="group"
                        >
                            <Link
                                to={`/package/${pkg.id}`}
                                className="relative flex flex-col h-[360px] rounded-[2rem] overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all duration-500"
                            >
                                {/* Image Overlay */}
                                <div className="absolute inset-0">
                                    <img
                                        src={pkg.image}
                                        alt={pkg.title}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#002B49] via-[#002B49]/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />
                                </div>

                                {/* Content */}
                                <div className="relative mt-auto p-6 w-full">
                                    <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white text-[9px] font-bold uppercase tracking-widest mb-3">
                                        {pkg.category || 'Standard'}
                                    </span>

                                    <h3 className="text-lg font-bold text-white mb-4 leading-tight min-h-[50px] group-hover:text-blue-300 transition-colors">
                                        {pkg.title}
                                    </h3>

                                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                        <span className="text-white/80 font-bold text-[10px] uppercase tracking-wider flex items-center gap-1">
                                            Details <ChevronRight size={12} />
                                        </span>
                                        <div className="h-8 w-8 rounded-full bg-white text-[#002B49] flex items-center justify-center transform group-hover:rotate-[-45deg] transition-all duration-300">
                                            <ArrowRight size={16} />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Footer Action */}
                <div className="mt-16 text-center" data-aos="zoom-in">
                    <Link
                        to="/health-check"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-[#002B49] text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg active:scale-95 group"
                    >
                        Explore All Packages
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Packages;