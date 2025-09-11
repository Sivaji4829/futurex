import React, { useState, useCallback } from 'react';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

// --- FAQ Data ---
const faqData = [
  {
    category: "General Information",
    accentColor: "cyan",
    questions: [
      {
        q: "What is FutureX 2025?",
        a: "FutureX 2025 is the region's premier technology festival, a two-day immersive experience celebrating innovation, creativity, and the future of technology. It brings together students, professionals, and enthusiasts for a series of competitions, workshops, and tech showcases."
      },
      {
        q: "Who can attend the event?",
        a: "Everyone is welcome! Whether you are a college student, a high school enthusiast, a working professional, or just curious about technology, FutureX has something for you."
      },
      {
        q: "What are the official dates and timings?",
        a: "FutureX 2025 will be held on October 8th and 9th, from 9:00 AM to 6:00 PM on both days. Specific event timings can be found on the Events page."
      },
      {
        q: "Where is the event located?",
        a: "The event will take place at the Chalapathi Institute of Technology, Mothadaka, Guntur, Andhra Pradesh. Detailed maps and directions will be available on the website closer to the event date."
      }
    ]
  },
  {
    category: "Registration & Fees",
    accentColor: "purple",
    questions: [
      {
        q: "How can I register for FutureX 2025?",
        a: "You can register online by clicking the 'Register Now' button on our website. This will redirect you to a Google Form where you can fill in your details and choose your events. On-spot registration will also be available but is subject to availability."
      },
      {
        q: "Is there a registration fee?",
        a: "Yes, there is a nominal registration fee which covers access to the main expo and select non-competitive events. Most competitions have their own separate participation fees, which are listed on the Events page."
      },
      {
        q: "Can I register for multiple events?",
        a: "Absolutely! You are encouraged to participate in as many events as you like. Please check the event schedule to ensure there are no timing conflicts between your chosen competitions."
      },
      {
        q: "What payment methods are accepted?",
        a: "We accept all major online payment methods, including UPI, credit/debit cards, and net banking through our secure payment gateway linked in the registration form."
      }
    ]
  },
  {
    category: "Events & Competitions",
    accentColor: "green",
    questions: [
      {
        q: "What kind of events can I expect?",
        a: "We have a diverse range of events including coding challenges (Escape from Error Island), robotics, AI art generation (Vision X), project expos, tech talks, and immersive VR experiences. Check our Events page for a full list and detailed descriptions."
      },
      {
        q: "Do I need to bring my own laptop or equipment?",
        a: "For most coding and design events, participants are required to bring their own laptops. For specialized events like the VR Fun Zone or Robotics, all necessary equipment will be provided. Please check the specific rules for each event you register for."
      },
      {
        q: "Can I participate in a team?",
        a: "Many of our events, such as the Project Expo and Cinematic Odyssey, allow team participation. The maximum team size varies by event, so please refer to the event-specific details. Some events like Tech Talks are individual competitions."
      },
      {
        q: "What are the prizes?",
        a: "We have a prize pool of over 50+ awards, including cash prizes, certificates, tech gadgets, and internship opportunities with our partner companies. Winners for each competition will be announced during the closing ceremony."
      }
    ]
  },
  {
    category: "Logistics & Support",
    accentColor: "red",
    questions: [
      {
        q: "Will food and beverages be available at the venue?",
        a: "Yes, there will be multiple food courts and stalls available throughout the campus, offering a variety of food and beverage options for purchase."
      },
      {
        q: "Is there parking available?",
        a: "Yes, dedicated parking space is available for participants at the venue. Our volunteer team will be there to guide you."
      },
      {
        q: "Is accommodation provided for out-of-station participants?",
        a: "While we do not directly provide accommodation, we have partnered with nearby hotels and hostels to offer discounts for FutureX attendees. A list of recommendations will be provided upon successful registration."
      },
      {
        q: "Who do I contact if I have an issue during the event?",
        a: "There will be help desks located at key points throughout the venue, staffed by our support team and volunteers. You can also reach out to any official wearing a FutureX ID card for assistance."
      }
    ]
  }
];

// --- Background Component ---
const NeuralBackground = () => {
    const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine);
    }, []);
    const particlesOptions = {
        background: { color: { value: "#050816" } },
        fpsLimit: 60,
        interactivity: { events: { onHover: { enable: true, mode: "bubble" }, resize: true }, modes: { bubble: { distance: 200, duration: 2, opacity: 0.8, size: 5 } } },
        particles: { color: { value: "#8A2BE2" }, links: { color: "#00BFFF", distance: 120, enable: true, opacity: 0.15, width: 1 }, move: { direction: "none", enable: true, outModes: { default: "bounce" }, random: true, speed: 0.4, straight: false }, number: { density: { enable: true, area: 800 }, value: 80 }, opacity: { value: 0.2 }, shape: { type: "circle" }, size: { value: { min: 1, max: 2 } } },
        detectRetina: true,
    };
    return <Particles id="tsparticles" init={particlesInit} options={particlesOptions} className="fixed top-0 left-0 w-full h-full -z-10" />;
};

// --- Accordion Item Component ---
const AccordionItem = ({ question, answer, isOpen, onClick }) => (
    <div className="border-b border-slate-700/50">
        <button
            onClick={onClick}
            className="w-full flex justify-between items-center text-left py-5 px-6 text-slate-200 hover:bg-slate-800/50 transition-colors duration-300"
        >
            <span className="text-lg font-semibold">{question}</span>
            <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
            </span>
        </button>
        <div
            className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
        >
            <div className="overflow-hidden">
                <p className="py-4 px-6 text-slate-400 leading-relaxed">{answer}</p>
            </div>
        </div>
    </div>
);

// --- Contact Modal ---
const ContactModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="relative bg-slate-900/80 border border-purple-500/30 rounded-2xl p-8 max-w-lg w-full">
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white text-2xl">&times;</button>
                <h3 className="text-2xl font-bold font-orbitron text-cyan-300 mb-4">Need Help?</h3>
                <p className="text-slate-400 mb-6">For any urgent queries, please reach out to our support team.</p>
                <a href="mailto:csedatasciencedassa@gmail.com" className="block w-full text-center py-3 bg-cyan-500 text-black font-bold rounded-lg uppercase tracking-wider transition-transform hover:scale-105">Email Support</a>
            </div>
        </div>
    );
};


// --- Main FAQs Page Component ---
const Faqs = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAccordionClick = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const accentClasses = {
        cyan: 'from-cyan-500',
        purple: 'from-purple-500',
        green: 'from-green-500',
        red: 'from-red-500',
    };

    return (
        <div className="min-h-screen text-white font-rajdhani relative overflow-hidden">
            <NeuralBackground />
            <div className="container mx-auto px-4 relative pt-32 pb-12">
                <div className="text-center mb-20">
                    <h1 className="text-5xl md:text-6xl font-bold mb-4 font-orbitron bg-gradient-to-r from-cyan-300 to-fuchsia-500 text-transparent bg-clip-text">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-lg text-slate-400 max-w-3xl mx-auto">
                        Find answers to all your questions about FutureX 2025. If you can't find what you're looking for, feel free to reach out to our support team.
                    </p>
                </div>
                
                <div className="max-w-4xl mx-auto">
                    {faqData.map((category, catIndex) => (
                        <div key={catIndex} className="mb-12">
                            <div className="flex items-center mb-6">
                                <div className={`h-10 w-1 bg-gradient-to-b ${accentClasses[category.accentColor]} to-transparent`}></div>
                                <h2 className="text-3xl font-bold font-orbitron ml-4">{category.category}</h2>
                            </div>
                            <div className="bg-slate-900/50 backdrop-blur-md border border-slate-700/50 rounded-2xl overflow-hidden">
                                {category.questions.map((faq, faqIndex) => (
                                    <AccordionItem
                                        key={faqIndex}
                                        question={faq.q}
                                        answer={faq.a}
                                        isOpen={openIndex === `${catIndex}-${faqIndex}`}
                                        onClick={() => handleAccordionClick(`${catIndex}-${faqIndex}`)}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Floating Action Button */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="fixed bottom-8 right-8 w-16 h-16 bg-cyan-500 rounded-full text-black flex items-center justify-center shadow-lg shadow-cyan-500/50 transform hover:scale-110 transition-transform duration-300 z-40"
                title="Need Help?"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
            <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default Faqs;

