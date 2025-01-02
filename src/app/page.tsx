"use client";

import { useEffect } from "react";
import gsap from "gsap";

export default function Home() {
  useEffect(() => {
    const blob = document.querySelector(".blob");

    // Blob animation for idle state
    const idleAnimation = gsap.to(blob, {
      duration: 6,
      x: "random(-50, 50)",
      y: "random(-50, 50)",
      scale: "random(0.8, 1.2)",
      rotation: "random(-45, 45)",
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    // Blob follows cursor
    const handleMouseMove = (e: MouseEvent) => {
      idleAnimation.pause(); // Pause idle animation
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const x = (clientX / innerWidth) * 100 - 50;
      const y = (clientY / innerHeight) * 100 - 50;

      gsap.to(blob, {
        duration: 1,
        x: `${x}%`,
        y: `${y}%`,
        ease: "power3.out",
      });
    };

    // Blob returns to center when cursor leaves
    const handleMouseLeave = () => {
      gsap.to(blob, {
        duration: 1,
        x: "-50%",
        y: "-50%",
        ease: "power3.out",
      });
      idleAnimation.resume(); // Resume idle animation
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <main className="relative w-full min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center overflow-hidden transition-colors duration-300">
      {/* Floating Blob */}
      <div
        className="blob absolute w-80 h-80 md:w-96 md:h-96 bg-purple-400 opacity-50 rounded-full blur-3xl dark:bg-purple-700"
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
      ></div>

      {/* Content */}
      <div className="z-10 text-center px-6">
        <h1 className="text-2xl md:text-7xl font-bold text-gray-800 dark:text-gray-200">
          Welcome to Peeps
        </h1>
        <p className="text-base md:text-2xl text-gray-600 dark:text-gray-400 mt-4">
          There is currently no content available on this website.
        </p>
        <p className="text-base md:text-xl text-gray-600 dark:text-gray-400 mt-2">
          Stay tuned for updates on{" "}
          <strong className="text-[#524ABE] dark:text-[#8C7CFF]">
            Monday, January 6th
          </strong>
          !
        </p>
      </div>
    </main>
  );
}
