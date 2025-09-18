import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);

    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = 'auto';
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
    `relative nav-link text-slate-300 transition duration-300 hover:text-cyan-400 ${
      isActive ? 'text-cyan-400 font-semibold' : ''
    } 
    after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-cyan-400 
    after:left-1/2 after:-translate-x-1/2 after:-bottom-1 
    after:transition-all after:duration-300 hover:after:w-full`;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled || isOpen
            ? 'bg-slate-900/70 backdrop-blur-lg border-b border-slate-700/40'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand */}
            <NavLink to="/home" className="flex-shrink-0">
              <span className="text-3xl font-bold tracking-wider font-orbitron bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text hover:drop-shadow-[0_0_8px_#22d3ee] transition duration-300">
                FutureX
              </span>
            </NavLink>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center space-x-8">
              <NavLink to="/home" className={linkClass}>
                Home
              </NavLink>
              <button onClick={handleAboutClick} className="nav-link text-slate-300 hover:text-cyan-400 transition duration-300 relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-cyan-400 after:left-1/2 after:-translate-x-1/2 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full">
                About
              </button>
              <NavLink to="/events" className={linkClass}>
                Events
              </NavLink>
              <NavLink to="/faqs" className={linkClass}>
                FAQs
              </NavLink>
              <a
                href="https://forms.gle/mU88yw64QHCMLn4GA"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-cyan-500 text-black font-bold rounded-full text-sm uppercase tracking-wider transition-all duration-300 hover:bg-cyan-400 hover:scale-105 active:scale-95 shadow-lg shadow-cyan-500/30"
              >
                Register Now
              </a>
            </div>

            {/* Hamburger */}
            {/* Circular Animated Hamburger */}
<div className="-mr-2 flex md:hidden">
  <button
    onClick={() => setIsOpen(!isOpen)}
    aria-label="Toggle Menu"
    className={`relative w-12 h-12 flex items-center justify-center rounded-full border-2 border-cyan-400 transition-all duration-500 
      ${isOpen ? 'rotate-180 border-purple-400 shadow-[0_0_12px_#a855f7]' : 'hover:rotate-90 hover:shadow-[0_0_8px_#22d3ee]'}`}
  >
    {/* Three Bars */}
    <span
      className={`absolute block w-6 h-0.5 bg-cyan-400 rounded-full transition-all duration-500 ${
        isOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
      }`}
    ></span>
    <span
      className={`absolute block w-6 h-0.5 bg-cyan-400 rounded-full transition-all duration-500 ${
        isOpen ? 'opacity-0' : 'opacity-100'
      }`}
    ></span>
    <span
      className={`absolute block w-6 h-0.5 bg-cyan-400 rounded-full transition-all duration-500 ${
        isOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
      }`}
    ></span>
  </button>
</div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        id="mobile-menu-overlay"
        className={`fixed inset-0 z-40 bg-slate-900/90 backdrop-blur-xl transition-opacity duration-300 ease-in-out md:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-6">
          <NavLink
            to="/home"
            onClick={() => setIsOpen(false)}
            className="text-4xl font-bold text-slate-300 hover:text-cyan-300 transition duration-300"
          >
            Home
          </NavLink>
          <button
            onClick={handleAboutClick}
            className="text-4xl font-bold text-slate-300 hover:text-cyan-300 transition duration-300"
          >
            About
          </button>
          <NavLink
            to="/events"
            onClick={() => setIsOpen(false)}
            className="text-4xl font-bold text-slate-300 hover:text-cyan-300 transition duration-300"
          >
            Events
          </NavLink>
          <NavLink
            to="/faqs"
            onClick={() => setIsOpen(false)}
            className="text-4xl font-bold text-slate-300 hover:text-cyan-300 transition duration-300"
          >
            FAQs
          </NavLink>
          <a
            href="https://forms.gle/mU88yw64QHCMLn4GA"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 px-8 py-3 bg-cyan-500 text-black font-bold rounded-full text-lg uppercase tracking-wider transition-all duration-300 hover:bg-cyan-400 hover:scale-105 shadow-lg shadow-cyan-500/30"
          >
            Register Now
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
