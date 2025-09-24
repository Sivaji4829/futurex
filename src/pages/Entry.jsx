import React, { useEffect, useState, useRef } from "react";
import * as THREE from "three";

// --- Quantum Dots Background ---
const QuantumDotsBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    let scene, camera, renderer, points;
    let mouseX = 0, mouseY = 0;

    const init = () => {
      scene = new THREE.Scene();
      const width = currentMount.clientWidth || window.innerWidth;
      const height = currentMount.clientHeight || window.innerHeight;

      camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      camera.position.z = 50;

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(window.devicePixelRatio);
      currentMount.appendChild(renderer.domElement);

      const geometry = new THREE.BufferGeometry();
      const vertices = [];
      const numPoints = 1200; // slightly reduced for performance on mobile
      for (let i = 0; i < numPoints; i++) {
        const x = (Math.random() - 0.5) * 100;
        const y = (Math.random() - 0.5) * 100;
        const z = (Math.random() - 0.5) * 100;
        vertices.push(x, y, z);
      }
      geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));

      const material = new THREE.PointsMaterial({
        color: 0x854ce6,
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
      const width = currentMount.clientWidth || window.innerWidth;
      const height = currentMount.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    init();
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      if (renderer) currentMount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full -z-10" />;
};

// --- Countdown Timer ---
const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return {};
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-4 text-white">
      {Object.keys(timeLeft).length > 0 ? (
        Object.entries(timeLeft).map(([interval, value]) => (
          <div key={interval} className="flex flex-col items-center w-16 sm:w-20">
            <span className="text-3xl sm:text-4xl font-light">
              {String(value).padStart(2, "0")}
            </span>
            <span className="text-[10px] uppercase tracking-widest text-slate-400">
              {interval}
            </span>
          </div>
        ))
      ) : (
        <span className="text-lg sm:text-xl">Event has started!</span>
      )}
    </div>
  );
};

// --- Main Entry ---
const Entry = () => {
  const [showContent, setShowContent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Booting cybernetic core...");
  const loadingMessages = [
    "Initializing neural networks...",
    "Compiling quantum bits...",
    "Generating digital world...",
    "Welcome to the Future X 2025...",
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
          setTimeout(() => (window.location.href = "/home"), 500);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  const handleEnter = () => setIsLoading(true);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center overflow-hidden relative p-4">
      <QuantumDotsBackground />

      <div
        className={`relative z-10 flex flex-col items-center transition-all duration-700 ${
          showContent && !isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-wrap justify-center items-center mb-10 sm:mb-16">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold text-slate-200 font-[Orbitron]">
            FUTURE
          </h1>
          <span
            className="text-5xl sm:text-7xl md:text-9xl font-bold text-red-500 mx-2 sm:mx-4"
            style={{
              fontFamily: "'Aldrich', sans-serif",
              transform: "skewX(-15deg)",
              textShadow: "0 0 8px #ff4545, 0 0 16px #ff4545",
            }}
          >
            X
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold text-slate-200 font-[Orbitron]">
            2025
          </h1>
        </div>

        <div className="mb-10 sm:mb-16">
          <CountdownTimer targetDate="2025-10-14T00:00:00" />
        </div>

        <button
          onClick={handleEnter}
          className="px-6 sm:px-10 py-2 sm:py-3 border-2 border-red-500 text-red-400 font-bold rounded-md uppercase tracking-widest text-xs sm:text-sm hover:bg-red-500/20 hover:text-white animate-pulse"
        >
          Press Here to Enter
        </button>
      </div>

      {isLoading && (
        <div className="absolute z-20 flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-t-4 border-b-4 border-red-500 mb-4 sm:mb-6"></div>
          <p className="text-cyan-300 text-base sm:text-xl text-center px-4">{loadingText}</p>
        </div>
      )}
    </div>
  );
};

export default Entry;
