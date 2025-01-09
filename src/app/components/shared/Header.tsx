"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ModeToggle } from "./switch-theme";

gsap.registerPlugin(ScrollTrigger);

const Header = () => {
  const headerNavRef = useRef<HTMLDivElement | null>(null);
  const backdropNavRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const headerNav = headerNavRef.current;
    const backdropNav = backdropNavRef.current;

    if (!headerNav || !backdropNav) return;

    // Animate backdrop opacity
    gsap.to(backdropNav, {
      opacity: 1,
      duration: 0.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: document.body,
        start: "top+=25 top", // Trigger after scrolling 25px
        toggleActions: "play none none reverse", // Reverse when scrolling back up
      },
    });

    // Animate header nav background opacity
    gsap.to(headerNav, {
      opacity: 1, // Fully visible background
      duration: 0.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: document.body,
        start: "top+=10 top", // Trigger after scrolling 10px
        toggleActions: "play none none reverse", // Reverse when scrolling back up
      },
    });

    // Cleanup on unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <header className="w-full h-[70px] md:h-[150px] fixed top-0 left-0 z-50 transition-all duration-300">
      <div className="relative w-full h-full flex justify-center items-center">
        {/* Gradient background effect */}
        <div
          ref={backdropNavRef}
          className="opacity-0 absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 w-[90%] h-[80%] rounded-full top-[10%] left-[5%] blur-sm"
        ></div>

        {/* Main header nav */}
        <div
          ref={headerNavRef}
          className="opacity-0 w-[90%] h-[80%] rounded-full relative bg-white dark:bg-black"
        ></div>

        <div className="flex px-[20px] md:px-[50px] items-center justify-between absolute w-[90%] h-[80%] top-[10%] left-[5%] z-[60]">
          <a href={"/"}>
            <Image
              className="flex dark:hidden"
              src={"/logo-light.svg"}
              alt="logo"
              width={101}
              height={32}
            />
            <Image
              className="hidden dark:flex"
              src={"/logo-dark.svg"}
              alt="logo"
              width={101}
              height={32}
            />
          </a>

          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
