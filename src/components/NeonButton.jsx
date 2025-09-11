import React from "react";

const NeonButton = ({ children, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`relative px-6 py-3 font-semibold text-cyan-300 border-2 border-cyan-400 rounded-lg transition duration-300 
                  hover:text-cyan-100 hover:shadow-[0_0_15px_3px_rgba(34,211,238,0.7)] 
                  active:scale-95 bg-transparent ${className}`}
    >
      {children}
      <span className="absolute inset-0 rounded-lg blur-lg opacity-50 bg-cyan-400 -z-10"></span>
    </button>
  );
};

export default NeonButton;
