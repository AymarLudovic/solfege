import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '../ui/Button';

// Placeholder images
import project1 from '@/assets/images/project-placeholder-1.jpg';
import project2 from '@/assets/images/project-placeholder-2.jpg';
import project3 from '@/assets/images/project-placeholder-3.jpg';

gsap.registerPlugin(ScrollTrigger);

const HorizontalScrollSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (sectionRef.current && scrollContainerRef.current) {
      const section = sectionRef.current;
      const scrollContainer = scrollContainerRef.current;

      // Calculate total width needed for horizontal scroll
      const scrollWidth = scrollContainer.scrollWidth - window.innerWidth;

      // Pin the section and apply horizontal scroll
      const horizontalScrollTween = gsap.to(scrollContainer, {
        x: -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          end: () => `+=${scrollWidth}`, // Extend the scrolltrigger duration to match the scrollable width
          // markers: true,
          invalidateOnRefresh: true, // Recalculate on window resize
        },
      });

      // Individual project card animations during horizontal scroll
      projectsRef.current.forEach((project, i) => {
        gsap.fromTo(project,
          {
            y: 100,
            opacity: 0,
            scale: 0.8
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: project,
              containerAnimation: horizontalScrollTween, // Link to the horizontal scroll timeline
              start: 'left center', // When the left edge of the project enters the center of the viewport
              end: 'right center',  // When the right edge of the project leaves the center
              toggleActions: 'play reverse play reverse', // Play on entry, reverse on exit
              scrub: 0.5,
              // markers: true,
            }
          }
        );

        // Hover effect for project cards
        gsap.to(project, {
          scale: 1.05,
          boxShadow: '0px 10px 30px rgba(78, 231, 233, 0.4)',
          ease: 'power2.out',
          paused: true, // Paused by default, controlled by hover
          duration: 0.3,
          overwrite: true,
        }).revertOnRelease = true; // Resets when hover ends

        project.addEventListener('mouseenter', () => (gsap.getTween(project) as any).play());
        project.addEventListener('mouseleave', () => (gsap.getTween(project) as any).reverse());
      });


      // Cleanup ScrollTrigger instances on unmount
      return () => {
        horizontalScrollTween.kill();
        ScrollTrigger.getAll().forEach(st => st.kill());
      };
    }
  }, []);

  const projects = [
    {
      id: 1,
      title: "Elevate UI/UX",
      subtitle: "Designing tomorrow's interfaces",
      image: project1,
      description: "A comprehensive redesign project focusing on intuitive navigation and stunning visual aesthetics for a SaaS platform."
    },
    {
      id: 2,
      title: "Dynamic Branding",
      subtitle: "Crafting identities that resonate",
      image: project2,
      description: "Developing a robust brand identity system for a tech startup, integrating interactive elements and motion design."
    },
    {
      id: 3,
      title: "Immersive Experiences",
      subtitle: "Beyond the screen, into the story",
      image: project3,
      description: "Creating a captivating digital experience website for an art gallery, featuring WebGL and advanced GSAP animations."
    },
    {
      id: 4,
      title: "Future of E-commerce",
      subtitle: "Seamless shopping, reimagined",
      image: project1,
      description: "Building an innovative e-commerce platform with micro-interactions and personalized user journeys for luxury goods."
    },
    {
      id: 5,
      title: "Interactive Storytelling",
      subtitle: "Narratives that move with you",
      image: project2,
      description: "A unique editorial project using scroll-driven animations to unveil content, making reading an active experience."
    },
  ];

  return (
    <section ref={sectionRef} id="projects" className="relative h-[120vh] bg-dark-gray flex flex-col justify-center items-center py-20 px-8 will-change-transform">
      <div className="absolute top-20 left-1/2 -translate-x-1/2 text-center z-10 w-full px-8">
        <h2 className="text-d-7xl md:text-d-9xl font-space-grotesk font-extrabold leading-tight mb-8 text-gradient-purple-cyan">
          Our Visionary Projects.
        </h2>
        <p className="text-d-lg md:text-d-2xl font-dm-sans max-w-3xl mx-auto opacity-70">
          Explore a curated selection of our cutting-edge work, where design innovation meets technical prowess.
        </p>
      </div>

      <div ref={scrollContainerRef} className="flex flex-nowrap items-center h-full px-20 md:px-40 lg:px-60 xl:px-80 pt-40 md:pt-60 will-change-transform">
        {projects.map((project, index) => (
          <div
            key={project.id}
            ref={el => { if (el) projectsRef.current[index] = el; }}
            className="flex-shrink-0 w-[400px] md:w-[600px] h-[500px] md:h-[700px] bg-mid-gray rounded-3xl shadow-xl flex flex-col justify-end p-8 md:p-12 mx-8 border border-mid-gray/50 transform-gpu will-change-transform overflow-hidden relative group"
          >
            <img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover object-center rounded-3xl opacity-60 group-hover:opacity-80 transition-opacity duration-500 ease-expo-out"
            />
            <div className="relative z-10 text-off-white">
              <span className="text-d-sm md:text-d-base font-poppins uppercase tracking-wider opacity-70 mb-2 block">{project.subtitle}</span>
              <h3 className="text-d-4xl md:text-d-5xl font-space-grotesk font-bold leading-tight mb-4 text-accent-cyan">
                {project.title}
              </h3>
              <p className="text-d-base opacity-90 mb-6 group-hover:scale-[1.01] transition-transform duration-300 ease-expo-out">
                {project.description}
              </p>
              <Button text="View Case Study" variant="outline" className="interactive-element" data-cursor-text="Go" />
            </div>
          </div>
        ))}
        {/* Spacer at the end to allow the last item to reach the start position */}
        <div className="flex-shrink-0 w-[calc(50vw-300px)]"></div>
      </div>
    </section>
  );
};

export default HorizontalScrollSection;