import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";

// --- SVG Icons ---
const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);
const TimeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
);
// --- Icons for Info Section ---
const VenueIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-3 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);
const DurationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-3 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
const CapacityIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);
const RegistrationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-3 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);



// --- New 3D Quantum Dots Background Component ---
const QuantumDotsBackground = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const currentMount = mountRef.current;
        let scene, camera, renderer, points;
        let mouseX = 0, mouseY = 0;

        const init = () => {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
            camera.position.z = 50;

            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
            currentMount.appendChild(renderer.domElement);

            const geometry = new THREE.BufferGeometry();
            const vertices = [];
            const numPoints = 1500;

            for (let i = 0; i < numPoints; i++) {
                const x = (Math.random() - 0.5) * 100;
                const y = (Math.random() - 0.5) * 100;
                const z = (Math.random() - 0.5) * 100;
                vertices.push(x, y, z);
            }

            geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

            const material = new THREE.PointsMaterial({
                color: 0x854CE6,
                size: 0.2,
                transparent: true,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
            });

            points = new THREE.Points(geometry, material);
            scene.add(points);

            animate();
        };

        const animate = () => {
            requestAnimationFrame(animate);
            
            // Mouse follow effect
            camera.position.x += (mouseX * 0.05 - camera.position.x) * 0.05;
            camera.position.y += (-mouseY * 0.05 - camera.position.y) * 0.05;
            camera.lookAt(scene.position);

            points.rotation.y += 0.0005;

            renderer.render(scene, camera);
        };
        
        const onMouseMove = (event) => {
            mouseX = event.clientX - window.innerWidth / 2;
            mouseY = event.clientY - window.innerHeight / 2;
        };

        const onResize = () => {
            camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        }

        init();
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('resize', onResize);
            currentMount.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={mountRef} className="absolute inset-0 w-full h-full -z-10" />;
};



// Carousel slides data
const carouselData = [
  {
    title: "FUTUREX 2025",
    subtitle: "The flagship techfest where innovation meets the future, today.",
    buttonText: "Explore Events",
    navPath: "/events",
  },
  {
    title: "AI REVOLUTION",
    subtitle: "Witness the dawn of a new era in artificial intelligence and machine learning.",
    buttonText: "See AI Track",
    navPath: "/events",
  },
  {
    title: "VR ARENA",
    subtitle: "Step into new worlds and experience reality like never before.",
    buttonText: "Enter the Arena",
    navPath: "/events",
  },
];

// Featured events data
const featuredEvents = [
  { time: "10:00 AM", title: "AI Art Contest", description: "Where creativity meets artificial intelligence." },
  { time: "11:30 AM", title: "Robotics Challenge", description: "Build, battle, and conquer with code." },
  { time: "01:00 PM", title: "Beat-the-AI Quiz", description: "Test your wits against the machine." },
];

const faqs = [
    { q: "What is FutureX?", a: "A premier techfest showcasing future innovations." },
    { q: "How do I register?", a: "Click the 'Register Now' button on our website." },
    { q: "Is there a code of conduct?", a: "Yes, all attendees must adhere to our community guidelines." },
    { q: "Who can attend?", a: "Students, professionals, and tech enthusiasts are welcome." },
]

// Info Bar Data
const infoItems = [
    {
        icon: <VenueIcon />,
        title: "Venue",
        text: "Chalapathi Institute of Technology, Mothadaka, Guntur, Andhra Pradesh"
    },
    {
        icon: <DurationIcon />,
        title: "Duration",
        text: "October 8-10, 2025"
    },
    {
        icon: <CapacityIcon />,
        title: "Attendees",
        text: "5000+ Expected"
    },
    {
        icon: <RegistrationIcon />,
        title: "Registration",
        text: "Open Now!"
    }
];

const Home = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeFaq, setActiveFaq] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((prev) => (prev + 1) % carouselData.length), 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#050816] text-white font-rajdhani min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Layers */}
        <div className="absolute inset-0 z-0">
            <QuantumDotsBackground />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <img 
                    src="/robo1.png" 
                    alt="Futuristic Robot Background" 
                    className="w-full max-w-4xl h-auto object-contain opacity-80"
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent"></div>
        </div>
        
        {/* Foreground Content Layer */}
        <div className="relative w-full h-full container mx-auto px-4 z-10 flex flex-col items-center justify-center text-center">
            {carouselData.map((slide, index) => (
                <div
                key={index}
                className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-1000 ${currentSlide === index ? "opacity-100" : "opacity-0"}`}
                >
                    <div>
                        <h1 className="text-6xl md:text-8xl font-bold uppercase font-orbitron mb-4 drop-shadow-lg bg-gradient-to-r from-cyan-300 via-purple-400 to-fuchsia-500 text-transparent bg-clip-text">
                        {slide.title}
                        </h1>
                        <p className="text-lg text-slate-300 max-w-lg mx-auto mb-8">{slide.subtitle}</p>
                        <button
                            onClick={() => navigate(slide.navPath)}
                            className="px-8 py-3 border-2 border-cyan-400 text-cyan-400 font-bold rounded-full uppercase tracking-widest transition-all duration-300 hover:bg-cyan-400 hover:text-black neon-shadow"
                            >
                            {slide.buttonText}
                        </button>
                    </div>
                </div>
            ))}
        </div>

        {/* Dots Navigator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center space-x-3 z-20">
            {carouselData.map((_, index) => (
            <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${ currentSlide === index ? "bg-cyan-400 w-6 shadow-[0_0_10px_rgba(0,255,255,0.7)]" : "bg-slate-600"}`}
            ></button>
            ))}
        </div>
      </section>

      {/* About Section */}
       <section className="py-24 px-4 container mx-auto">
        <div className="relative flex flex-col lg:flex-row items-center gap-12">
            {/* 3D Container */}
            <div className="w-full lg:w-1/2 h-96 lg:h-[500px] perspective-1000">
                <div className="relative w-full h-full transform-style-3d transition-transform duration-500 hover:rotate-y-10">
                     <div className="absolute w-full h-full rounded-2xl bg-slate-900/50 border-2 border-purple-500/30 p-2 transform-gpu">
                        <img src="/ps.png" alt="Tech event atmosphere" className="w-full h-full object-contain relative z-10" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/50 to-transparent"></div>
                     </div>
                </div>
            </div>
            <div className="w-full lg:w-1/2">
                <h2 className="text-4xl font-bold mb-4 font-orbitron bg-gradient-to-r from-cyan-300 to-fuchsia-500 text-transparent bg-clip-text">Redefining Reality</h2>
                <p className="text-slate-400 mb-6 text-lg leading-relaxed">
                    FutureX 2025 is more than a techfest; it's a nexus for innovators, creators, and pioneers. We bring together the brightest minds to showcase cutting-edge technology, foster collaboration, and ignite the next wave of technological evolution. Prepare for an immersive experience that will redefine your perspective on the future.
                </p>
                <button
                  onClick={() => navigate("/events")}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white font-bold rounded-full uppercase tracking-wider transition-all duration-300 hover:bg-purple-500 hover:scale-105"
                >
                  <span>Discover More</span>
                  <ArrowRightIcon />
                </button>
            </div>
        </div>
      </section>
{/* New Info Bar Section */}
       <section className="py-12 px-4 container mx-auto">
            <div className="bg-slate-900/50 backdrop-blur-md border border-cyan-500/20 rounded-2xl shadow-lg p-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {infoItems.map((item, index) => (
                        <div key={index} className="flex flex-col items-center">
                            {item.icon}
                            <h3 className="font-bold text-lg text-white mb-1">{item.title}</h3>
                            <p className="text-slate-400 text-sm">{item.text}</p>
                        </div>
                    ))}
                </div>
            </div>
       </section>
      {/* Featured Events Section */}
      <section className="container mx-auto px-4 py-24">
        <h2 className="text-4xl text-center font-bold mb-16 font-orbitron bg-gradient-to-r from-cyan-300 to-fuchsia-500 text-transparent bg-clip-text">Event Timeline</h2>
        <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 h-full w-0.5 bg-slate-700/50 -translate-x-1/2"></div>
            {featuredEvents.map((event, index) => (
                <div key={index} className={`flex items-center w-full mb-8 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                    <div className="w-1/2 px-4">
                        <div className={`text-right ${index % 2 !== 0 && 'md:hidden'}`}>
                            <p className="text-purple-400 font-semibold">{event.time}</p>
                        </div>
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 bg-slate-800 border-2 border-cyan-400 rounded-full z-10 flex items-center justify-center">
                        <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                    </div>
                    <div className="w-1/2 px-4">
                        <div className={`bg-slate-900/50 p-6 rounded-2xl border border-purple-400/20 backdrop-blur-sm ${index % 2 === 0 ? 'text-left' : 'text-right'}`}>
                            <p className={`text-purple-400 font-semibold mb-2 ${index % 2 === 0 ? 'md:hidden' : ''}`}>{event.time}</p>
                            <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                            <p className="text-slate-400 text-sm">{event.description}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-24">
        <h2 className="text-4xl text-center font-bold mb-16 font-orbitron bg-gradient-to-r from-cyan-300 to-fuchsia-500 text-transparent bg-clip-text">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
                 {faqs.map((faq, index) => (
                    <button key={index} onClick={() => setActiveFaq(index)} className={`w-full text-left p-5 rounded-lg border transition-all duration-300 mb-4 ${activeFaq === index ? 'bg-purple-500/20 border-purple-500' : 'bg-slate-800/30 border-slate-700 hover:bg-slate-800/50'}`}>
                        <h3 className="font-semibold text-lg text-white flex justify-between items-center">
                            {faq.q}
                            <span className={`transition-transform duration-300 ${activeFaq === index && 'rotate-45'}`}><PlusIcon/></span>
                        </h3>
                    </button>
                 ))}
            </div>
            <div className="bg-slate-900/50 p-8 rounded-2xl border border-purple-400/20 min-h-[200px]">
                <p className="text-slate-300 text-lg">
                    {faqs[activeFaq].a}
                </p>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
