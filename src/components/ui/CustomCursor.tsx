import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CustomCursor: React.FC = () => {
  const cursorOuter = useRef<HTMLDivElement>(null);
  const cursorInner = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);
  const mouse = useRef<{ x: number, y: number }>({ x: 0, y: 0 });
  const pos = useRef<{ x: number, y: number }>({ x: 0, y: 0 });
  const speed = 0.18; // Speed of outer cursor follow

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };

      if (cursorInner.current) {
        gsap.to(cursorInner.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
          ease: "power2.out",
          overwrite: "auto"
        });
      }
    };

    const animate = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * speed;
      pos.current.y += (mouse.current.y - pos.current.y) * speed;

      if (cursorOuter.current) {
        gsap.set(cursorOuter.current, {
          x: pos.current.x,
          y: pos.current.y,
        });
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    // Start animation loop
    requestRef.current = requestAnimationFrame(animate);

    window.addEventListener('mousemove', handleMouseMove);

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (cursorOuter.current && cursorInner.current) {
        if (target.closest('.interactive-element') || target.tagName === 'BUTTON' || target.tagName === 'A' || target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
          gsap.to(cursorOuter.current, {
            scale: 2.5,
            opacity: 0.7,
            backgroundColor: '#8B5CF6',
            mixBlendMode: 'difference',
            duration: 0.3,
            ease: 'power2.out'
          });
          gsap.to(cursorInner.current, {
            scale: 0,
            duration: 0.3,
            ease: 'power2.out'
          });
        } else {
          gsap.to(cursorOuter.current, {
            scale: 1,
            opacity: 1,
            backgroundColor: 'transparent',
            mixBlendMode: 'normal',
            duration: 0.3,
            ease: 'power2.out'
          });
          gsap.to(cursorInner.current, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
          });
        }
      }
    };

    document.querySelectorAll('.interactive-element, button, a, input, textarea').forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseEnter); // Re-evaluate on mouseleave for consistent state
    });
    // This is more robust: listen to global mouseover/out to detect all elements
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseEnter);


    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(requestRef.current as number);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseEnter);

      document.querySelectorAll('.interactive-element, button, a, input, textarea').forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseEnter);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorOuter}
        className="gsap-transform fixed z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full border border-light-contrast w-8 h-8 pointer-events-none transition-colors duration-200 ease-out"
      ></div>
      <div
        ref={cursorInner}
        className="gsap-transform fixed z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full bg-light-contrast w-1.5 h-1.5 pointer-events-none transition-colors duration-200 ease-out"
      ></div>
    </>
  );
};

export default CustomCursor;