import React from 'react';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import CollectionSection from '@/components/sections/CollectionSection';
import RoadmapSection from '@/components/sections/RoadmapSection';
import CallToActionSection from '@/components/sections/CallToActionSection';

const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <CollectionSection />
      <RoadmapSection />
      <CallToActionSection />
    </>
  );
};

export default HomePage;