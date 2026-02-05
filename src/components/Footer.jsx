import React from 'react';
import { Facebook, Twitter, Youtube, Instagram, Linkedin, Phone } from 'lucide-react';
import { Link } from 'react-router';

const Footer = () => {
    return (
        <footer className="bg-[#001A2C] text-white pt-16 pb-6 px-4 md:px-10 font-sans">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start border-b border-gray-700 pb-12">
                    
                    {/* Left Section: Contact Info */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold uppercase tracking-wider">Evercare Tele Online</h3>
                        <p className="text-gray-300 text-sm">infoctg@evercarebd.com</p>
                        <div className="flex items-center gap-2 text-gray-300 font-bold">
                            <Phone size={16} fill="white" className="text-white" /> 10663
                        </div>
                        <Link to="/privacy-policy" className="block text-gray-400 text-xs hover:text-white underline decoration-gray-600">
                            Privacy Policy
                        </Link>
                        
                        {/* Social Icons */}
                        <div className="flex gap-4 pt-4">
                            <Facebook size={18} className="cursor-pointer hover:text-[#4FC3F7]" />
                            <Twitter size={18} className="cursor-pointer hover:text-[#4FC3F7]" />
                            <Youtube size={18} className="cursor-pointer hover:text-[#4FC3F7]" />
                            <Instagram size={18} className="cursor-pointer hover:text-[#4FC3F7]" />
                            <Linkedin size={18} className="cursor-pointer hover:text-[#4FC3F7]" />
                        </div>
                    </div>

                    {/* Middle Section: Logo and Button */}
                    <div className="flex flex-col items-center text-center space-y-6">
                        <div className="flex flex-col items-center">
                            <h1 className="text-3xl font-bold leading-none tracking-tight text-white">evercare</h1>
                            <p className="text-[10px] font-bold text-gray-300 tracking-[0.2em] uppercase">Hospital Chattogram</p>
                            <span className="text-[8px] italic text-[#4FC3F7] font-medium">Transforming Healthcare</span>
                        </div>
                        
                        <Link to="/query"><button className="bg-[#4FC3F7] text-[#001A2C] px-10 py-2.5 rounded-full font-bold text-sm hover:bg-white transition-colors shadow-lg">
                            Send Query
                        </button></Link>
                    </div>

                    {/* Right Section: Address */}
                    <div className="md:text-right space-y-4">
                        <h3 className="text-sm font-bold uppercase tracking-wider">Chattogram</h3>
                        <p className="text-gray-300 text-xs leading-relaxed max-w-[250px] md:ml-auto">
                            Evercare Hospital Chattogram, Plot No. H1, <br />
                            Anannya CDA Residential Area, Oxygen - <br />
                            Kuwaish Rd, Chattogram 4337, Bangladesh.
                        </p>
                        <p className="text-gray-500 text-[10px] pt-4">
                            © Copyright 2026 evercarebd. All rights reserved.
                        </p>
                    </div>
                </div>

                {/* Bottom Links Section */}
                <div className="mt-10">
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-[11px] font-bold uppercase tracking-wide text-gray-300">
                        <Link to="/doctors" className="hover:text-[#4FC3F7]">Find a Doctor</Link>
                        <Link to="/appointment" className="hover:text-[#4FC3F7]">Request an Appointment</Link>
                        <Link to="/reports" className="hover:text-[#4FC3F7]">Online Report</Link>
                        <Link to="/career" className="hover:text-[#4FC3F7]">Career</Link>
                        <Link to="/contact" className="hover:text-[#4FC3F7]">Contact Us</Link>
                        <Link to="/speciality" className="hover:text-[#4FC3F7]">Speciality</Link>
                        <Link to="/health-package" className="hover:text-[#4FC3F7]">Health Package</Link>
                        <Link to="/news" className="hover:text-[#4FC3F7]">News & Media</Link>
                        <Link to="/blogs" className="hover:text-[#4FC3F7]">Blogs</Link>
                        <Link to="/about" className="hover:text-[#4FC3F7]">About Us</Link>
                    </div>
                    
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-[11px] font-bold uppercase tracking-wide text-gray-300 mt-4 border-t border-gray-800 pt-4">
                        <Link to="/stories" className="hover:text-[#4FC3F7]">Patient Stories</Link>
                        <Link to="/tele-online" className="hover:text-[#4FC3F7]">Tele Online</Link>
                        <Link to="/privacy-policy" className="hover:text-[#4FC3F7]">Privacy Policy</Link>
                        <Link to="/guide" className="hover:text-[#4FC3F7]">Patient & Visitor Guide</Link>
                    </div>
                </div>
                
                {/* Background Large Text Decor */}
                <div className="mt-10 opacity-5 select-none pointer-events-none overflow-hidden">
                    <h2 className="text-7xl md:text-9xl font-black text-center whitespace-nowrap">
                        Transforming Healthcare
                    </h2>
                </div>
            </div>
        </footer>
    );
};

export default Footer;