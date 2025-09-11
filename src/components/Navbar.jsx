import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        // Toggle body scroll
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.body.style.overflow = 'auto'; // Cleanup on component unmount
        };
    }, [isOpen]);

    const linkClass = ({ isActive }) =>
        `relative px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
      isActive
        ? 'text-cyan-300'
        : 'text-slate-300 hover:text-cyan-300'
    } nav-link`;

    return (
        <>
            <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-900/80 backdrop-blur-lg border-b border-slate-700/50' : 'bg-transparent'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <div className="flex items-center">
                            <NavLink to="/home" className="flex-shrink-0">
                                <span className="text-white text-3xl font-bold tracking-wider font-orbitron bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
                                    FutureX
                                </span>
                            </NavLink>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-center space-x-6">
                                <NavLink to="/home" className={linkClass}>Home</NavLink>
                                <NavLink to="/events" className={linkClass}>Events</NavLink>
                                <NavLink to="/faqs" className={linkClass}>FAQs</NavLink>
                                <a 
                                    href="https://forms.gle/mU88yw64QHCMLn4GA"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-5 py-2 bg-cyan-500 text-black font-bold rounded-full text-sm uppercase tracking-wider transition-all duration-300 hover:bg-cyan-400 hover:scale-105 neon-shadow-blue">
                                    Register Now
                                </a>
                            </div>
                        </div>
                        {/* Futuristic Hamburger Button */}
                        <div className="-mr-2 flex md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                type="button"
                                className="relative w-10 h-10 flex items-center justify-center focus:outline-none z-50"
                                aria-controls="mobile-menu"
                                aria-expanded={isOpen}
                            >
                                <span className="sr-only">Open main menu</span>
                                <div className="space-y-2">
                                    <span className={`block w-8 h-0.5 bg-cyan-400 transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-45 translate-y-[10px]' : ''}`}></span>
                                    <span className={`block w-8 h-0.5 bg-cyan-400 transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-0' : ''}`}></span>
                                    <span className={`block w-8 h-0.5 bg-cyan-400 transition-transform duration-300 ease-in-out ${isOpen ? '-rotate-45 -translate-y-[10px]' : ''}`}></span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            {/* Mobile Menu Fullscreen Overlay */}
            <div 
                className={`fixed inset-0 z-40 bg-slate-900/90 backdrop-blur-xl transition-opacity duration-300 ease-in-out md:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                id="mobile-menu-overlay"
            >
                <div className="flex flex-col items-center justify-center h-full space-y-8">
                    <NavLink to="/home" className="text-3xl font-bold text-slate-300 hover:text-cyan-300 transition-colors" onClick={() => setIsOpen(false)}>Home</NavLink>
                    <NavLink to="/events" className="text-3xl font-bold text-slate-300 hover:text-cyan-300 transition-colors" onClick={() => setIsOpen(false)}>Events</NavLink>
                    <NavLink to="/faqs" className="text-3xl font-bold text-slate-300 hover:text-cyan-300 transition-colors" onClick={() => setIsOpen(false)}>FAQs</NavLink>
                     <a 
                        href="https://forms.gle/mU88yw64QHCMLn4GA"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-8 px-8 py-3 bg-cyan-500 text-black font-bold rounded-full text-lg uppercase tracking-wider transition-all duration-300 hover:bg-cyan-400 hover:scale-105">
                        Register Now
                    </a>
                </div>
            </div>
        </>
    );
};

export default Navbar;

