"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Longs = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svgPath = svgRef.current.querySelector("path");
    if (!svgPath) return;

    const pathLength = svgPath.getTotalLength();

    // Set initial stroke properties
    gsap.set(svgPath, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    // Setup animation
    gsap.timeline({ repeat: -1, repeatDelay: 5 }).to(svgPath, {
      strokeDashoffset: 0,
      duration: 2,
      ease: "power2.inOut",
    });

    // Intersection Observer to trigger animations only when in view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(svgPath, { opacity: 1, duration: 0.5 });
        } else {
          gsap.to(svgPath, { opacity: 0, duration: 0.5 });
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(svgRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full flex justify-center">
      <svg
        ref={svgRef}
        className="max-w-full h-auto"
        viewBox="0 0 1400 1280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#optimizedFilter)">
          <path
            d="M202 777.5L304.5 448.5C319.167 491.167 348.5 576.2 348.5 575C348.5 573.8 397.833 537.5 422.5 519.5L475 631L580 294.5L617 333.5L662.5 190"
            stroke="#0AFF91"
            strokeOpacity="0.25"
          />
        </g>
        <defs>
          <filter
            id="optimizedFilter"
            x="0"
            y="0"
            width="1400"
            height="1280"
            filterUnits="objectBoundingBox"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur stdDeviation="20" result="blur" />
            <feOffset dx="10" dy="10" result="offset" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="offset"
              result="blend"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

const Shorts = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svgPath = svgRef.current.querySelector("path");
    if (!svgPath) return;

    const pathLength = svgPath.getTotalLength();

    // Set initial stroke properties
    gsap.set(svgPath, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    // Setup animation
    gsap.timeline({ repeat: -1, repeatDelay: 5 }).to(svgPath, {
      strokeDashoffset: 0,
      duration: 2,
      ease: "power2.inOut",
    });

    // Intersection Observer to trigger animations only when in view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(svgPath, { opacity: 1, duration: 0.5 });
        } else {
          gsap.to(svgPath, { opacity: 0, duration: 0.5 });
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(svgRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full flex justify-center">
      <svg
        ref={svgRef}
        className="max-w-full h-auto"
        viewBox="0 0 1400 1280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#optimizedFilter)">
          <path
            d="M815 457L891 603L949.5 544.5L1056 848L1120 694.5L1152.5 732.5L1192 634L1270 951"
            stroke="#FF0B0B"
            strokeOpacity="0.25"
          />
        </g>
        <defs>
          <filter
            id="optimizedFilter"
            x="0"
            y="0"
            width="1400"
            height="1280"
            filterUnits="objectBoundingBox"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur stdDeviation="20" result="blur" />
            <feOffset dx="10" dy="10" result="offset" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="offset"
              result="blend"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export { Longs, Shorts };
