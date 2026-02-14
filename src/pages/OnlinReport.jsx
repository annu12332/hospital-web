import React, { useState } from 'react';
import { Download, Eye, FileText, Search, Phone, Hash, User, ShieldCheck, RefreshCcw } from 'lucide-react';

const OnlineReportPage = () => {
    const [filters, setFilters] = useState({
        patientId: '',
        patientName: '',
        phone: ''
    });
    const [isSearching, setIsSearching] = useState(false);
    const [reports, setReports] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);

    // Sample Data
    const mockData = [
        { id: 'P-101', patientName: 'Rahim Uddin', phone: '01711223344', testName: 'CBC & Blood Group', date: '14 Feb 2026', doctor: 'Dr. Sarah Ahmed', status: 'Ready' },
        { id: 'P-102', patientName: 'Karim Shekh', phone: '01811223344', testName: 'ECG Report', date: '12 Feb 2026', doctor: 'Dr. Amit Das', status: 'Ready' },
        { id: 'P-103', patientName: 'Rahim Uddin', phone: '01711223344', testName: 'Urine Analysis', date: '10 Feb 2026', doctor: 'Dr. Rahul Sharma', status: 'Ready' },
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setIsSearching(true);


        setTimeout(() => {
            const results = mockData.filter(item => {
                const matchId = filters.patientId ? item.id.toLowerCase().includes(filters.patientId.toLowerCase()) : true;
                const matchName = filters.patientName ? item.patientName.toLowerCase().includes(filters.patientName.toLowerCase()) : true;
                const matchPhone = filters.phone ? item.phone.includes(filters.phone) : true;


                return (filters.patientId || filters.patientName || filters.phone) && (matchId && matchName && matchPhone);
            });

            setReports(results);
            setIsSearching(false);
            setHasSearched(true);
        }, 800);
    };

    const resetFilters = () => {
        setFilters({ patientId: '', patientName: '', phone: '' });
        setReports([]);
        setHasSearched(false);
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Header / Navbar */}
            <nav className="bg-[#001e3c] py-5 px-6 shadow-lg">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-500 p-2 rounded-lg">
                            <ShieldCheck className="text-white" size={24} />
                        </div>
                        <span className="text-2xl font-bold text-white tracking-tight">MediPortal</span>
                    </div>
                    <div className="hidden md:block text-blue-200 text-sm">
                        Emergency: <span className="text-white font-bold">+880 1234 567 890</span>
                    </div>
                </div>
            </nav>

            {/* Search Section */}
            <section className="bg-[#001e3c] text-white py-16 px-4 border-t border-blue-900/50">
                <div className="max-w-5xl mx-auto text-center mb-10">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4">Search Patient Report</h1>
                    <p className="text-blue-200 opacity-80">Enter your details below to find and download medical reports</p>
                </div>

                <div className="max-w-5xl mx-auto bg-white rounded-3xl p-6 md:p-10 shadow-2xl">
                    <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Input 1: Patient ID */}
                        <div className="space-y-2">
                            <label className="text-[#001e3c] font-semibold flex items-center gap-2 ml-1">
                                <Hash size={16} className="text-blue-600" /> Patient ID
                            </label>
                            <input
                                name="patientId"
                                type="text"
                                placeholder="Ex: P-101"
                                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                value={filters.patientId}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Input 2: Patient Name */}
                        <div className="space-y-2">
                            <label className="text-[#001e3c] font-semibold flex items-center gap-2 ml-1">
                                <User size={16} className="text-blue-600" /> Patient Name
                            </label>
                            <input
                                name="patientName"
                                type="text"
                                placeholder="Ex: Rahim Uddin"
                                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                value={filters.patientName}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Input 3: Phone Number */}
                        <div className="space-y-2">
                            <label className="text-[#001e3c] font-semibold flex items-center gap-2 ml-1">
                                <Phone size={16} className="text-blue-600" /> Phone Number
                            </label>
                            <input
                                name="phone"
                                type="text"
                                placeholder="017XXXXXXXX"
                                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                value={filters.phone}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Buttons */}
                        <div className="md:col-span-3 flex flex-col md:flex-row gap-4 pt-4">
                            <button
                                type="submit"
                                className="flex-grow bg-[#001e3c] hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
                            >
                                {isSearching ? <RefreshCcw className="animate-spin" /> : <Search size={22} />}
                                {isSearching ? 'Searching Database...' : 'Search Reports'}
                            </button>
                            <button
                                type="button"
                                onClick={resetFilters}
                                className="px-8 py-4 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-all"
                            >
                                Clear
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            {/* Results Section */}
            <main className="max-w-5xl mx-auto px-4 py-16">
                {reports.length > 0 ? (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between border-b pb-4">
                            <h2 className="text-2xl font-bold text-[#001e3c]">Found Reports</h2>
                            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold">
                                {reports.length} Results
                            </span>
                        </div>

                        <div className="grid gap-4">
                            {reports.map((report) => (
                                <div key={report.id} className="group bg-white border border-gray-200 p-6 rounded-2xl hover:border-blue-300 hover:shadow-xl transition-all flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div className="flex gap-5">
                                        <div className="bg-[#001e3c] p-4 rounded-2xl text-white group-hover:scale-110 transition-transform">
                                            <FileText size={30} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800">{report.testName}</h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 mt-2 text-sm text-gray-500">
                                                <p><span className="font-semibold text-blue-600">ID:</span> {report.id}</p>
                                                <p><span className="font-semibold text-gray-700">Patient:</span> {report.patientName}</p>
                                                <p><span className="font-semibold text-gray-700">Date:</span> {report.date}</p>
                                                <p><span className="font-semibold text-gray-700">Phone:</span> {report.phone}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-100 font-bold text-gray-700 hover:bg-gray-50 transition-all">
                                            <Eye size={18} /> View
                                        </button>
                                        <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#001e3c] text-white font-bold hover:bg-blue-900 transition-all shadow-lg">
                                            <Download size={18} /> Download
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : hasSearched && !isSearching ? (
                    <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                        <div className="bg-white w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                            <Search size={40} className="text-gray-300" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800">No Match Found</h3>
                        <p className="text-gray-500 mt-2 max-w-xs mx-auto">We couldn't find any report with the provided information. Please check the spelling or ID.</p>
                    </div>
                ) : (
                    <div className="text-center py-20 opacity-40">
                        <p className="text-lg text-gray-400 font-medium">Results will appear here after you search</p>
                    </div>
                )}
            </main>

            {/* Support Footer */}
            <footer className="bg-gray-50 py-12 border-t border-gray-100">
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <p className="text-[#001e3c] font-bold mb-2">Need Help Finding Your Report?</p>
                    <p className="text-gray-500 text-sm">Please visit our reception or call our 24/7 helpline.</p>
                    <div className="mt-6 flex justify-center gap-8">
                        <div className="text-center text-xs text-gray-400 uppercase tracking-widest">ISO 9001 Certified</div>
                        <div className="text-center text-xs text-gray-400 uppercase tracking-widest">Secure Data Encryption</div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default OnlineReportPage;