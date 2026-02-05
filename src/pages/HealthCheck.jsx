import { useEffect, useState } from "react";
import { Link } from "react-router"; 
import { Search, X, Activity, ChevronRight, HeartPulse, Sparkles, ArrowRight } from "lucide-react"; 
import { motion, AnimatePresence } from "framer-motion";

const HealthCheck = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/health-packages.json") 
            .then((res) => res.json())
            .then((json) => {
                setData(json);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to fetch data", err);
                setLoading(false);
            });
    }, []);

    const filteredData = data.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
    );

    const SkeletonCard = () => (
        <div className="bg-gray-100 animate-pulse rounded-3xl h-64 w-full"></div>
    );

    return (
        <div className="min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-900">
            {/* Main Wrapper with more horizontal padding for spacing on both sides */}
            <div className="max-w-6xl mx-auto px-8 md:px-16 lg:px-24 py-16">
                
                <nav className="flex items-center space-x-2 mb-10 overflow-x-auto no-scrollbar">
                    <Link to="/" className="text-gray-400 hover:text-blue-600 transition-colors text-[10px] font-black uppercase tracking-widest">
                        Home
                    </Link>
                    <ChevronRight size={12} className="text-gray-300" />
                    <span className="text-blue-600 text-[10px] font-black uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
                        Health Check
                    </span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
                    <motion.div 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="lg:col-span-7"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <Sparkles size={14} className="text-blue-500" />
                            <span className="text-blue-500 text-[9px] font-black uppercase tracking-[0.3em]">Advanced Care</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black text-[#002B49] mb-6 leading-tight tracking-tighter">
                            Personalized Health <br />
                            <span className="text-gray-300 italic font-serif font-light">Checks for you.</span>
                        </h1>
                        <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-md border-l-2 border-blue-500 pl-6 italic">
                            Preventative health assessments using advanced medical tests to give you a complete overview of your wellbeing.
                        </p>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="lg:col-span-5 relative"
                    >
                        <div className="relative">
                            <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search packages..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-100 pl-14 pr-12 py-4 rounded-2xl focus:ring-4 focus:ring-blue-50 focus:bg-white transition-all outline-none text-[#002B49] font-bold text-sm shadow-sm placeholder:text-gray-300"
                            />
                            {search && (
                                <button onClick={() => setSearch("")} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500">
                                    <X size={16} />
                                </button>
                            )}
                        </div>
                    </motion.div>
                </div>

                <div className="mb-10 flex items-center justify-between border-b border-gray-50 pb-6">
                    <h2 className="text-lg font-black text-[#002B49] uppercase tracking-tighter flex items-center gap-2">
                        <Activity size={18} className="text-blue-600" />
                        Packages ({filteredData.length})
                    </h2>
                </div>

                <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {loading ? (
                            [...Array(3)].map((_, i) => <SkeletonCard key={i} />)
                        ) : (
                            filteredData.map((item) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    key={item.id}
                                >
                                    <Link
                                        to={`/package/${item.id}`}
                                        className="group relative flex flex-col h-72 rounded-[2rem] overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500"
                                    >
                                        <div className="absolute inset-0">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#002B49]/90 via-[#002B49]/20 to-transparent"></div>
                                        </div>

                                        <div className="relative mt-auto p-6 z-10">
                                            <h3 className="text-white text-lg font-black mb-2 leading-tight tracking-tighter uppercase">
                                                {item.title}
                                            </h3>
                                            <div className="flex items-center text-blue-300 font-black text-[9px] uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                                View Details <ArrowRight size={12} className="ml-1" />
                                            </div>
                                        </div>

                                        <div className="absolute top-5 right-5 w-8 h-8 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 opacity-0 group-hover:opacity-100 transition-all">
                                            <HeartPulse size={16} />
                                        </div>
                                    </Link>
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </motion.div>

                {!loading && filteredData.length === 0 && (
                    <div className="text-center py-20 bg-gray-50 rounded-[2.5rem] border border-gray-100 mt-10">
                        <p className="text-[#002B49] font-black text-sm uppercase tracking-widest">No Packages Found</p>
                        <button onClick={() => setSearch("")} className="mt-4 text-blue-600 text-[10px] font-black uppercase underline">Clear Search</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HealthCheck;