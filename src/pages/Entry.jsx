import React, { useEffect, useState, useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

// --- tsparticles Background Component ---
// --- tsparticles Background Component ---
const ParticleBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  // NEW: "Quantum Fabric" options object
  const particlesOptions = {
    background: {
      color: { value: "#050816" }, // Keep the dark background
    },
    fpsLimit: 120, // Increased for smoother animation
    interactivity: {
      events: {
        onHover: { enable: true, mode: "grab" }, // Grab mode feels like pulling the fabric
        onClick: { enable: true, mode: "push" },
        resize: true,
      },
      modes: {
        grab: {
          distance: 140,
          links: {
            opacity: 1, // Make links fully visible when grabbed
          },
        },
        push: {
          quantity: 2,
        },
      },
    },
    particles: {
      number: {
        value: 250, // High particle count for a dense network
        density: { enable: true, area: 800 },
      },
      color: {
        // A palette of deep violet, blue, and white for a futuristic glow
        value: ["#8A2BE2", "#4B0082", "#00BFFF", "#FFFFFF"],
      },
      shape: {
        type: "circle", // Simple circles work best for nodes
      },
      opacity: {
        value: { min: 0.1, max: 0.6 }, // Subtle, shimmering opacity
        animation: { enable: true, speed: 1, sync: false },
      },
      size: {
        value: { min: 0.5, max: 1.5 }, // Very small particles for a delicate look
      },
      links: {
        enable: true,
        distance: 120, // The maximum distance for links to form
        color: "#ffffff", // Use white for a clean, high-tech look
        opacity: 0.3, // Low opacity for ethereal, "shimmering" lines
        width: 1, // Ultra-fine lines
      },
      move: {
        enable: true,
        speed: 0.7, // A slow, steady drift
        direction: "top", // Coordinated upward movement for a wave-like feel
        random: true,
        straight: false,
        outModes: {
          default: "out",
        },
      },
    },
    detectRetina: true,
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={particlesOptions}
      className="absolute inset-0 w-full h-full -z-10"
    />
  );
};
// --- Countdown Timer Component ---
const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  const timerComponents = [];
  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval] && timeLeft[interval] !== 0) return;
    timerComponents.push(
      <div key={interval} className="flex flex-col items-center">
        <span className="text-4xl md:text-5xl font-bold font-orbitron">
          {timeLeft[interval]}
        </span>
        <span className="text-sm uppercase tracking-widest text-slate-400">
          {interval}
        </span>
      </div>
    );
  });

  return (
    <div className="flex space-x-6 md:space-x-12 text-white">
      {timerComponents.length ? timerComponents : <span>Event has started!</span>}
    </div>
  );
};

// --- Main Entry Component ---
const Entry = () => {
  const [showContent, setShowContent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Booting cybernetic core...");

  const loadingMessages = [
    "Initializing neural networks...",
    "Compiling quantum bits...",
    "Generating digital world...",
    "Welcome to the Future...",
  ];

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoading) {
      let i = 0;
      const interval = setInterval(() => {
        setLoadingText(loadingMessages[i]);
        i++;
        if (i >= loadingMessages.length) {
          clearInterval(interval);
          setTimeout(() => window.location.assign("/home"), 500);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  const handleEnter = () => {
    setIsLoading(true);
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center overflow-hidden relative p-4 bg-grid">
      {/* --- NEW: Animated Background Layers --- */}
      <div className="stars"></div>
      <div className="twinkling"></div>
      <div className="scanlines"></div>

      {/* Particle Background */}
      <ParticleBackground />

      {/* Main Content */}
      <div
        className={`relative z-10 flex flex-col items-center justify-center transition-all duration-700 ${
          showContent && !isLoading
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-5 pointer-events-none"
        }`}
      >
        <div className="flex items-center mb-12">
          <h1
            className="text-5xl md:text-8xl font-bold tracking-widest uppercase text-slate-300 text-flicker-in-glow" // <-- Class added
            style={{ fontFamily: "'Exo 2', sans-serif" }}
          >
            FUTURE
          </h1>
          <div className="relative mx-2">
            <svg
              className="w-24 h-24 md:w-40 md:h-40 text-cyan-400"
              viewBox="0 0 100 100"
            >
              <path
                d="M10 10 L90 90 M90 10 L10 90"
                stroke="currentColor"
                strokeWidth="5"
                fill="none"
              />
              <path
                d="M10 10 L90 90 M90 10 L10 90"
                stroke="currentColor"
                strokeWidth="10"
                fill="none"
                strokeOpacity="0.3"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 md:w-12 md:h-12 bg-cyan-400 rounded-full animate-ping"></div>
            </div>
          </div>
          <h1
            className="text-5xl md:text-8xl font-bold tracking-widest uppercase text-slate-300 text-flicker-in-glow" // <-- Class added
            style={{ fontFamily: "'Exo 2', sans-serif" }}
          >
            2025
          </h1>
        </div>

        <div className="mb-12">
          <CountdownTimer targetDate="2025-10-08T00:00:00" />
        </div>

        <button
          onClick={handleEnter}
          className="px-8 py-3 border-2 border-cyan-400 text-cyan-400 font-bold rounded-full uppercase tracking-widest transition-all duration-300 hover:bg-cyan-400 hover:text-black neon-shadow"
        >
          Press Here to Enter
        </button>
      </div>

      {/* Loading Animation */}
      {isLoading && (
        <div className="absolute z-20 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-purple-500 mb-6"></div>
          <p className="text-cyan-300 text-xl tracking-widest transition-opacity duration-300">
            {loadingText}
          </p>
        </div>
      )}
    </div>
  );
};

export default Entry;