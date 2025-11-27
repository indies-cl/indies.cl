'use client';

import { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  end: number;
  duration?: number;
  className?: string;
  suffix?: string;
}

export default function CountUp({
  end,
  duration = 2000,
  className = '',
  suffix = '',
}: CountUpProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  // Detectar preferencia de reduce motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  // Intersection Observer para detectar visibilidad
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            setIsVisible(true);
            hasAnimated.current = true;
          }
        });
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animación del contador
  useEffect(() => {
    if (!isVisible) return;

    // Si prefiere reducir movimiento, mostrar el número final inmediatamente
    if (prefersReducedMotion) {
      setCount(end);
      return;
    }

    const startTime = Date.now();
    const startValue = 0;

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Animación lineal (sin easing)
      const currentCount = Math.floor(startValue + (end - startValue) * progress);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration, prefersReducedMotion]);

  const formattedCount = count.toLocaleString('es-CL');
  const finalFormattedCount = end.toLocaleString('es-CL');

  return (
    <span
      ref={elementRef}
      className={className}
      style={{
        fontVariantNumeric: 'tabular-nums',
        display: 'inline-grid',
        gridTemplateColumns: '1fr',
        gridTemplateRows: '1fr',
      }}
    >
      {/* Número invisible para reservar espacio */}
      <span
        style={{
          gridColumn: 1,
          gridRow: 1,
          visibility: 'hidden',
        }}
        aria-hidden="true"
      >
        {finalFormattedCount}
        {suffix}
      </span>
      {/* Número visible animado */}
      <span
        style={{
          gridColumn: 1,
          gridRow: 1,
        }}
      >
        {formattedCount}
        {suffix}
      </span>
    </span>
  );
}
