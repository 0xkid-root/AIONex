import { useEffect, useRef } from 'react';
import { Player } from '@remotion/player';
import { AbsoluteFill } from 'remotion';
import gsap from 'gsap';

function NetworkAnimation() {
  const nodesRef = useRef<HTMLDivElement[]>([]);
  const linesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const nodes = nodesRef.current;
    const lines = linesRef.current;

    gsap.to(nodes, {
      scale: 1.2,
      duration: 1,
      repeat: -1,
      yoyo: true,
      stagger: 0.2,
      ease: 'power1.inOut',
    });

    gsap.to(lines, {
      opacity: 0.8,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      stagger: 0.3,
      ease: 'power1.inOut',
    });
  }, []);

  return (
    <AbsoluteFill className="bg-gradient-to-r from-blue-600/20 to-purple-600/20">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={`node-${i}`}
          ref={(el) => el && (nodesRef.current[i] = el)}
          className="absolute w-4 h-4 bg-white rounded-full opacity-50"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={`line-${i}`}
          ref={(el) => el && (linesRef.current[i] = el)}
          className="absolute w-32 h-px bg-white opacity-30 origin-left"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}
    </AbsoluteFill>
  );
}

export function HeroAnimation() {
  return (
    <div className="absolute inset-0">
      <Player
        component={NetworkAnimation}
        durationInFrames={300}
        fps={30}
        compositionWidth={1920}
        compositionHeight={1080}
        style={{
          width: '100%',
          height: '100%',
        }}
        autoPlay
        loop
      />
    </div>
  );
} 