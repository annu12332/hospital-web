import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { Phone } from 'lucide-react';

const PackageDetails = () => {
    const { id } = useParams();
    const [pkg, setPkg] = useState(null);
    const [allPackages, setAllPackages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/Public/health-packages.json')
            .then(res => res.json())
            .then(data => {
                setAllPackages(data);
                const found = data.find(item => item.id === parseInt(id));
                setPkg(found);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, [id]);

    if (loading) return <div className="py-20 text-center font-bold">Loading...</div>;
    if (!pkg) return <div className="py-20 text-center">Package Not Found</div>;

    const allTests = Object.values(pkg.full_details).flat();
    const half = Math.ceil(allTests.length / 2);
    const leftColumn = allTests.slice(0, half);
    const rightColumn = allTests.slice(half);

    return (
        <div className="bg-white min-h-screen ">
            {/* Top Banner Image */}
            <div className="w-full h-[300px] md:h-[450px] overflow-hidden">
                <img 
                    src={pkg.image} 
                    alt="Banner" 
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Breadcrumbs */}
            <div className="max-w-7xl mx-auto px-4 py-4 text-xs flex gap-2 text-gray-600 ">
                <Link to="/" className="text-blue-600 hover:underline">🏠 Home</Link> 
                <span>›</span> 
                <Link to="/packages" className="text-blue-600 hover:underline">Health Check</Link> 
                <span>›</span> 
                <span className="font-bold uppercase">{pkg.title}</span>
            </div>

            <main className="max-w-7xl mx-auto px-4 md:px-10 py-6">
                <div className="flex flex-col md:flex-row justify-between gap-10 container mx-auto">
                    
                    {/* Left: Package Info & Tests */}
                    <div className="flex-1 ">
                        <h1 className="text-2xl font-bold text-[#002B49] uppercase tracking-tight">
                            {pkg.title}
                        </h1>
                        <p className="text-[#4FC3F7] text-xl font-bold mt-2">
                            {pkg.price}
                        </p>

                        {/* Two Column Test List */}
                        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
                            {/* Left Column */}
                            <ul className="space-y-3">
                                {leftColumn.map((test, i) => (
                                    <li key={i} className="flex items-start gap-2 text-[13px] font-bold text-[#002B49] uppercase">
                                        <span className="text-[#4FC3F7] mt-1">•</span> {test}
                                    </li>
                                ))}
                            </ul>
                            {/* Right Column */}
                            <ul className="space-y-3">
                                {rightColumn.map((test, i) => (
                                    <li key={i} className="flex items-start gap-2 text-[13px] font-bold text-[#002B49] uppercase">
                                        <span className="text-[#4FC3F7] mt-1">•</span> {test}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <button className="mt-10 bg-[#002B49] text-white px-8 py-2 text-xs font-bold rounded-sm hover:bg-[#001a2c] transition-all">
                            Book Now
                        </button>
                    </div>

                    {/* Right: Select Package Sidebar */}
                    <div className="w-full md:w-[300px]">
                        <label className="block text-[13px] font-bold text-[#002B49] mb-2">Select Packages</label>
                        <select 
                            className="w-full border border-gray-300 p-2 text-xs focus:outline-none"
                            value={pkg.id}
                            onChange={(e) => window.location.href = `/package/${e.target.value}`}
                        >
                            {allPackages.map(p => (
                                <option key={p.id} value={p.id}>{p.title}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Footer Assistance */}
                <div className="mt-20 border-t pt-6 text-center">
                    <p className="text-[13px] font-bold text-[#002B49] flex items-center justify-center gap-2">
                        For assistance and more information. Please call 
                        <span className="bg-[#B39DDB] text-white px-3 py-1 rounded-sm flex items-center gap-1">
                            <Phone size={14} fill="currentColor" /> 10663
                        </span>
                    </p>
                </div>
            </main>
        </div>
    );
};

export default PackageDetails;