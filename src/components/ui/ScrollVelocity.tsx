"use client";

import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility for clean Tailwind class merging
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Isomorphic layout effect prevents Next.js SSR hydration warnings
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Native wrap calculation prevents the need for an extra @motionone/utils dependency
const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

interface ScrollVelocityProps {
  children: React.ReactNode;
  velocity?: number;
  className?: string;
}

function ParallaxText({ children, velocity = 100, className }: ScrollVelocityProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const [repetitions, setRepetitions] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!containerRef.current || !textRef.current) return;
    
    const calculateRepetitions = () => {
      const containerWidth = containerRef.current!.offsetWidth;
      const textWidth = textRef.current!.offsetWidth;
      if (textWidth > 0) {
        setRepetitions(Math.ceil(containerWidth / textWidth) + 2);
      }
    };
    
    calculateRepetitions();
    window.addEventListener("resize", calculateRepetitions);
    return () => window.removeEventListener("resize", calculateRepetitions);
  }, [children]);

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);
  const directionFactor = useRef<number>(1);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * velocity * (delta / 1000);
    
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }
    
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="m-0 flex flex-nowrap overflow-hidden whitespace-nowrap" ref={containerRef}>
      <motion.div className="flex flex-nowrap whitespace-nowrap" style={{ x }}>
        {Array.from({ length: repetitions }).map((_, i) => (
          <span
            key={i}
            ref={i === 0 ? textRef : null}
            className={cn("block shrink-0 px-4", className)}
          >
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function ScrollVelocity({
  texts = [],
  velocity = 100,
  className,
}: {
  texts: string[];
  velocity?: number;
  className?: string;
}) {
  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      {texts.map((text, index) => (
        <ParallaxText key={index} velocity={index % 2 === 0 ? velocity : -velocity} className={className}>
          {text}
        </ParallaxText>
      ))}
    </div>
  );
}