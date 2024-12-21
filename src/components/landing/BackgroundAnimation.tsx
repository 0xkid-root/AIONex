import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function BackgroundAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const particles = Array.from(containerRef.current.children);

    particles.forEach((particle) => {
      gsap.to(particle, {
        x: 'random(-100, 100, 5)',
        y: 'random(-100, 100, 5)',
        rotation: 'random(-180, 180)',
        duration: 'random(3, 6)',
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-12 h-12 bg-white/5 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
} 