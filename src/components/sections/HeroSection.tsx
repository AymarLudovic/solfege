import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '@/components/ui/Button';

interface HeroSectionProps {}

const HeroSection: React.FC<HeroSectionProps> = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const nftImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Split text for individual letter animation
    const words = headlineRef.current?.innerText.split(' ') || [];
    headlineRef.current!.innerText = ''; // Clear original text
    const spans = words.map(word => {
      const wordSpan = document.createElement('span');
      wordSpan.style.whiteSpace = 'nowrap'; // Keep words together
      word.split('').forEach(char => {
        const charSpan = document.createElement('span');
        charSpan.innerText = char === ' ' ? '\u00A0' : char; // Handle spaces
        charSpan.className = 'inline-block opacity-0 transform translate-y-full'; // Initial state for animation
        wordSpan.appendChild(charSpan);
      });
      headlineRef.current?.appendChild(wordSpan);
      headlineRef.current?.appendChild(document.createTextNode('\u00A0')); // Add space between words
      return Array.from(wordSpan.children) as HTMLElement[];
    }).flat(); // Flatten array of arrays of chars

    // Main Hero Section Timeline
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Initial fade in for the whole section (after preloader)
    tl.fromTo(sectionRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5, delay: 1.8 });

    // Letter-by-letter reveal for headline
    tl.to(spans, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.03,
    }, "<0.5"); // Start slightly after section fade in

    // Fade in and slide up subtext and CTA
    tl.fromTo(subtextRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 }, "<0.2");
    tl.fromTo(ctaRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 }, "<0.2");

    // Parallax for NFT image
    tl.fromTo(nftImageRef.current,
      { y: 50, scale: 0.8, opacity: 0 },
      { y: 0, scale: 1, opacity: 1, duration: 1.5, ease: 'power3.out' },
      "<0.3" // Start slightly after CTA
    );

    // Scroll-triggered parallax for headline and image
    gsap.to(headlineRef.current, {
      yPercent: -20, // Moves up 20%
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });

    gsap.to(nftImageRef.current, {
      yPercent: 30, // Moves down 30% relative to its height
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section id="home" ref={sectionRef} className="full-height-section bg-dark-deep relative overflow-hidden text-center flex flex-col justify-center items-center px-4">
      {/* Background elements with subtle WebGL-like feel (using CSS) */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-purple to-accent-cyan via-dark-deep blur-3xl opacity-50"></div>
        <div className="absolute inset-0 bg-[url('/noise.webp')] opacity-5 mix-blend-overlay"></div> {/* Subtle noise texture */}
        {/* Placeholder for complex WebGL/Canvas background, if implemented */}
      </div>

      <div className="relative z-10 max-width-wrapper">
        <h1
          ref={headlineRef}
          className="brutalist-heading text-heading-xl text-light-contrast leading-tight mb-8 drop-shadow-lg"
        >
          Unleash the <br className="hidden sm:block"/> Nebula Apes
        </h1>
        <p ref={subtextRef} className="font-dmsans text-hero-text-sm text-gray-400 mb-12 max-w-2xl mx-auto opacity-0">
          Discover a groundbreaking collection of 10,000 unique digital entities, merging cosmic artistry with cutting-edge blockchain technology. Join the evolution.
        </p>
        <div ref={ctaRef} className="opacity-0 flex justify-center gap-6">
          <Button>Explore Collection</Button>
          <Button variant="outline">Join Discord</Button>
        </div>
      </div>

      <div className="absolute bottom-10 right-10 z-10 hidden md:block">
        <img
          ref={nftImageRef}
          src="/hero-ape.webp" // Placeholder image
          alt="Nebula Ape NFT"
          className="w-80 h-auto rounded-xl shadow-2xl scale-90 opacity-0 will-change-transform"
        />
      </div>
    </section>
  );
};

export default HeroSection;