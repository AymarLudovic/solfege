import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '@/components/ui/Button';

const Header: React.FC = () => {
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      paused: true,
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          if (self.progress > 0.1 && !tl.isActive()) {
            tl.play();
          } else if (self.progress <= 0.1 && tl.progress() > 0) {
            tl.reverse(0); // Reverse when scrolling back to top
          }
        }
      }
    });

    // Animate header appearance/transformation on scroll
    tl.to(headerRef.current, {
      paddingTop: '0.75rem',
      paddingBottom: '0.75rem',
      backgroundColor: 'rgba(10, 10, 10, 0.8)', // Semi-transparent dark
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(240, 240, 240, 0.1)',
      duration: 0.5,
      ease: 'power2.out',
    }, 0)
    .to(logoRef.current, {
      scale: 0.9,
      opacity: 0.8,
      duration: 0.5,
      ease: 'power2.out',
    }, 0)
    .to(navRef.current, {
      opacity: 0.9,
      duration: 0.5,
      ease: 'power2.out',
    }, 0)
    .to(btnRef.current, {
      opacity: 0.9,
      duration: 0.5,
      ease: 'power2.out',
    }, 0);


    // Initial fade in for header components
    gsap.from([logoRef.current, navRef.current, btnRef.current], {
      opacity: 0,
      y: -20,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.15,
      delay: 1.5 // After preloader
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 w-full z-50 py-6 px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-24 flex justify-between items-center bg-transparent transition-all duration-300 ease-in-out"
    >
      <div ref={logoRef} className="text-3xl font-spacegrotesk font-bold text-light-contrast opacity-0">
        Nebula Apes
      </div>
      <nav ref={navRef} className="hidden lg:block opacity-0">
        <ul className="flex space-x-12">
          {['Home', 'About', 'Collection', 'Roadmap', 'Mint'].map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className="text-light-contrast text-lg font-dmsans hover:text-accent-cyan transition-colors duration-300 relative group interactive-element"
              >
                {item}
                <span className="absolute left-0 bottom-0 h-0.5 bg-accent-cyan w-0 group-hover:w-full transition-all duration-300 ease-out"></span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div ref={btnRef} className="opacity-0">
        <Button variant="outline" className="hidden sm:block">Connect Wallet</Button>
      </div>
    </header>
  );
};

export default Header;