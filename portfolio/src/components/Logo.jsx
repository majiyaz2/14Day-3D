import React from "react";

export const Logo = ({ className }) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="50%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
        <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* Outer Hexagon Outline */}
      <path
        d="M50 10L85 30V70L50 90L15 70V30L50 10Z"
        stroke="url(#logoGradient)"
        strokeWidth="2"
        strokeLinejoin="round"
        opacity="0.3"
      />
      
      {/* Main "A" Symbol Shape */}
      <path
        d="M50 25L75 75H62L50 50L38 75H25L50 25Z"
        fill="url(#logoGradient)"
        filter="url(#logoGlow)"
      />
      
      {/* Accent Point */}
      <circle cx="50" cy="18" r="3" fill="#fff" opacity="0.8" />
    </svg>
  );
};
