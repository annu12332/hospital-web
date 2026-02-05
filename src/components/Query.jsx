import React from 'react';
import { Link } from 'react-router';

const Query = () => {
    return (
        <section className="bg-[#002B49] py-12 px-4 md:px-10">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-white">
                    <h2 className="text-3xl font-bold mb-2">Ask Evercare</h2>
                    <p className="text-gray-300 text-lg">Looking for world-class care, we are here to support you.</p>
                </div>
                <Link to="/query"><button  className="bg-white text-[#002B49] px-10 py-3 font-bold rounded-sm hover:bg-gray-100 transition-colors uppercase tracking-wider text-sm">
                    Send Query
                </button></Link>
                
            </div>
        </section>
    );
};

export default Query;