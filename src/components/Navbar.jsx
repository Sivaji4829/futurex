import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const HamburgerIcon = ({ isOpen }) => (
    <div className="w-7 h-7 flex flex-col justify-between items-center relative">
        <span className={`block w-full h-0.5 bg-cyan-400 rounded-full transition-all duration-300 ease-in-out ${isOpen ? 'rotate-45 translate-y-[13px]' : ''}`}></span>
        <span className={`block w-full h-0.5 bg-cyan-400 rounded-full transition-opacity duration-200 ease-in-out ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
        <span className={`block w-full h-0.5 bg-cyan-400 rounded-full transition-all duration-300 ease-in-out ${isOpen ? '-rotate-45 -translate-y-[13px]' : ''}`}></span>
    </div>
);


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const linkClass = ({ isActive }) =>
        `relative px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
      isActive
        ? 'text-cyan-300'
        : 'text-slate-300 hover:text-cyan-300'
    } nav-link`;
    
    // Don't render navbar on the entry page
    if (location.pathname === '/') {
        return null;
    }

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-900/50 backdrop-blur-lg border-b border-slate-700/50' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center">
                        <NavLink to="/home" className="flex-shrink-0">
                            <span className="text-white text-3xl font-bold tracking-wider font-orbitron bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
                                Future X
                            </span>
                        </NavLink>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-6">
                            <NavLink to="/home" className={linkClass}>Home</NavLink>
                            <NavLink to="/events" className={linkClass}>Events</NavLink>
                            <NavLink to="/faqs" className={linkClass}>FAQs</NavLink>
                            <button className="px-5 py-2 bg-cyan-500 text-black font-bold rounded-full text-sm uppercase tracking-wider transition-all duration-300 hover:bg-cyan-400 hover:scale-105 neon-shadow-blue">
                                Register Now
                            </button>
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="p-2 rounded-md focus:outline-none transition-transform duration-300 hover:scale-110"
                            aria-controls="mobile-menu"
                            aria-expanded={isOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            <HamburgerIcon isOpen={isOpen} />
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden bg-slate-900/80 backdrop-blur-lg" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <NavLink to="/home" className={(props) => `${linkClass(props)} block w-full text-left`} onClick={() => setIsOpen(false)}>Home</NavLink>
                        <NavLink to="/events" className={(props) => `${linkClass(props)} block w-full text-left`} onClick={() => setIsOpen(false)}>Events</NavLink>
                        <NavLink to="/faqs" className={(props) => `${linkClass(props)} block w-full text-left`} onClick={() => setIsOpen(false)}>FAQs</NavLink>
                         <button className="mt-2 w-full text-left px-3 py-2 bg-cyan-500 text-black font-bold rounded-md text-sm uppercase tracking-wider">
                            Register Now
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

