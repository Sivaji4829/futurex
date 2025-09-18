import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        // Toggle body scroll to prevent scrolling when the overlay is open
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

    const handleAboutClick = () => {
        setIsOpen(false);
        if (location.pathname !== '/home') {
            navigate('/home', { state: { scrollTo: 'about-section' } });
        } else {
            document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const linkClass = ({ isActive }) =>
        `nav-link ${isActive ? 'active' : ''}`;

    return (
        <>
            <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled || isOpen ? 'bg-slate-900/80 backdrop-blur-lg border-b border-slate-700/50' : 'bg-transparent'}`}>
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
                            <div className="ml-10 flex items-center space-x-8">
                                <NavLink to="/home" className={linkClass}>Home</NavLink>
                                <button onClick={handleAboutClick} className="nav-link">About</button>
                                <NavLink to="/events" className={linkClass}>Events</NavLink>
                                <NavLink to="/faqs" className={linkClass}>FAQs</NavLink>
                                <a 
                                    href="https://forms.gle/mU88yw64QHCMLn4GA"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-2 bg-cyan-500 text-black font-bold rounded-full text-sm uppercase tracking-wider transition-all duration-300 hover:bg-cyan-400 hover:scale-105 active:scale-95 shadow-lg shadow-cyan-500/30">
                                    Register Now
                                </a>
                            </div>
                        </div>
                        {/* New Futuristic Hamburger Button */}
                        <div className="-mr-2 flex md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                type="button"
                                className="relative w-10 h-10 flex flex-col items-center justify-center focus:outline-none z-50"
                                aria-controls="mobile-menu"
                                aria-expanded={isOpen}
                            >
                                <span className="sr-only">Open main menu</span>
                                <div className={`w-8 h-0.5 bg-cyan-400 rounded-full transition-all duration-300 ease-in-out ${isOpen ? 'rotate-45 translate-y-2' : '-translate-y-2'}`}></div>
                                <div className={`w-8 h-0.5 bg-cyan-400 rounded-full my-1 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0' : 'opacity-100'}`}></div>
                                <div className={`w-8 h-0.5 bg-cyan-400 rounded-full transition-all duration-300 ease-in-out ${isOpen ? '-rotate-45 -translate-y-2' : 'translate-y-2'}`}></div>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            {/* New Mobile Menu Fullscreen Overlay */}
            <div 
                className={`fixed inset-0 z-40 bg-slate-900/90 backdrop-blur-xl transition-opacity duration-300 ease-in-out md:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                id="mobile-menu-overlay"
            >
                <div className="mobile-grid-background"></div>
                <div className="flex flex-col items-center justify-center h-full space-y-6">
                    <NavLink to="/home" className={`text-4xl font-bold text-slate-300 hover:text-cyan-300 transition-all duration-300 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: `${isOpen ? 150 : 0}ms` }} onClick={() => setIsOpen(false)}>Home</NavLink>
                    <button onClick={handleAboutClick} className={`text-4xl font-bold text-slate-300 hover:text-cyan-300 transition-all duration-300 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: `${isOpen ? 250 : 0}ms` }}>About</button>
                    <NavLink to="/events" className={`text-4xl font-bold text-slate-300 hover:text-cyan-300 transition-all duration-300 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: `${isOpen ? 350 : 0}ms` }} onClick={() => setIsOpen(false)}>Events</NavLink>
                    <NavLink to="/faqs" className={`text-4xl font-bold text-slate-300 hover:text-cyan-300 transition-all duration-300 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: `${isOpen ? 450 : 0}ms` }} onClick={() => setIsOpen(false)}>FAQs</NavLink>
                     <a 
                        href="https://forms.gle/mU88yw64QHCMLn4GA"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`mt-8 px-8 py-3 bg-cyan-500 text-black font-bold rounded-full text-lg uppercase tracking-wider transition-all duration-300 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                        style={{ transitionDelay: `${isOpen ? 550 : 0}ms` }}
                        >
                        Register Now
                    </a>
                </div>
            </div>
        </>
    );
};

export default Navbar;

