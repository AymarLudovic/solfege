import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '../ui/Button';

gsap.registerPlugin(ScrollTrigger);

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroRef.current && titleRef.current && subtitleRef.current && buttonRef.current) {
      // Hero section initial fade in
      gsap.fromTo(heroRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: 'power3.out', delay: 1.8 } // Starts after preloader and header
      );

      // Text animation (letter by letter for dramatic effect)
      const titleChars = titleRef.current.innerText.split('');
      titleRef.current.innerHTML = titleChars.map(char => `<span class="inline-block relative opacity-0 translate-y-full">${char === ' ' ? '&nbsp;' : char}</span>`).join('');

      gsap.to(titleRef.current.children, {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 0.8,
        ease: 'power3.out',
        delay: 2 // After initial hero fade
      });

      // Subtitle animation
      gsap.fromTo(subtitleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 2.5 }
      );

      // Button animation
      gsap.fromTo(buttonRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 2.8 }
      );

      // Parallax effect on scroll
      gsap.to(titleRef.current, {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to(subtitleRef.current, {
        yPercent: -5,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }
  }, []);

  return (
    <section ref={heroRef} className="relative h-screen flex flex-col items-start justify-center p-6 md:p-12 lg:p-24 bg-gradient-to-br from-deep-charcoal to-dark-gray overflow-hidden">
      <div className="relative z-10 max-w-6xl w-full">
        <h1 ref={titleRef} className="text-off-white text-d-10xl lg:text-d-11xl font-space-grotesk font-extrabold leading-[0.9] mb-8 uppercase text-gradient-purple-cyan drop-shadow-lg will-change-transform">
          Crafting Digital Excellence.
        </h1>
        <p ref={subtitleRef} className="text-off-white text-d-2xl md:text-d-4xl font-dm-sans max-w-4xl mb-12 leading-relaxed opacity-0 will-change-transform">
          Where cutting-edge design meets unparalleled development to create extraordinary experiences.
        </p>
        <div ref={buttonRef} className="opacity-0 will-change-transform">
          <Button text="Explore Our Work" />
        </div>
      </div>

      {/* Abstract geometric elements for brutalist-chic aesthetic and depth */}
      <div className="absolute top-20 right-20 w-48 h-48 bg-neon-green/10 transform rotate-45 skew-x-12 opacity-30 pointer-events-none mix-blend-screen z-0 will-change-transform"></div>
      <div className="absolute bottom-10 left-10 w-96 h-2 bg-neon-pink/15 transform -rotate-12 opacity-40 pointer-events-none mix-blend-screen z-0 will-change-transform"></div>
      <div className="absolute bottom-0 right-0 w-3/4 h-3/4 bg-gradient-to-tr from-accent-purple/20 to-accent-cyan/10 rounded-br-full blur-3xl opacity-20 pointer-events-none mix-blend-overlay z-0 will-change-transform"></div>
    </section>
  );
};

export default HeroSection;