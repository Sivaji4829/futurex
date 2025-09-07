import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

const Entry = () => {
  const navigate = useNavigate();
  const vantaRef = useRef(null);
  const titleRef = useRef(null);
  const vantaEffect = useRef(null);
  const [showButton, setShowButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Booting cybernetic core...");

  const loadingMessages = [
    "Initializing neural networks...",
    "Compiling quantum bits...",
    "Generating digital world...",
    "Welcome to the Future...",
  ];

  useEffect(() => {
    // ✅ Vanta.js background
    if (window.VANTA && window.THREE) {
      vantaEffect.current = window.VANTA.NET({
        el: vantaRef.current,
        THREE: window.THREE,
        mouseControls: true,
        touchControls: true,
        gyrocontrols: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x4f0fff,
        backgroundColor: 0x0,
        points: 10.0,
        maxDistance: 22.0,
        spacing: 17.0,
      });
    }

    // ✅ GSAP text animation (without neon)
    const title = titleRef.current;
    const originalText = title.innerText;
    title.innerHTML = "";

    originalText.split("").forEach((char) => {
      const span = document.createElement("span");
      span.className = "inline-block";
      span.innerHTML = char === " " ? "&nbsp;" : char;
      title.appendChild(span);
    });

    const chars = Array.from(title.children);

    gsap.set(title, { perspective: 800 });
    gsap.set(chars, {
      opacity: 0,
      z: -300,
      rotationX: -90,
      transformOrigin: "50% 50% -150px",
    });

    const tl = gsap.timeline({
      onComplete: () => {
        setShowButton(true); // ✅ show button after animation
      },
    });

    tl.to(chars, {
      duration: 1.2,
      opacity: 1,
      z: 0,
      rotationX: 0,
      stagger: 0.1,
      ease: "power3.easeOut",
    });

    return () => {
      if (vantaEffect.current) vantaEffect.current.destroy();
    };
  }, []);

  // ✅ Loading sequence
  useEffect(() => {
    if (isLoading) {
      let i = 0;
      const interval = setInterval(() => {
        setLoadingText(loadingMessages[i]);
        i++;
        if (i >= loadingMessages.length) {
          clearInterval(interval);
          setTimeout(() => navigate("/home"), 500);
        }
      }, 800);
      return () => clearInterval(interval);
    }
  }, [isLoading, navigate]);

  const handleEnter = () => {
    setIsLoading(true);
  };

  return (
    <div
      ref={vantaRef}
      className="h-screen w-screen flex flex-col items-center justify-center overflow-hidden bg-black p-4"
    >
      {/* Title */}
      <div
        className={`text-center transition-opacity duration-500 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        <h1
          ref={titleRef}
          className="text-5xl md:text-8xl font-bold text-white tracking-widest uppercase select-none"
        >
          FutureX 2025
        </h1>
      </div>

      {/* Button */}
      <div
        className={`transition-opacity duration-500 mt-12 ${
          !showButton || isLoading
            ? "opacity-0 pointer-events-none"
            : "opacity-100"
        }`}
      >
        <button
          onClick={handleEnter}
          disabled={!showButton || isLoading}
          className="px-8 py-3 bg-cyan-500 text-black font-bold rounded-lg uppercase tracking-widest transition-all duration-300 hover:bg-cyan-600 hover:text-white shadow-lg disabled:opacity-50"
        >
          Press Here to Enter
        </button>
      </div>

      {/* Loading spinner + text */}
      {isLoading && (
        <div className="absolute flex flex-col items-center justify-center text-center">
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
