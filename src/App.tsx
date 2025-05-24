import React, { useRef, useEffect } from 'react';
import { useGsapAnimations } from './hooks/useGsapAnimations';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import CustomCursor from './components/ui/CustomCursor';
import Preloader from './components/ui/Preloader';
import HeroSection from './components/sections/HeroSection';
import HorizontalScrollSection from './components/sections/HorizontalScrollSection';
import ToDoSection from './components/sections/ToDoSection'; // <-- NOUVEAU

const App: React.FC = () => {
  const { cursorRef, followerRef } = useGsapAnimations();
  const mainContentRef = useRef<HTMLDivElement>(null);

  // Example of global page transitions/animations if needed,
  // typically managed by ScrollTrigger for sections
  useEffect(() => {
    // You might have a master timeline here to orchestrate section entries
    // or rely on individual section ScrollTriggers.
  }, []);

  return (
    <div className="relative overflow-hidden">
      <Preloader />
      <CustomCursor cursorRef={cursorRef} followerRef={followerRef} />
      <Header />
      <main ref={mainContentRef} className="relative z-10">
        <HeroSection />
        <HorizontalScrollSection />
        <ToDoSection /> {/* <-- Intégration de la section ToDo */}
        {/* Potentiellement d'autres sections ici (About, Services, Contact, etc.) */}
      </main>
      <Footer />
      {/* Placeholder for WebGL Canvas. Actual WebGL implementation would be a separate library/component. */}
      {/* <canvas id="webgl-bg" className="fixed inset-0 z-0"></canvas> */}
    </div>
  );
};

export default App;
</Extacted_code>

Nom du fichier: src/components/layout/Header.tsx
<Extracted_code>
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const Header: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const navItemRefs = useRef<HTMLLIElement[]>([]);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 1.5 } // Delay after preloader
      );

      gsap.fromTo(navItemRefs.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out', stagger: 0.1, delay: 1.8 }
      );
    }
  }, []);

  const handleNavHover = (e: React.MouseEvent<HTMLLIElement>, enter: boolean) => {
    if (enter) {
      gsap.to(e.currentTarget.querySelector('a'), { color: '#4EE7E9', duration: 0.3, ease: 'power2.out' });
      gsap.to(e.currentTarget.querySelector('.underline-effect'), { width: '100%', duration: 0.4, ease: 'power2.out' });
    } else {
      gsap.to(e.currentTarget.querySelector('a'), { color: '#F5F5F5', duration: 0.3, ease: 'power2.out' });
      gsap.to(e.currentTarget.querySelector('.underline-effect'), { width: '0%', duration: 0.4, ease: 'power2.out' });
    }
  };

  return (
    <header ref={headerRef} className="fixed top-0 left-0 w-full z-50 p-6 md:p-8 flex justify-between items-center bg-gradient-to-b from-deep-charcoal/80 to-transparent">
      <div className="text-off-white text-d-xl font-space-grotesk font-extrabold tracking-tight cursor-pointer interactive-element" data-cursor-text="Home">
        ELITE.
      </div>
      <nav>
        <ul className="flex space-x-6 md:space-x-12">
          <li
            ref={el => { if (el) navItemRefs.current[0] = el; }}
            className="relative cursor-pointer interactive-element group"
            onMouseEnter={(e) => handleNavHover(e, true)}
            onMouseLeave={(e) => handleNavHover(e, false)}
            data-cursor-text="Projects"
          >
            <a href="#projects" className="text-off-white text-d-base md:text-d-lg font-dm-sans font-medium hover:text-accent-cyan transition-colors">Projects</a>
            <span className="underline-effect absolute bottom-0 left-0 h-0.5 bg-accent-cyan w-0 transition-all duration-300 ease-expo-out"></span>
          </li>
          <li
            ref={el => { if (el) navItemRefs.current[1] = el; }}
            className="relative cursor-pointer interactive-element group"
            onMouseEnter={(e) => handleNavHover(e, true)}
            onMouseLeave={(e) => handleNavHover(e, false)}
            data-cursor-text="Studio"
          >
            <a href="#studio" className="text-off-white text-d-base md:text-d-lg font-dm-sans font-medium hover:text-accent-cyan transition-colors">Studio</a>
            <span className="underline-effect absolute bottom-0 left-0 h-0.5 bg-accent-cyan w-0 transition-all duration-300 ease-expo-out"></span>
          </li>
          <li
            ref={el => { if (el) navItemRefs.current[2] = el; }}
            className="relative cursor-pointer interactive-element group"
            onMouseEnter={(e) => handleNavHover(e, true)}
            onMouseLeave={(e) => handleNavHover(e, false)}
            data-cursor-text="Tasks"
          >
            <a href="#todo" className="text-off-white text-d-base md:text-d-lg font-dm-sans font-medium hover:text-accent-cyan transition-colors">Tasks</a>
            <span className="underline-effect absolute bottom-0 left-0 h-0.5 bg-accent-cyan w-0 transition-all duration-300 ease-expo-out"></span>
          </li>
          <li
            ref={el => { if (el) navItemRefs.current[3] = el; }}
            className="relative cursor-pointer interactive-element group"
            onMouseEnter={(e) => handleNavHover(e, true)}
            onMouseLeave={(e) => handleNavHover(e, false)}
            data-cursor-text="Contact"
          >
            <a href="#contact" className="text-off-white text-d-base md:text-d-lg font-dm-sans font-medium hover:text-accent-cyan transition-colors">Contact</a>
            <span className="underline-effect absolute bottom-0 left-0 h-0.5 bg-accent-cyan w-0 transition-all duration-300 ease-expo-out"></span>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;