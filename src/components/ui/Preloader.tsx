import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const Preloader: React.FC = () => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // The actual animation is handled in useGsapAnimations hook,
    // this component just provides the structure and initial styling.
    // Ensure the body overflow is handled by useGsapAnimations.
    if (textRef.current) {
      gsap.to(textRef.current, {
        opacity: 0.6,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
    }
  }, []);

  return (
    <div ref={preloaderRef} id="preloader" className="fixed inset-0 bg-deep-charcoal z-[9999] flex items-center justify-center">
      <div ref={textRef} className="text-off-white text-3xl md:text-5xl font-space-grotesk tracking-wide uppercase opacity-0">
        Loading...
      </div>
    </div>
  );
};

export default Preloader;