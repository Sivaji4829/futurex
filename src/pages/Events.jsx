import React, { useState, useCallback } from 'react';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

// --- SVG Icons for Tabs ---
const InfoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
const StructureIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
);
const TimelineIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);
// const ContactIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//     </svg>
// );
const AIIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M16 3v4M14 5h4M8 17v4M6 19h4M19 17v4M17 19h4M12 5v2m0 10v2M8 12h8" />
    </svg>
);
const CriteriaIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);


// --- Event Data ---
const eventsData = [
  {
    id: 1,
    title: 'VR Fun Zone',
    tagline: 'Experience Reality, Redefined.',
    image: '/vr.png', 
    // contact: 'Co-Ordinator: Mrs.D.Roja',
    timeline: 'October 9, 2025 | 10:00 AM - 4:00 PM',
    teamSize: 'Individual',
    description: 'VR Fun Zone is an exclusive event designed to showcase the exciting possibilities of Virtual Reality. Participants will experience immersive VR games, interactive simulations, and cutting-edge digital environments that blend entertainment with innovation.',
    structure: [
      'Gear Up: Put on your VR headset and enter a whole new world.',
      'Play & Explore: Experience exciting VR games, adventures, and simulations.',
      'Enjoy & Share: Have fun, capture memories, and share the thrill with friends.',
    ],
    evaluationCriteria: null,
  },
  {
    id: 2,
    title: 'Tech Talks',
    tagline: 'Where Technology Meets Communication.',
    image: '/tt.png',
    // contact: 'techtalks@futurex.com',
    timeline: 'October 9, 2025 | 11:00 AM - 1:00 PM',
    teamSize: 'Individual',
    description: "Tech Talks is an engaging event designed to test participants’ communication, presentation, and technical knowledge. Each participant will be given a topic and must present their views within 5 minutes.",
    structure: [
      "Topic Assignment: Receive your topic on the spot.",
      "Presentation: Deliver a 5-minute talk. A PowerPoint is optional.",
      "Evaluation: Judged on clarity, confidence, and body language."
    ],
    evaluationCriteria: ["Clarity of Explanation", "Confidence & Body Language", "Overall Delivery", "Presentation Skills (if PPT is used)"],
  },
  {
    id: 3,
    title: 'Project Expo',
    tagline: 'Innovate, Exhibit, Inspire.',
    image: '/pe.png',
    // contact: 'expo@futurex.com',
    timeline: 'October 9, 2025 | Full Day',
    teamSize: 'Solo or Team (2-5 members)',
    description: 'Project Expo is a platform for students to showcase innovative projects, prototypes, and ideas across various fields of technology and engineering.',
    structure: [
        'Project Setup & Display: Teams set up their project/demo at the expo venue.',
        'Presentation Round: Teams explain their project within 8–10 minutes, followed by Q&A.',
        'Judging & Q&A: Judges interact, ask questions, and assess projects.',
        'Result Announcement: Winners are declared based on evaluation criteria.',
    ],
    evaluationCriteria: ["Innovation & Creativity", "Practicality & Impact", "Technical Skills", "Presentation & Clarity"],
  },
  {
    id: 4,
    title: 'Cinematic Odyssey',
    tagline: 'Create. Edit. Captivate.',
    image: '/co.png',
    // contact: 'cinema@futurex.com',
    timeline: 'October 9, 2025 | On-the-spot',
    teamSize: 'Individual or Team (up to 4)',
    description: 'A filmmaking and video editing challenge where creativity meets storytelling. Participants must capture their own raw video footage based on a theme provided and craft a 2–5 minute video.',
    structure: [
        'Theme Announcement: Participants receive the topic/concept.',
        'Filming & Editing: Teams/individuals shoot raw footage and edit their video.',
        'Submission & Screening: Final videos submitted within the deadline and showcased.',
        'Judging Round: Panel evaluates based on criteria.',
        'Results: Winners announced for Best Film, Best Editing, Best Storytelling.'
    ],
    evaluationCriteria: ["Creativity & Originality", "Storytelling & Concept Clarity", "Cinematography", "Editing & Transitions", "Audio/Voiceover Integration", "Overall Impact"],
  },
  {
    id: 5,
    title: 'Vision X – AI Art',
    tagline: 'Where Technology Meets Imagination.',
    image: '/vx.png',
    // contact: 'visionx@futurex.com',
    timeline: 'October 9, 2025 | 15-min slots',
    teamSize: 'Individual',
    description: 'Participants will be given a topic on the spot and must generate an AI artwork within 15 minutes using any AI art tool of their choice.',
    structure: [
        'Theme Reveal: Participants receive the topic/theme.',
        'Creation Phase: 15 minutes to generate AI artwork.',
        'Submission Round: Participants submit their best artwork.',
        'Judging: Panel evaluates based on creativity and theme alignment.',
    ],
    evaluationCriteria: ["Creativity & Originality", "Relevance to Theme", "Visual Quality & Detailing", "Presentation of Concept"],
  },
    {
    id: 6,
    title: 'Escape from Error Island',
    tagline: 'Find the bug... Escape the island.',
    image: '/ei.png',
    // contact: 'debugging@futurex.com',
    timeline: 'October 9, 2025 | 3 Rounds',
    teamSize: 'Individual or Team of 3',
    description: 'An exciting coding challenge where participants test their debugging and problem-solving skills across 3 rounds of increasing difficulty.',
    structure: [
      'Round 1 (Easy): Debug beginner-level code.',
      'Round 2 (Medium): Debug intermediate-level code.',
      'Round 3 (Hard): Debug advanced-level code.',
      'Judging: Teams evaluated based on correctness, timing, and approach.'
    ],
    evaluationCriteria: ["Correctness of code and bug fixes", "Time efficiency", "Approach and logic used"],
  },
  {
    id: 7,
    title: 'Decode and Discover',
    tagline: 'The Ultimate QR Code Challenge.',
    image: '/dad.png',
    // contact: 'puzzle@futurex.com',
    timeline: 'October 9, 2025 | Timed Heats',
    teamSize: 'Individual or Team of 2-3',
    description: 'An interactive QR code puzzle game where participants must identify and reconstruct the correct QR code from several cut pieces.',
    structure: [
      'Registration & Briefing: Participants receive rules and QR code pieces.',
      'Reconstruction Phase: Identify and assemble the correct QR code.',
      'Scanning & Verification: Scan the assembled QR code to check correctness.',
      'Judging & Winner Announcement: Winners declared based on correct assembly and speed.',
    ],
    evaluationCriteria: ["Successfully reconstruct and scan the QR code", "Time taken to complete the task"],
  },
];

// --- Visible Neural Background Component ---
const NeuralBackground = () => {
    const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine);
    }, []);

    const particlesOptions = {
        background: { color: { value: "#050816" } },
        fpsLimit: 60,
        interactivity: {
            events: {
                onHover: { enable: true, mode: "bubble" },
                resize: true,
            },
            modes: {
                bubble: { distance: 200, duration: 2, opacity: 0.8, size: 5 },
            },
        },
        particles: {
            color: { value: "#8A2BE2" },
            links: {
                color: "#00BFFF",
                distance: 120,
                enable: true,
                opacity: 0.15,
                width: 1,
            },
            move: {
                direction: "none",
                enable: true,
                outModes: { default: "bounce" },
                random: true,
                speed: 0.4,
                straight: false,
            },
            number: {
                density: { enable: true, area: 800 },
                value: 80,
            },
            opacity: { value: 0.2 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 2 } },
        },
        detectRetina: true,
    };

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            options={particlesOptions}
            className="fixed top-0 left-0 w-full h-full -z-10"
        />
    );
};

// --- Highlight component for the info section ---
const InfoHighlight = ({ value, label, colorClass, glowColor }) => (
    <div className="flex flex-col items-center text-center">
        <div className={`text-5xl font-bold font-orbitron mb-2 ${colorClass}`} style={{ textShadow: `0 0 15px ${glowColor}` }}>
            {value}
        </div>
        <div className="text-sm uppercase tracking-widest text-slate-400">{label}</div>
    </div>
);


// --- Tab Button Component ---
const TabButton = ({ title, isActive, onClick, children }) => (
    <button
        onClick={onClick}
        title={title}
        className={`relative flex items-center justify-center w-16 h-16 rounded-full transition-all duration-300 ${isActive ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'}`}
    >
        {children}
        {isActive && <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-cyan-400 rounded-full shadow-[0_0_10px_theme(colors.cyan.400)]"></div>}
    </button>
);

const AILoader = () => (
    <div className="flex flex-col items-center justify-center space-y-4 p-8">
        <div className="relative w-16 h-16">
            <div className="absolute w-full h-full rounded-full border-2 border-cyan-400/50 animate-ping"></div>
            <div className="absolute w-full h-full rounded-full border-2 border-purple-400/50 animate-ping animation-delay-500"></div>
            <div className="text-cyan-300 text-2xl font-bold flex items-center justify-center w-full h-full">✨</div>
        </div>
        <p className="text-slate-400">Generating AI Insights...</p>
    </div>
);


// --- Event Detail View ---
const EventDetail = ({ event, onClose }) => {
    const [activeTab, setActiveTab] = useState('About');
    const [aiContent, setAiContent] = useState('');
    const [isAiLoading, setIsAiLoading] = useState(false);

    const handleGenerateAiContent = async () => {
        setIsAiLoading(true);
        setAiContent('');
        const mockResponses = {
            'Project Expo': `* **1. Augmented Reality Campus Navigator:** An AR mobile app that overlays a digital map and event info onto the real-world campus view.\n* **2. Sustainable Smart Home System:** A low-cost, IoT-based system to monitor and reduce household energy and water consumption.\n* **3. AI-Powered Personal Health Assistant:** A chatbot that provides personalized fitness tips and meal plans based on user goals.`,
            'Tech Talks': `* 1. "Beyond the hype, what is one practical, real-world application of your topic that you believe will be commonplace in the next 5 years?"\n* 2. "What is the biggest ethical challenge or concern related to the technology you discussed, and how would you propose we address it?"\n* 3. "If you had unlimited resources, what is the one 'moonshot' project you would start related to your topic?"`,
            'Vision X – AI Art': `* 1. "The sound of a color that doesn't exist."\n* 2. "A city where gravity is a choice."\n* 3. "The last dream of a forgotten satellite."`,
        };
        const defaultResponse = `Don't miss the ${event.title}! It's a high-energy, electrifying experience where you can dive headfirst into the future. This is your chance to witness groundbreaking tech, connect with fellow innovators, and get hands-on with technology that will shape tomorrow. Get ready for an unforgettable adventure!`;
        await new Promise(resolve => setTimeout(resolve, 2000));
        setAiContent(mockResponses[event.title] || defaultResponse);
        setIsAiLoading(false);
    };
    
    const renderContent = () => {
        switch (activeTab) {
            case 'Structure':
                return (
                    <div>
                        <h3 className="text-xl font-bold text-cyan-300 mb-4">Event Structure</h3>
                        <ul className="space-y-3 list-disc list-inside text-slate-300">
                            {event.structure.map((item, index) => <li key={index}>{item}</li>)}
                        </ul>
                    </div>
                );
            case 'Timeline':
                return (
                     <div>
                        <h3 className="text-xl font-bold text-cyan-300 mb-4">Timeline</h3>
                        <p className="text-slate-300">{event.timeline}</p>
                    </div>
                );
            // case 'Contact':
            //     return (
            //         <div>
            //             <h3 className="text-xl font-bold text-cyan-300 mb-4">Contact Information</h3>
            //             <p className="text-slate-300">For inquiries, please contact:<br/> {Array.isArray(event.contact) ? event.contact.join(', ') : event.contact}</p>
            //         </div>
            //     );
            case 'Evaluation':
                if (!event.evaluationCriteria) return <p className="text-slate-400">This event is judged based on overall fun and participation!</p>;
                return (
                    <div>
                        <h3 className="text-xl font-bold text-cyan-300 mb-4">Evaluation Criteria</h3>
                        <ul className="space-y-3 list-disc list-inside text-slate-300">
                            {event.evaluationCriteria.map((item, index) => <li key={index}>{item}</li>)}
                        </ul>
                    </div>
                );
            case 'AI Assistant':
                return (
                    <div className="text-center">
                        <h3 className="text-xl font-bold text-cyan-300 mb-4">AI Assistant</h3>
                        <p className="text-slate-400 mb-6">Let our AI assistant help you prepare for this event!</p>
                        <button 
                            onClick={handleGenerateAiContent} 
                            disabled={isAiLoading}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white font-bold rounded-full uppercase tracking-wider transition-all duration-300 hover:bg-purple-500 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            ✨ {isAiLoading ? 'Generating...' : 'Get AI Insights'}
                        </button>
                        {isAiLoading && <AILoader />}
                        {aiContent && <pre className="mt-6 text-left whitespace-pre-wrap font-sans bg-slate-900/50 p-4 rounded-lg border border-slate-700">{aiContent}</pre>}
                    </div>
                );
            case 'About':
            default:
                 return (
                    <div>
                        <h3 className="text-xl font-bold text-cyan-300 mb-4">About the Event</h3>
                        <p className="mb-4"><strong className="text-white">Team Size:</strong> {event.teamSize}</p>
                        <p className="text-slate-300 leading-relaxed">{event.description}</p>
                    </div>
                );
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center p-4">
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 -z-10"
                style={{backgroundImage: `url(${event.image})`}}
            ></div>
            <div className="w-full max-w-6xl h-[90vh] bg-slate-900/70 backdrop-blur-md border border-cyan-500/20 rounded-2xl shadow-2xl shadow-cyan-500/10 flex flex-col relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full p-6 sm:p-8 bg-gradient-to-b from-black/50 to-transparent z-20">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-4xl sm:text-5xl font-bold font-orbitron text-cyan-300">{event.title}</h2>
                            <p className="text-slate-400">{event.tagline}</p>
                        </div>
                        <button onClick={onClose} className="text-slate-400 text-4xl hover:text-white">&times;</button>
                    </div>
                </div>
                
                <div className="flex-grow flex pt-28 sm:pt-32">
                    <nav className="w-24 sm:w-28 flex flex-col items-center justify-center space-y-6 border-r border-slate-700/50">
                        <TabButton title="About" isActive={activeTab === 'About'} onClick={() => setActiveTab('About')}><InfoIcon /></TabButton>
                        <TabButton title="Structure" isActive={activeTab === 'Structure'} onClick={() => setActiveTab('Structure')}><StructureIcon /></TabButton>
                        <TabButton title="Timeline" isActive={activeTab === 'Timeline'} onClick={() => setActiveTab('Timeline')}><TimelineIcon /></TabButton>
                        {event.evaluationCriteria && <TabButton title="Evaluation" isActive={activeTab === 'Evaluation'} onClick={() => setActiveTab('Evaluation')}><CriteriaIcon /></TabButton>}
                        {/* <TabButton title="Contact" isActive={activeTab === 'Contact'} onClick={() => setActiveTab('Contact')}><ContactIcon /></TabButton> */}
                        <TabButton title="AI Assistant" isActive={activeTab === 'AI Assistant'} onClick={() => { setActiveTab('AI Assistant'); if (!aiContent) handleGenerateAiContent(); }}><AIIcon /></TabButton>
                    </nav>
                    <main className="flex-grow p-6 sm:p-8 overflow-y-auto">
                       {renderContent()}
                    </main>
                </div>
                <div className="p-6 sm:p-8 border-t border-slate-700/50">
                     <a 
                        href="https://forms.gle/mU88yw64QHCMLn4GA"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full block text-center py-3 bg-cyan-500 text-black font-bold rounded-lg uppercase tracking-wider transition-all duration-300 hover:bg-cyan-400 hover:scale-105">
                        Register Now
                    </a>
                </div>
            </div>
        </div>
    );
};


// --- Main Events Page (Redesigned) ---
const Events = () => {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const eventHighlights = [
        { value: '6+', label: 'Events', colorClass: 'text-cyan-400', glowColor: 'rgba(0,255,255,0.5)' },
        { value: '2', label: 'Days', colorClass: 'text-purple-400', glowColor: 'rgba(128,0,128,0.5)' },
        { value: '5000+', label: 'Capacity', colorClass: 'text-green-400', glowColor: 'rgba(0,255,0,0.5)' },
        { value: '50+', label: 'Co-ordinators', colorClass: 'text-red-400', glowColor: 'rgba(255,0,0,0.5)' },
    ];

    return (
        <div className="min-h-screen text-white font-rajdhani relative overflow-hidden">
            <style>
                {`
                    .futuristic-card {
                        background: rgba(10, 15, 30, 0.6);
                        backdrop-filter: blur(10px);
                        border: 1px solid rgba(0, 255, 255, 0.2);
                        border-radius: 1rem;
                        padding: 0.8rem;
                        transition: all 0.3s ease;
                    }
                    .futuristic-card:hover {
                        transform: translateY(-5px);
                        box-shadow: 0 10px 30px rgba(0, 255, 255, 0.15);
                        border-color: rgba(0, 255, 255, 0.4);
                    }
                    .card-image-container {
                        border-radius: 0.75rem;
                        overflow: hidden;
                        height: 18rem; /* 192px */
                        margin-bottom: 1.9rem;
                    }
                `}
            </style>
            <NeuralBackground />
            <div className="container mx-auto px-4 relative pt-32 pb-12">
                <div className="text-center mb-20">
                    <h1 className="text-5xl md:text-6xl font-bold mb-4 font-orbitron bg-gradient-to-r from-cyan-300 to-fuchsia-500 text-transparent bg-clip-text">
                        Event Matrix
                    </h1>
                    <p className="text-lg text-slate-400 max-w-3xl mx-auto">
                        Explore our lineup of events at the nexus of technology and imagination. Each is a unique opportunity to challenge your skills, expand your horizons, and connect with the future.
                    </p>
                </div>

                {/* Event Highlights Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
                    {eventHighlights.map(highlight => (
                        <InfoHighlight 
                            key={highlight.label}
                            value={highlight.value}
                            label={highlight.label}
                            colorClass={highlight.colorClass}
                            glowColor={highlight.glowColor}
                        />
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {eventsData.map((event) => (
                        <div key={event.id} className="futuristic-card flex flex-col">
                           <div className="card-image-container">
                                <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex flex-col flex-grow">
                                <h3 className="text-2xl font-bold text-cyan-300 mb-2 font-orbitron">{event.title}</h3>
                                <p className="text-slate-400 text-sm mb-4 flex-grow">{event.tagline}</p>
                                <div className="mt-auto">
                                    <button 
                                        onClick={() => setSelectedEvent(event)}
                                        className="w-full py-3 bg-cyan-500/10 border-2 border-cyan-500 text-cyan-300 rounded-full font-semibold text-sm transition-all duration-300 hover:bg-cyan-500 hover:text-black hover:shadow-[0_0_20px_rgba(0,191,255,0.5)]"
                                    >
                                        Access Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            {selectedEvent && <EventDetail event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
        </div>
    );
};

export default Events;

