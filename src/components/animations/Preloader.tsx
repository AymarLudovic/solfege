import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Preloader: React.FC = () => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(preloaderRef.current, {
          opacity: 0,
          y: '-100%',
          duration: 1,
          ease: 'power3.inOut',
          display: 'none',
        });
      }
    });

    // Initial fade in for the preloader itself
    tl.fromTo(preloaderRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.out' })
      // Animate the line
      .fromTo(lineRef.current,
        { scaleX: 0, transformOrigin: 'left' },
        { scaleX: 1, duration: 1.5, ease: 'power3.inOut' },
        "<" // Start at the same time as previous animation
      )
      // Animate text reveal
      .fromTo(textRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        "-=1" // Start 1s before the line completes
      )
      // Pulsate text (optional)
      .to(textRef.current, {
        opacity: 0.8,
        scale: 1.05,
        repeat: 3,
        yoyo: true,
        duration: 0.4,
        ease: 'power1.inOut',
      })
      // Final fade out for text before preloader hides
      .to(textRef.current, { opacity: 0, y: -20, duration: 0.5, ease: 'power2.in' });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[999] bg-dark-deep flex flex-col items-center justify-center pointer-events-auto"
    >
      <div className="relative w-48 h-24 flex flex-col items-center justify-center overflow-hidden">
        <div ref={textRef} className="text-xl md:text-3xl font-spacegrotesk font-bold text-accent-cyan uppercase mb-4 opacity-0">
          Loading Nebula...
        </div>
        <div ref={lineRef} className="w-full h-1 bg-gradient-to-r from-accent-purple to-accent-cyan rounded-full transform scale-x-0 origin-left"></div>
      </div>
    </div>
  );
};

export default Preloader;