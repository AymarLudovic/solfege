import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '@/components/ui/Button';

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Text content animation (fade in and slide up)
    gsap.fromTo(textContentRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 30%",
          toggleActions: "play none none reverse",
          scrub: 1,
        }
      }
    );

    // Image animation (parallax and rotation)
    gsap.fromTo(imageRef.current,
      { opacity: 0, scale: 0.8, rotation: -10 },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 40%",
          toggleActions: "play none none reverse",
          scrub: 1,
        }
      }
    );

    // Diagonal section break / background transformation
    gsap.to(sectionRef.current, {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 90%)', // Creates a diagonal bottom edge
      duration: 1.5,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom", // When section enters viewport from bottom
        end: "center center",
        scrub: true,
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="full-height-section bg-dark-deep py-20 relative overflow-hidden"
      style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }} // Default full polygon
    >
      <div className="max-width-wrapper grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Asymmetric layout - Text content on left (or right on smaller screens) */}
        <div ref={textContentRef} className="lg:order-1 order-2 text-center lg:text-left p-6 lg:p-0">
          <h2 className="brutalist-heading text-heading-lg text-accent-cyan mb-8">
            The Vision Behind
            <span className="block text-light-contrast text-heading-md lg:text-heading-lg">Nebula Apes</span>
          </h2>
          <p className="font-dmsans text-lg text-gray-400 mb-8 max-w-xl lg:max-w-none mx-auto">
            Nebula Apes isn't just an NFT collection; it's a passport to an evolving universe of digital art and community. We fuse avant-garde aesthetics with robust blockchain utility, offering not just a unique piece of art, but a stake in a vibrant ecosystem.
          </p>
          <p className="font-dmsans text-lg text-gray-400 mb-12 max-w-xl lg:max-w-none mx-auto">
            Our mission is to push the boundaries of digital ownership, providing exclusive access to events, future drops, and a decentralized autonomous organization (DAO) that shapes the future of our project.
          </p>
          <Button variant="primary">Learn More About Us</Button>
        </div>

        {/* Asymmetric layout - Image on right (or left on smaller screens), slightly offset/overlapping */}
        <div ref={imageRef} className="lg:order-2 order-1 relative transform -rotate-3 p-6 lg:p-0">
          <img
            src="/about-ape.webp" // Placeholder image
            alt="Abstract Nebula Ape"
            className="w-full max-w-lg mx-auto lg:mx-0 rounded-2xl shadow-xl border-4 border-accent-purple will-change-transform"
            style={{ filter: 'grayscale(50%) brightness(80%)' }}
          />
          {/* Subtle overlay/gradient for depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-accent-purple/20 to-accent-cyan/20 rounded-2xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-accent-pink/10 rounded-full blur-2xl opacity-50 z-0"></div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;