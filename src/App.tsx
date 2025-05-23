import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { CustomEase } from 'gsap/CustomEase';

import Preloader from '@/components/animations/Preloader';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import CollectionSection from '@/components/sections/CollectionSection';
import RoadmapSection from '@/components/sections/RoadmapSection';
import CallToActionSection from '@/components/sections/CallToActionSection';

gsap.registerPlugin(ScrollTrigger, Flip, CustomEase);

// Define a custom ease for smoother animations
CustomEase.create("customEase", "M0,0 C0.7,0 0.3,1 1,1"); // Smooth, slightly overshooting ease

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const mainContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onPageLoad = () => {
      setLoading(false);
      gsap.to(document.body, { opacity: 1, duration: 0.5 }); // Fade in body after preloader
    };

    if (document.readyState === 'complete') {
      onPageLoad();
    } else {
      window.addEventListener('load', onPageLoad);
      return () => window.removeEventListener('load', onPageLoad);
    }
  }, []);

  useEffect(() => {
    if (!loading && mainContentRef.current) {
      // General GSAP setup for performance and scroll integration
      gsap.set(mainContentRef.current, { visibility: 'visible' });

      // Optional: Smooth scroll polyfill for older browsers or custom scroll behavior
      // ScrollTrigger.defaults({ smooth: true }); // Use if you want a custom smooth scroll effect

      // Cleanup GSAP instances on unmount
      return () => {
        ScrollTrigger.getAll().forEach(st => st.kill());
      };
    }
  }, [loading]);

  return (
    <div className="relative overflow-hidden min-h-screen bg-dark-deep text-light-contrast">
      <CustomCursor />
      {loading && <Preloader />}
      <div ref={mainContentRef} className={loading ? 'opacity-0 visibility-hidden' : 'opacity-100 visibility-visible'}>
        <Header />
        <main>
          <HeroSection />
          <AboutSection />
          <CollectionSection />
          <RoadmapSection />
          <CallToActionSection />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;