import React from 'react';

const Footer = () => {
    const footerInfo = [
        { title: 'Date', content: 'October 8-9, 2025', color: 'text-cyan-400' },
        { title: 'Location', content: 'Chalapathi Institute of Technology, Guntur', color: 'text-purple-400' },
        { title: 'Theme', content: 'Future Tech Revolution', color: 'text-green-400' }
    ];

    return (
        <footer className="bg-[#0a0a14] text-white pt-16 pb-8 font-rajdhani">
            <div className="container mx-auto px-4 text-center">
                <h2 
                    className="text-5xl font-bold font-orbitron mb-4 text-slate-200"
                    style={{ textShadow: '0 0 15px rgba(255, 255, 255, 0.4), 0 0 25px rgba(255, 255, 255, 0.2)' }}
                >
                    FutureX 2025
                </h2>
                <p className="text-slate-400 mb-12 max-w-2xl mx-auto">
                    Step into the future of technology. Experience the next generation of innovation.
                </p>

                {/* Decorative Slider */}
                <div className="relative w-full max-w-lg mx-auto mb-16 h-1 flex items-center">
                    <div className="absolute w-full h-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-transparent"></div>
                    <div className="absolute left-1/2 w-3 h-3 bg-cyan-300 rounded-full" style={{boxShadow: '0 0 10px #00e6ff'}}></div>
                </div>

                {/* Google Maps Embed */}
                <div className="mb-16">
                     <div className="relative w-full max-w-4xl mx-auto border-2 border-purple-500/40 rounded-2xl shadow-lg shadow-purple-500/20 overflow-hidden p-2 bg-black/20">
                        <iframe
                            title="Chalapathi Institute of Technology Location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61219.7546253709!2d80.33235572167968!3d16.463651199999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a358daecdb79c41%3A0xecc6c515c0f6d07!2sChalapathi%20Institute%20of%20Technology(Autonomous)!5e0!3m2!1sen!2sin!4v1757601432899!5m2!1sen!2sin" 
                            width="100%"
                            height="400"
                            style={{ border: 0, filter: 'grayscale(1) contrast(1.2) opacity(0.8)', borderRadius: '0.75rem' }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                         <div className="absolute inset-2 bg-gradient-to-t from-[#0a0a14] via-transparent to-transparent pointer-events-none rounded-xl"></div>
                    </div>
                </div>


                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {footerInfo.map(item => (
                        <div key={item.title}>
                            <h3 className={`text-lg font-bold uppercase tracking-widest mb-2 ${item.color}`}>
                                {item.title}
                            </h3>
                            <p className="text-slate-300">{item.content}</p>
                        </div>
                    ))}
                </div>

                {/* Divider and Copyright */}
                <div className="border-t border-slate-700/50 pt-8">
                    <p className="text-slate-500 text-sm">
                        &copy; {new Date().getFullYear()} FutureX Techfest. All rights reserved. | Powered by Innovation
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

