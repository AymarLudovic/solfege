import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const copyrightRef = useRef<HTMLDivElement>(null);
  const socialLinksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    gsap.fromTo(footerRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          end: "top 50%",
          scrub: 0.5,
          toggleActions: "play none none reverse"
        }
      }
    );

    gsap.fromTo([copyrightRef.current, socialLinksRef.current],
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Parallax inverse effect for footer (moves slightly up/down with scroll)
    gsap.to(footerRef.current, {
      yPercent: -10, // Moves up 10% relative to its height
      ease: "none",
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top bottom", // when the top of the footer hits the bottom of the viewport
        end: "bottom top",    // when the bottom of the footer hits the top of the viewport
        scrub: true,
      }
    });


    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-dark-deep py-12 px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-24 border-t border-gray-800 relative z-10"
    >
      <div className="max-width-wrapper flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <div ref={copyrightRef} className="text-gray-500 font-dmsans text-sm mb-4 md:mb-0">
          © 2024 Nebula Apes. All rights reserved.
        </div>
        <div ref={socialLinksRef} className="flex space-x-6">
          <a href="#" className="text-gray-400 hover:text-accent-cyan transition-colors duration-300 text-2xl interactive-element">
            <i className="fab fa-twitter"></i> {/* Replace with actual icons or SVG */}
            <span className="sr-only">Twitter</span>
          </a>
          <a href="#" className="text-gray-400 hover:text-accent-cyan transition-colors duration-300 text-2xl interactive-element">
            <i className="fab fa-discord"></i>
            <span className="sr-only">Discord</span>
          </a>
          <a href="#" className="text-gray-400 hover:text-accent-cyan transition-colors duration-300 text-2xl interactive-element">
            <i className="fab fa-instagram"></i>
            <span className="sr-only">Instagram</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;