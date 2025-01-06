"use client";

import React, { useEffect } from "react";
import gsap from "gsap";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Longs, Shorts } from "./components/line";
import Roadmap from "./components/shared/Roadmap";
import MoreToCome from "./components/shared/MoreToCome";
import Link from "next/link";

export default function Home() {
  useEffect(() => {
    const blob = document.querySelector(".blob");

    // Simplified idle animation
    gsap.to(blob, {
      duration: 6,
      scale: "random(0.9, 1.1)",
      rotation: "random(-30, 30)",
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <main className="md:pt-24 relative w-full min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center overflow-hidden transition-colors duration-300">
        <div className="z-10 pt-20 text-center px-6 flex flex-col gap-[50px] justify-center items-center w-full">
          <div className="flex flex-col gap-6 items-center text-center z-30">
            <h1 className="max-w-[849px] text-2xl md:leading-[70px] md:text-[50px] font-bold text-gray-800 dark:text-gray-200">
              Elevate Your Trading with Peeps. Precision, Simplicity, Success
            </h1>
            <Link href={"#road-map"}>
              <Button className="rounded-[12px] font-medium text-[16px] md:text-[20px] w-[140px] md:w-[170px] h-[50px] md:h-[60px] z-30">
                View Roadmap
              </Button>
            </Link>
          </div>
          <div className="relative">
            {/* Longs SVG */}
            <div className="absolute left-0 top-[-50%] md:left-[-20%] lg:top-[-70%]">
              <Longs />
            </div>
            {/* Shorts SVG */}
            <div className="absolute right-0 top-[-50%] md:right-[-20%] lg:top-[-70%]">
              <Shorts />
            </div>

            {/* Floating Blob */}
            <div
              className="blob absolute w-40 h-40 md:w-[500px] md:h-[500px] lg:w-[700px] lg:h-[700px] bg-purple-600 opacity-50 rounded-full blur-3xl dark:bg-purple-700"
              style={{
                top: "60%",
                left: "50%",
                transform: "translate(-50%, -65%)",
              }}
            ></div>

            {/* Demo Image */}
            <div className="relative z-20">
              <Image
                className="scale-90 md:scale-75"
                src="/images/demo.png"
                alt="demo"
                width={940}
                height={541}
                priority
              />
            </div>
          </div>
        </div>
        <Roadmap />
      </div>

      <MoreToCome />
    </main>
  );
}
