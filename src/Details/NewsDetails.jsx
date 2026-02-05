import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import { Calendar, User, Clock, Share2, ArrowLeft, Facebook, Twitter, Linkedin, Bookmark } from 'lucide-react';

const NewsDetails = () => {
    const { id } = useParams();
    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        
        fetch('/news.json')
            .then(res => res.json())
            .then(data => {
                const found = data.find(item => item.id === id);
                setNews(found);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return (
        <div className="max-w-4xl mx-auto p-10 animate-pulse">
            <div className="h-10 bg-gray-200 w-3/4 mb-4 rounded"></div>
            <div className="h-64 bg-gray-200 w-full mb-6 rounded-xl"></div>
            <div className="space-y-3">
                <div className="h-4 bg-gray-200 w-full rounded"></div>
                <div className="h-4 bg-gray-200 w-5/6 rounded"></div>
            </div>
        </div>
    );

    if (!news) return <div className="text-center py-20 text-2xl font-bold">News Not Found!</div>;

    return (
        <article className="min-h-screen bg-white pb-20">
            {/* Post Header */}
            <header className="pt-24 pb-12 bg-gray-50 border-b">
                <div className="max-w-4xl mx-auto px-6">
                    <Link to="/news" className="inline-flex items-center text-blue-600 font-medium mb-6 hover:gap-2 transition-all">
                        <ArrowLeft size={18} className="mr-2" /> Back to News
                    </Link>
                    
                    <div className="flex items-center gap-3 mb-4">
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                            {news.category}
                        </span>
                        <span className="text-gray-400 text-sm flex items-center gap-1">
                            <Clock size={14} /> 5 min read
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                        {news.title}
                    </h1>

                    <div className="flex flex-wrap items-center justify-between gap-4 py-6 border-t border-gray-200">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                                {news.author?.[0] || 'E'}
                            </div>
                            <div>
                                <p className="font-bold text-gray-800">{news.author || 'Evercare Admin'}</p>
                                <p className="text-sm text-gray-500">{news.date}</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                            <button className="p-2 rounded-full border hover:bg-gray-100 transition-colors"><Bookmark size={20} className="text-gray-600"/></button>
                            <button className="p-2 rounded-full border hover:bg-gray-100 transition-colors"><Share2 size={20} className="text-gray-600"/></button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-6 -mt-8">
                <div className="rounded-2xl overflow-hidden shadow-2xl mb-12">
                    <img src={news.image} alt={news.title} className="w-full h-auto object-cover max-h-[500px]" />
                </div>

                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                    <p className="text-xl font-medium text-gray-900 mb-8 border-l-4 border-blue-600 pl-6 italic">
                        {news.excerpt}
                    </p>
                    
                    {/* Content Rendering with Paragraph Spacing */}
                    <div className="space-y-6">
                        {news.content.split('\n').map((para, i) => (
                            <p key={i}>{para}</p>
                        ))}
                    </div>
                </div>

                {/* Tags & Footer */}
                <div className="mt-16 pt-8 border-t">
                    <div className="flex flex-wrap items-center justify-between gap-6">
                        <div className="flex gap-2">
                            {['Healthcare', 'Medical', 'News'].map(tag => (
                                <span key={tag} className="bg-gray-100 text-gray-600 px-3 py-1 rounded text-sm hover:bg-gray-200 cursor-pointer">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Share this:</p>
                            <div className="flex gap-2">
                                <a href="#" className="p-2 bg-[#1877F2] text-white rounded-full hover:opacity-90"><Facebook size={18}/></a>
                                <a href="#" className="p-2 bg-[#1DA1F2] text-white rounded-full hover:opacity-90"><Twitter size={18}/></a>
                                <a href="#" className="p-2 bg-[#0A66C2] text-white rounded-full hover:opacity-90"><Linkedin size={18}/></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Newsletter Section */}
            <section className="max-w-4xl mx-auto px-6 mt-20">
                <div className="bg-blue-900 rounded-3xl p-8 md:p-12 text-center text-white">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">Stay updated with our latest news</h3>
                    <p className="text-blue-200 mb-8">Get the latest healthcare tips and hospital updates directly to your inbox.</p>
                    <form className="flex flex-col md:flex-row gap-3 max-w-md mx-auto">
                        <input type="email" placeholder="Your email address" className="flex-1 px-6 py-3 rounded-xl text-gray-900 outline-none" />
                        <button className="bg-blue-500 hover:bg-blue-400 px-8 py-3 rounded-xl font-bold transition-all">Subscribe</button>
                    </form>
                </div>
            </section>
        </article>
    );
};

export default NewsDetails;