import React, { useRef, useEffect, useState, useCallback } from 'react';
import { gsap, ScrollTrigger, Flip } from 'gsap/all';
import ToDoItem from '../ui/ToDoItem';
import ToDoInput from '../ui/ToDoInput';

gsap.registerPlugin(ScrollTrigger, Flip);

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

const ToDoSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null); // Container for Flip animations
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', text: 'Architect bespoke GSAP animations', completed: false },
    { id: '2', text: 'Refine micro-interactions for UX', completed: true },
    { id: '3', text: 'Optimize WebGL background performance', completed: false },
    { id: '4', text: 'Design new brutalist-chic module', completed: false },
  ]);

  // Section entry animation
  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(sectionRef.current,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
            // markers: true,
          },
        }
      );

      // Animate title and input
      gsap.fromTo(sectionRef.current.querySelector('h2'),
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
      gsap.fromTo(sectionRef.current.querySelector('.todo-input-wrapper'),
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  }, []);

  // GSAP Flip for list item changes
  const animateListWithFlip = useCallback(() => {
    if (listRef.current) {
      const state = Flip.getState(listRef.current.children); // Get current state of all children
      Flip.from(state, {
        duration: 0.6,
        ease: 'power2.inOut',
        stagger: 0.08,
        absolute: false, // Maintain relative positions if not absolutely positioned
        onEnter: (elements) => gsap.fromTo(elements, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.4 }),
        onLeave: (elements) => gsap.to(elements, { opacity: 0, scale: 0.8, duration: 0.4 }),
        nested: true, // Crucial for animating nested elements if they exist
      });
    }
  }, []);

  const addTask = (text: string) => {
    const newTask = { id: Date.now().toString(), text, completed: false };
    setTasks(prevTasks => {
      const updatedTasks = [...prevTasks, newTask];
      animateListWithFlip(); // Trigger Flip animation
      return updatedTasks;
    });
  };

  const toggleTask = (id: string) => {
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      // No Flip here as it's an internal state change, not position change.
      // Animation handled within ToDoItem component.
      return updatedTasks;
    });
  };

  const deleteTask = (id: string) => {
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.filter(task => task.id !== id);
      animateListWithFlip(); // Trigger Flip animation
      return updatedTasks;
    });
  };

  return (
    <section id="todo" ref={sectionRef} className="relative py-20 md:py-32 bg-deep-charcoal min-h-screen flex flex-col items-center justify-center text-off-white overflow-hidden px-6 md:px-12">
      <div className="max-w-4xl w-full text-center mb-16 relative z-10">
        <h2 className="text-d-7xl md:text-d-9xl font-space-grotesk font-extrabold leading-tight mb-8 text-gradient-purple-cyan drop-shadow-lg opacity-0 will-change-transform">
          Elite Task Management.
        </h2>
        <p className="text-d-lg md:text-d-2xl font-dm-sans max-w-3xl mx-auto opacity-70 mb-12">
          Organize your next design sprint or development milestones with precision and style.
        </p>
        <div className="todo-input-wrapper opacity-0 will-change-transform">
          <ToDoInput onAddTask={addTask} />
        </div>
      </div>

      <div ref={listRef} className="w-full max-w-4xl space-y-6 relative z-10">
        {tasks.length === 0 ? (
          <p className="text-d-lg opacity-60 text-center pt-10">No tasks. Time to create!</p>
        ) : (
          tasks.map(task => (
            <ToDoItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          ))
        )}
      </div>

      {/* Subtle geometric elements for aesthetic */}
      <div className="absolute top-1/4 left-10 w-24 h-24 bg-neon-pink/10 transform rotate-12 opacity-20 pointer-events-none mix-blend-screen z-0"></div>
      <div className="absolute bottom-1/4 right-10 w-36 h-36 bg-neon-blue/10 transform skew-y-6 opacity-20 pointer-events-none mix-blend-screen z-0"></div>
    </section>
  );
};

export default ToDoSection;