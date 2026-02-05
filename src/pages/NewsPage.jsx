import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowRight, Search, Filter, Tag } from 'lucide-react';
import { Link } from 'react-router';

const NewsPage = () => {
    const [news, setNews] = useState([]);
    const [filteredNews, setFilteredNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch('/news.json');
                const data = await response.json();
                setNews(data);
                setFilteredNews(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching news:", error);
                setLoading(false);
            }
        };
        fetchNews();
    }, []);

    // filtering
    const filterByCategory = (category) => {
        setActiveCategory(category);
        if (category === 'All') {
            setFilteredNews(news);
        } else {
            const filtered = news.filter(item => item.category === category);
            setFilteredNews(filtered);
        }
    };

    const categories = ['All', 'Medical', 'Events', 'Technology', 'Health Tips'];

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-[#4FC3F7] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-28 pb-20 px-4 md:px-10">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-6"
                >
                    <div>
                        <h4 className="text-[#4FC3F7] font-black uppercase tracking-[0.3em] text-sm mb-2">Our Blog</h4>
                        <h2 className="text-4xl md:text-5xl font-black text-[#002B49]">Latest News & <br /><span className="text-gray-400">Updates.</span></h2>
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => filterByCategory(cat)}
                                className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${activeCategory === cat
                                        ? 'bg-[#002B49] text-white shadow-lg'
                                        : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-100'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* News Grid */}
            <div className="max-w-7xl mx-auto">
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence>
                        {filteredNews.map((item, index) => (
                            <motion.article
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-[#002B49]/10 transition-all duration-500 flex flex-col h-full border border-gray-100"
                            >
                                {/* Image Container */}
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-[#4FC3F7] text-[#002B49] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg">
                                            {item.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content Container */}
                                <div className="p-8 flex flex-col flex-1">
                                    <div className="flex items-center gap-4 text-gray-400 text-xs font-bold mb-4">
                                        <span className="flex items-center gap-1.5 uppercase tracking-wider">
                                            <Calendar size={14} className="text-[#4FC3F7]" /> {item.date}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-black text-[#002B49] mb-4 group-hover:text-[#4FC3F7] transition-colors leading-tight">
                                        {item.title}
                                    </h3>

                                    <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                                        {item.excerpt}
                                    </p>

                                    <div className="mt-auto">
                                        <Link
                                            to={`/news/${item.id}`}
                                            className="inline-flex items-center gap-2 text-[#002B49] font-black text-xs uppercase tracking-widest hover:gap-4 transition-all"
                                        >
                                            Read Full Story <ArrowRight size={16} className="text-[#4FC3F7]" />
                                        </Link>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Empty State */}
                {filteredNews.length === 0 && (
                    <div className="text-center py-20">
                        <h3 className="text-xl font-bold text-gray-400">No news found in this category.</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NewsPage;