"use client";

import { useRef, useEffect, type ReactNode } from 'react';

export function FadeInFromLeft({ children, className }: { children: ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0', '-translate-x-20');
        } else {
          entry.target.classList.add('opacity-0', '-translate-x-20');
        }
      },
      {
        threshold: 0.1,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div ref={ref} className={`opacity-0 -translate-x-20 transition-all duration-700 ease-in-out ${className}`}>
      {children}
    </div>
  );
}
