import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface RoadmapItemProps {
  quarter: string;
  year: string;
  title: string;
  description: string;
  isCurrent?: boolean;
}

const RoadmapItem: React.FC<RoadmapItemProps> = ({ quarter, year, title, description, isCurrent }) => {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!itemRef.current) return;

    gsap.fromTo(itemRef.current,
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: itemRef.current,
          start: "top 70%",
          end: "top 30%",
          toggleActions: "play none none reverse",
          scrub: 0.5,
        }
      }
    );
  }, []);

  return (
    <div ref={itemRef} className={`relative flex items-start gap-6 py-8 px-4 md:px-0 opacity-0`}>
      <div className="flex-shrink-0 w-24 text-right pr-6">
        <p className="font-spacegrotesk text-xl font-bold text-accent-cyan">{quarter}</p>
        <p className="font-dmsans text-lg text-gray-400">{year}</p>
      </div>
      <div className="relative z-10 w-8 h-8 rounded-full bg-accent-purple flex items-center justify-center border-2 border-accent-pink flex-shrink-0 -mt-0.5">
        {isCurrent && <span className="absolute w-4 h-4 bg-accent-cyan rounded-full animate-pulse"></span>}
      </div>
      <div className="flex-grow max-w-2xl bg-gray-900 p-6 rounded-xl border border-gray-800 shadow-lg">
        <h3 className="font-spacegrotesk text-2xl font-bold text-light-contrast mb-2">{title}</h3>
        <p className="font-dmsans text-gray-400">{description}</p>
      </div>
    </div>
  );
};

const RoadmapSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const roadmapItems = [
    { quarter: 'Q1', year: '2024', title: 'Genesis Collection Launch', description: 'Release of 10,000 unique Nebula Apes NFTs, public minting, and smart contract audit.' },
    { quarter: 'Q2', year: '2024', title: 'Community & DAO Setup', description: 'Establishment of exclusive Discord channels, voting mechanisms for holders, and first community events.', isCurrent: true },
    { quarter: 'Q3', year: '2024', title: 'Metaverse Integration', description: 'Development of 3D models for in-game avatars and partnerships with metaverse platforms.' },
    { quarter: 'Q4', year: '2024', title: 'Staking & Utility Expansion', description: 'Introduce staking rewards for holders and unlock additional utilities like merchandise drops and exclusive content.' },
    { quarter: 'Q1', year: '2025', title: 'Second Collection Drop', description: 'Unveil the next evolution of Nebula Apes, building upon lore and design from the Genesis collection.' },
  ];

  useEffect(() => {
    if (!sectionRef.current || !lineRef.current) return;

    // Timeline line drawing animation
    gsap.fromTo(lineRef.current,
      { scaleY: 0, transformOrigin: 'top' },
      {
        scaleY: 1,
        duration: 2,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section id="roadmap" ref={sectionRef} className="bg-dark-deep py-20 relative full-height-section overflow-hidden">
      <div className="max-width-wrapper text-center mb-16">
        <h2 className="brutalist-heading text-heading-lg text-accent-pink mb-4">
          The Journey Ahead
        </h2>
        <p className="font-dmsans text-xl text-gray-400 max-w-3xl mx-auto">
          Our roadmap outlines the key milestones and future developments of the Nebula Apes ecosystem.
        </p>
      </div>

      <div className="relative mx-auto flex flex-col items-center">
        {/* Vertical timeline line */}
        <div ref={lineRef} className="absolute left-1/2 md:left-[calc(50%-8rem)] w-1 bg-gradient-to-b from-accent-purple to-accent-cyan rounded-full h-full transform origin-top"></div>
        <div className="relative z-10 flex flex-col items-center space-y-12">
          {roadmapItems.map((item, index) => (
            <RoadmapItem key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;