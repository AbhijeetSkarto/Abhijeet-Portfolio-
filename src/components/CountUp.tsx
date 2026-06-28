import React, { useEffect, useState, useRef } from "react";

interface CountUpProps {
  end: number;
  durationMs?: number;
  decimals?: number;
}

export default function CountUp({ end, durationMs = 1500, decimals = 0 }: CountUpProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTimestamp: number | null = null;
          
          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / durationMs, 1);
            
            // Easing function: easeOutQuad
            const easeProgress = progress * (2 - progress);
            
            setCount(easeProgress * end);
            
            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setCount(end); // Ensure exact final value
            }
          };
          
          window.requestAnimationFrame(step);
        }
      },
      { 
        threshold: 0.1,
        rootMargin: "0px 0px -20px 0px"
      }
    );

    const current = elementRef.current;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [end, durationMs]);

  return (
    <span ref={elementRef}>
      {count.toFixed(decimals)}
    </span>
  );
}
