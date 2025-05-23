import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '@/components/ui/Button';

const CallToActionSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const elements = [headlineRef.current, subtextRef.current, ctaButtonRef.current];

    gsap.fromTo(elements,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 30%",
          toggleActions: "play none none reverse",
          scrub: 0.5,
        }
      }
    );

    // Subtle background movement/distortion
    gsap.to(sectionRef.current, {
      backgroundPosition: '100% 0%', // Moves background slightly
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });


    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="full-height-section bg-gradient-to-br from-dark-deep via-gray-900 to-accent-purple relative overflow-hidden py-20 text-center flex flex-col justify-center items-center px-4"
      style={{
        backgroundSize: '200% 200%',
        backgroundPosition: '0% 0%',
      }}
    >
      {/* Abstract background elements */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-cyan rounded-full mix-blend-screen blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-pink rounded-full mix-blend-screen blur-3xl opacity-30 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-width-wrapper">
        <h2 ref={headlineRef} className="brutalist-heading text-heading-lg text-light-contrast mb-8 drop-shadow-md">
          Ready to join the Nebula Apes?
        </h2>
        <p ref={subtextRef} className="font-dmsans text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Mint your very own cosmic companion and become part of an exclusive community.
          Access unparalleled art, utility, and a future shaped by you.
        </p>
        <div ref={ctaButtonRef}>
          <Button variant="secondary" className="px-12 py-4 text-2xl">Mint Now</Button>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;