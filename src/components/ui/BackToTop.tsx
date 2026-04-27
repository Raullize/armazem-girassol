"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-40 p-3 rounded-full bg-[#2E8B57] text-white shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2E8B57] ${
        isVisible ? "opacity-100 translate-y-0 pointer-events-auto hover:bg-[#236a42] hover:-translate-y-1" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      aria-label="Voltar ao topo"
    >
      <ArrowUp className="w-6 h-6" />
    </button>
  );
}
