import React from 'react';
// --- Import the video as a module (ensure 1.mp4 is in src/assets or public folder) ---
import backgroundVideo from '../assets/1.mp4'; // adjust path per your project structure

// --- SVG Icon for Instagram ---
const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="34"
    height="34"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-instagram"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const Footer = () => {
  return (
    <>
      {/* Embedded CSS for additional styling */}
      <style>{`
        footer {
          font-family: 'Roboto', sans-serif;
        }
        footer .map-frame iframe {
          border-radius: 20px;
        }
        footer a {
          transition: all 0.3s ease;
        }
        footer a:hover {
          transform: translateY(-2px);
        }
        footer video {
          filter: brightness(1.6) contrast(4.1);
        }
        @media (max-width: 768px) {
          footer h2 {
            font-size: 2rem;
          }
        }
      `}</style>

      <footer className="relative text-white border-t border-cyan-500/20 overflow-hidden" style={{ minHeight: '400px' }}>
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={{
            zIndex: 0,
            minHeight: '100%',
            minWidth: '100%',
            opacity: 0.4,
            pointerEvents: 'none' // prevents interaction issues
          }}
          src={backgroundVideo}
        ></video>
        <div className="absolute inset-0 bg-black/20" style={{ zIndex: 1 }}></div>

        <div className="container mx-auto px-4 py-20 relative" style={{ zIndex: 2 }}>
          {/* --- Top Section: Title & Socials --- */}
          <div className="flex flex-col md:flex-row justify-between items-center pb-8 mb-8 border-b border-slate-700/50">
            <div className="text-center md:text-left">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
                FutureX 2025
              </h2>
              <p className="text-white mt-6 mb-2">The Next Generation of Innovation.</p>
            </div>
            <div className="flex items-center space-x-4 mt-6 md:mt-0">
              
              <a
                href="https://www.instagram.com/future.x.2025?utm_source=qr&igsh=M2NmMnp0YzlrdHE1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-cyan-300 p-2 rounded-full hover:bg-white/10"
              >
                
                <InstagramIcon />
             
              <h2 style={{ fontWeight: 'bold', fontSize: '25px', color: '#E1306C', margin: 0 }}>
  Instagram
</h2>
 </a>

            </div>
          </div>

          {/* --- Middle Section: Map & Contact --- */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Venue Map */}
            <div className="bg-white/0.1 backdrop-blur-lg border border-white/10 rounded-2xl p-6 map-frame">
              <h3 className="text-2xl font-bold text-cyan-300 mb-4">Venue</h3>
              <div className="relative w-full overflow-hidden">
                <iframe
                  title="Chalapathi Institute of Technology Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61219.7546253709!2d80.33235572167968!3d16.463651199999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a358daecdb79c41%3A0xecc6c515c0f6d07!2sChalapathi%20Institute%20of%20Technology(Autonomous)!5e0!3m2!1sen!2sin!4v1757601432899!5m2!1sen!2sin"
                  width="100%"
                  height="250"
                  style={{
                    border: 0,
                    filter: 'grayscale(1) contrast(1.1) opacity(0.9)',
                  }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white/0.1 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-cyan-300 mb-4">Contact Us</h3>
              <div className="h-full flex flex-col justify-center">
                <h4 className="font-bold text-lg text-white mb-2">Student Coordinators:</h4>
                <ul className="text-slate-300 space-y-2">
                  <li>V. Sumanohar Reddy – 965283445</li>
                  <li>B. Venkata Pullarao – 7075690738</li>
                </ul>
                <h4 className="font-bold text-lg text-white mt-6 mb-2">General Inquiries:</h4>
                <a
                  href="mailto:csedatasciencedassa@gmail.com"
                  className="text-cyan-400 hover:underline"
                >
                  csedatasciencedassa@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* --- Bottom Section --- */}
          <div className="text-center pt-8">
            <p className="text-white mt-6 mb-2">
              &copy; {new Date().getFullYear()} FutureX Techfest. All rights reserved. | Designed By DaSSA
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
