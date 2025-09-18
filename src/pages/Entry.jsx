import React, { useEffect, useState, useRef } from "react";
import * as THREE from "three";

// --- Quantum Dots Background ---
const QuantumDotsBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    let scene, camera, renderer, points;
    let mouseX = 0,
      mouseY = 0;

    const init = () => {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        75,
        currentMount.clientWidth / currentMount.clientHeight,
        0.1,
        1000
      );
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

      geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(vertices, 3)
      );

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
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
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
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex space-x-6 md:space-x-12 text-white">
      {Object.keys(timeLeft).length > 0 ? (
        Object.entries(timeLeft).map(([interval, value]) => (
          <div key={interval} className="flex flex-col items-center">
            <span className="text-4xl md:text-5xl font-light">
              {String(value).padStart(2, "0")}
            </span>
            <span className="text-xs uppercase tracking-widest text-slate-400">
              {interval}
            </span>
          </div>
        ))
      ) : (
        <span className="text-xl">Event has started!</span>
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
        <div className="flex items-center justify-center mb-16">
          <h1
            className="text-6xl md:text-8xl font-bold text-slate-200"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            FUTURE
          </h1>
          <span
            className="text-8xl md:text-9xl font-bold text-red-500 mx-4"
            style={{
              fontFamily: "'Aldrich', sans-serif",
              transform: "skewX(-15deg)",
              textShadow: "0 0 10px #ff4545, 0 0 20px #ff4545",
            }}
          >
            X
          </span>
          <h1
            className="text-6xl md:text-8xl font-bold text-slate-200"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            2025
          </h1>
        </div>

        <div className="mb-16">
          <CountdownTimer targetDate="2025-10-17T00:00:00" />
        </div>

        <button
          onClick={handleEnter}
          className="px-10 py-3 border-2 border-red-500 text-red-400 font-bold rounded-md uppercase tracking-widest text-sm hover:bg-red-500/20 hover:text-white animate-pulse"
        >
          Press Here to Enter
        </button>
      </div>

      {isLoading && (
        <div className="absolute z-20 flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-500 mb-6"></div>
          <p className="text-cyan-300 text-xl">{loadingText}</p>
        </div>
      )}
    </div>
  );
};

export default Entry;
