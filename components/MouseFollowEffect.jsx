"use client";

import { useState, useEffect } from "react";

export default function MouseFollowEffect() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  return (
    <>
      {/* Main spotlight effect */}
      <div
        className={`fixed inset-0 pointer-events-none z-30 transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
        }}
      />

      {/* Secondary subtle glow */}
      <div
        className={`fixed inset-0 pointer-events-none z-20 transition-opacity duration-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: `radial-gradient(300px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.1), transparent 70%)`,
        }}
      />

      {/* Cursor dot */}
      <div
        className={`fixed w-4 h-4 pointer-events-none z-50 transition-opacity duration-300 ${
          isVisible ? "opacity-0" : "opacity-0"
        }`}
      />
    </>
  );
}
