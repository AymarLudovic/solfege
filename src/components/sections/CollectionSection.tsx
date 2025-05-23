import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface NFTCardProps {
  image: string;
  name: string;
  rank: string;
}

const NFTCard: React.FC<NFTCardProps> = ({ image, name, rank }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    gsap.set(card, { willChange: 'transform, filter' });

    const hoverIn = () => {
      gsap.to(card, {
        scale: 1.05,
        rotationY: 5,
        rotationX: -5,
        duration: 0.4,
        ease: 'power2.out',
        filter: 'brightness(1.2) contrast(1.1) drop-shadow(0 10px 20px rgba(0, 255, 232, 0.4))', // Enhanced filter
      });
    };

    const hoverOut = () => {
      gsap.to(card, {
        scale: 1,
        rotationY: 0,
        rotationX: 0,
        duration: 0.4,
        ease: 'power2.out',
        filter: 'brightness(1) contrast(1) drop-shadow(0 4px 6px rgba(0,0,0,0.1))',
      });
    };

    card.addEventListener('mouseenter', hoverIn);
    card.addEventListener('mouseleave', hoverOut);

    return () => {
      card.removeEventListener('mouseenter', hoverIn);
      card.removeEventListener('mouseleave', hoverOut);
      gsap.killTweensOf(card);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="flex-shrink-0 w-80 md:w-96 bg-gray-900 rounded-xl overflow-hidden shadow-lg p-4 mx-4 border border-gray-800 transform-gpu interactive-element"
    >
      <img src={image} alt={name} className="w-full h-auto object-cover rounded-lg mb-4 border border-accent-purple" />
      <h3 className="text-xl font-spacegrotesk font-bold text-accent-cyan mb-2">{name}</h3>
      <p className="text-gray-400 font-dmsans text-sm">Rank: <span className="font-bold text-light-contrast">{rank}</span></p>
    </div>
  );
};

const CollectionSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const horizontalScrollRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement[]>([]); // Array of refs for horizontal panels

  const nfts = [
    { image: '/nft-1.webp', name: 'Cosmic Ape #001', rank: 'Legendary' },
    { image: '/nft-2.webp', name: 'Galactic Chimpanzee #002', rank: 'Rare' },
    { image: '/nft-3.webp', name: 'Astral Gorilla #003', rank: 'Epic' },
    { image: '/nft-4.webp', name: 'Quantum Orangutan #004', rank: 'Uncommon' },
    { image: '/nft-5.webp', name: 'Celestial Baboon #005', rank: 'Common' },
    { image: '/nft-6.webp', name: 'Stardust Lemur #006', rank: 'Rare' },
  ];

  useEffect(() => {
    if (!sectionRef.current || !horizontalScrollRef.current) return;

    const panels = panelsRef.current;
    if (panels.length === 0) return;

    // Create a horizontal scroll animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: horizontalScrollRef.current,
        pin: true, // Pin the section while scrolling horizontally
        start: "top top",
        end: () => "+=" + (horizontalScrollRef.current!.offsetWidth - window.innerWidth), // Scroll end based on content width
        scrub: 1, // Link animation to scroll position
        snap: {
          snapTo: 1 / (panels.length - 1), // Snap to each panel
          duration: { min: 0.2, max: 0.8 },
          ease: "power2.inOut",
        },
        invalidateOnRefresh: true, // Recalculate on window resize
      }
    });

    tl.to(horizontalScrollRef.current, {
      x: () => -(horizontalScrollRef.current!.scrollWidth - window.innerWidth), // Animate x position
      ease: "none"
    });

    // Parallax on horizontal scroll for individual panels
    panels.forEach((panel, i) => {
      gsap.to(panel.querySelector('img'), {
        y: -50, // Slight vertical parallax
        ease: "none",
        scrollTrigger: {
          trigger: panel,
          containerAnimation: tl, // Link to the horizontal scroll timeline
          start: "left right", // When the left of the panel enters the viewport from the right
          end: "right left",   // When the right of the panel leaves the viewport to the left
          scrub: true,
        }
      });
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [nfts.length]); // Re-run if number of NFTs changes

  return (
    <section id="collection" ref={sectionRef} className="bg-dark-deep py-20 relative min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="max-width-wrapper text-center mb-16">
        <h2 className="brutalist-heading text-heading-lg text-light-contrast mb-4">
          The Cosmic Vault
        </h2>
        <p className="font-dmsans text-xl text-gray-400 max-w-3xl mx-auto">
          Explore a curated selection from our Genesis Collection, each a masterpiece of digital alchemy.
        </p>
      </div>

      <div ref={horizontalScrollRef} className="flex flex-row flex-nowrap items-center w-max p-4 md:p-8 lg:p-12 xl:p-16">
        {nfts.map((nft, index) => (
          <div
            key={index}
            ref={el => { if (el) panelsRef.current[index] = el; }}
            className="flex-shrink-0 w-screen flex justify-center items-center py-8"
          >
            <NFTCard {...nft} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CollectionSection;