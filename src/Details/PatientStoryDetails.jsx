import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { Calendar, MapPin, User, ChevronLeft, Loader2 } from 'lucide-react';

const PatientStoryDetails = () => {
    const { id } = useParams();
    const [story, setStory] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStoryData = async () => {
            try {
                const response = await fetch('/public/story.json');
                if (!response.ok) throw new Error('Data fetch failed');
                const data = await response.json();


                const foundStory = data.find(item => String(item.id) === String(id));

                setStory(foundStory);
            } catch (error) {
                console.error("Error fetching story details:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchStoryData();
        }
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) {
        return (
            <div className="h-screen flex flex-col items-center justify-center text-[#002B49] gap-4">
                <Loader2 className="animate-spin" size={40} />
                <p className="font-bold animate-pulse tracking-widest text-sm">LOADING DETAILS...</p>
            </div>
        );
    }

    if (!story) {
        return (
            <div className="h-screen flex flex-col items-center justify-center gap-4">
                <h2 className="text-2xl font-bold text-red-500">Story Not Found!</h2>
                <Link to="/" className="text-[#4FC3F7] underline font-bold">Back to Home</Link>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-white pt-24 pb-12">
            <div className="max-w-4xl mx-auto px-4 md:px-0">
                {/* Breadcrumb */}
                <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#4FC3F7] font-bold text-sm mb-8 transition-colors">
                    <ChevronLeft size={20} /> Back to Stories
                </Link>

                {/* Content */}
                <span className="bg-[#4FC3F7]/10 text-[#002B49] text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 inline-block">
                    {story.speciality}
                </span>

                <h1 className="text-3xl md:text-5xl font-extrabold text-[#002B49] mb-8 leading-tight">
                    {story.title}
                </h1>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 font-bold mb-10 border-b border-gray-100 pb-8 uppercase tracking-widest">
                    <span className="flex items-center gap-2"><Calendar size={18} className="text-[#4FC3F7]" /> {story.published_date}</span>
                    <span className="flex items-center gap-2"><MapPin size={18} className="text-[#4FC3F7]" /> {story.city}</span>
                </div>

                {/* Main Image */}
                <div className="rounded-3xl overflow-hidden shadow-2xl mb-12">
                    <img src={story.image} alt={story.title} className="w-full h-auto object-cover" />
                </div>

                {/* Consultant Info */}
                <div className="bg-[#002B49] p-8 rounded-2xl text-white mb-12 flex items-center gap-6">
                    <div className="w-16 h-16 bg-[#4FC3F7] rounded-full flex items-center justify-center">
                        <User size={32} className="text-[#002B49]" />
                    </div>
                    <div>
                        <p className="text-[#4FC3F7] text-xs font-black uppercase tracking-widest mb-1">Consultant In Charge</p>
                        <h3 className="text-xl font-bold">{story.doctor_name}</h3>
                        <p className="text-gray-400 text-sm italic">{story.speciality}</p>
                    </div>
                </div>

                {/* Story Body */}
                <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
                    <p className="text-xl font-medium text-[#002B49] mb-6">
                        {story.content}
                    </p>

                </div>
            </div>
        </main>
    );
};

export default PatientStoryDetails;