import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Calendar, ArrowRight, Newspaper } from 'lucide-react';

const News = () => {
    const [newsList, setNewsList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/news.json')
            .then(res => res.json())
            .then(data => {
                setNewsList(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching news:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return (
        <div className="py-20 text-center font-bold text-[#002B49] animate-pulse uppercase text-xs tracking-widest">
            Updating Media...
        </div>
    );

    return (
        <section className="bg-[#F8FAFC] py-20 px-6 md:px-12 flex justify-center overflow-hidden">
            {/* Main Centered Container */}
            <div className="max-w-6xl w-full">

                {/* --- Section Header (Compact) --- */}
                <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 gap-6">
                    <div className="text-center md:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider mb-3">
                            <Newspaper size={12} />
                            <span>Media Center</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black text-[#002B49]">
                            Latest <span className="text-blue-600">News</span> & Updates
                        </h2>
                        <div className="w-12 h-1 bg-blue-500 mt-3 rounded-full mx-auto md:mx-0"></div>
                    </div>

                    <Link to="/news" className="hidden md:flex items-center gap-2 text-[11px] font-bold text-gray-500 hover:text-blue-600 transition-all uppercase tracking-widest group">
                        See All Press
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* --- News Grid: 4 Columns on Large Screens --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {newsList.slice(0, 8).map((item) => (
                        <article
                            key={item.id}
                            className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)] transition-all duration-500 overflow-hidden border border-gray-100 flex flex-col group h-full"
                        >
                            {/* Compact Image Section */}
                            <div className="relative overflow-hidden h-40">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-3 left-3">
                                    <span className="bg-white/90 backdrop-blur-sm text-[#002B49] text-[8px] font-black px-2 py-0.5 rounded shadow-sm uppercase">
                                        {item.category || "Press"}
                                    </span>
                                </div>
                            </div>

                            {/* Compact Content Section */}
                            <div className="p-5 flex flex-col flex-grow">
                                <div className="flex items-center text-gray-400 text-[10px] font-bold uppercase mb-3">
                                    <Calendar size={12} className="mr-1.5 text-blue-500" />
                                    <span>{item.date}</span>
                                </div>

                                <h3 className="text-sm md:text-base font-bold text-[#002B49] mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
                                    {item.title}
                                </h3>

                                <p className="text-gray-500 text-[12px] mb-5 line-clamp-2 leading-relaxed opacity-80">
                                    {item.excerpt || item.content?.substring(0, 80) + "..."}
                                </p>

                                {/* Action Link */}
                                <Link
                                    to={`/news/${item.id}`}
                                    className="mt-auto inline-flex items-center text-[10px] font-black text-blue-600 uppercase tracking-tighter group/link"
                                >
                                    <span>Read Article</span>
                                    <ArrowRight size={12} className="ml-1 group-hover/link:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="flex justify-center mt-10 md:hidden">
                    <Link to="/news"> <button className="w-full py-4 bg-[#002B49] text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg">
                        View All News
                    </button></Link>
                </div>
            </div>
        </section>
    );
};

export default News;