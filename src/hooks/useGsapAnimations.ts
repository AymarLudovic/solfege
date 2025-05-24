import { useEffect, useRef, useCallback } from 'react';
import { gsap, ScrollTrigger, Flip } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger, Flip);

// Custom easing functions (examples)
const EXPO_OUT = 'power3.out';
const EASE_OUT_BACK = 'back.out(1.7)';
const EASE_IN_OUT_QUART = 'quart.inOut';

/**
 * Custom hook to manage GSAP animations and general page effects.
 * Includes cursor animation, preloader, and global ScrollTrigger setup.
 */
export const useGsapAnimations = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const speed = 0.18; // Speed for cursor follower interpolation

  // Register Custom Easings
  useEffect(() => {
    gsap.config({
      // force3D: true // Enable if experiencing performance issues with 2D transforms on complex animations
    });
    // This is where you would register custom easing functions if needed, e.g.:
    // gsap.registerEase('myCustomEase', CustomEase.create('myCustomEase', 'M0,0 C0.7,0 0.3,1 1,1'));
  }, []);

  // Preloader Animation
  const animatePreloader = useCallback(() => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      gsap.to(preloader, {
        opacity: 0,
        duration: 1,
        delay: 0.8, // Adjust delay to simulate loading time
        ease: EXPO_OUT,
        onComplete: () => {
          preloader.style.display = 'none';
          document.body.style.overflow = 'auto'; // Re-enable scroll after preloader
        }
      });
    }
  }, []);

  // Custom Cursor Animation
  const animateCursor = useCallback(() => {
    gsap.to(pos.current, {
      x: mouse.current.x,
      y: mouse.current.y,
      duration: speed,
      ease: 'power3.out',
      onUpdate: () => {
        if (cursorRef.current) {
          gsap.set(cursorRef.current, { x: pos.current.x, y: pos.current.y });
        }
        if (followerRef.current) {
          gsap.set(followerRef.current, { x: pos.current.x - 15, y: pos.current.y - 15 }); // Adjust offset for follower
        }
      }
    });
  }, [speed]);

  useEffect(() => {
    document.body.style.overflow = 'hidden'; // Disable scroll initially for preloader
    animatePreloader();

    // Cursor setup
    const updateMouse = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener('mousemove', updateMouse);

    // Initial positioning and animation loop
    gsap.ticker.add(animateCursor);

    // Cursor interaction with interactive elements
    const handleMouseEnter = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      if (cursorRef.current && followerRef.current) {
        gsap.to(followerRef.current, { scale: 1.8, duration: 0.3, ease: EASE_OUT_BACK, backgroundColor: 'rgba(255, 255, 255, 0.2)' });
        gsap.to(cursorRef.current, { scale: 0.5, duration: 0.3, ease: EASE_OUT_BACK, backgroundColor: 'rgba(255, 255, 255, 0.8)' });

        // Add custom text to cursor based on data-cursor-text attribute
        const cursorText = target.getAttribute('data-cursor-text');
        if (cursorText) {
          cursorRef.current.innerHTML = `<span class="text-xs font-dm-sans uppercase">${cursorText}</span>`;
          gsap.to(cursorRef.current, { width: 60, height: 60, borderRadius: '50%', duration: 0.3, ease: EASE_OUT_BACK });
        }
      }
    };

    const handleMouseLeave = (e: Event) => {
      if (cursorRef.current && followerRef.current) {
        gsap.to(followerRef.current, { scale: 1, duration: 0.3, ease: EXPO_OUT, backgroundColor: 'rgba(255, 255, 255, 0.1)' });
        gsap.to(cursorRef.current, { scale: 1, duration: 0.3, ease: EXPO_OUT, backgroundColor: 'rgba(255, 255, 255, 0.5)', width: 8, height: 8, borderRadius: '50%' });
        cursorRef.current.innerHTML = ''; // Clear custom text
      }
    };

    const interactiveElements = document.querySelectorAll(
      'a, button, input[type="submit"], input[type="button"], label, .interactive-element'
    );
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', updateMouse);
      gsap.ticker.remove(animateCursor);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      ScrollTrigger.getAll().forEach(st => st.kill()); // Kill all ScrollTriggers on unmount
    };
  }, [animatePreloader, animateCursor]);

  return { cursorRef, followerRef };
};