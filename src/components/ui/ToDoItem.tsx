import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface ToDoItemProps {
  task: {
    id: string;
    text: string;
    completed: boolean;
  };
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const ToDoItem: React.FC<ToDoItemProps> = ({ task, onToggle, onDelete }) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  // Animation for task completion/uncompletion
  useEffect(() => {
    if (textRef.current) {
      if (task.completed) {
        gsap.to(textRef.current, {
          color: '#6a6a6a', // mid-gray but slightly lighter
          textDecoration: 'line-through',
          duration: 0.3,
          ease: 'power2.out',
        });
      } else {
        gsap.to(textRef.current, {
          color: '#F5F5F5', // off-white
          textDecoration: 'none',
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    }
  }, [task.completed]);

  // Animation for deletion
  const handleDelete = () => {
    if (itemRef.current) {
      gsap.to(itemRef.current, {
        x: '100%',
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => onDelete(task.id),
      });
    }
  };

  // Hover animations for the item
  const handleMouseEnter = () => {
    if (itemRef.current) {
      gsap.to(itemRef.current, {
        scale: 1.01,
        x: 5,
        backgroundColor: '#1a1a1a', // Darker on hover
        boxShadow: '0 5px 15px rgba(0,0,0,0.4)',
        duration: 0.2,
        ease: 'power1.out',
        overwrite: true,
      });
    }
  };

  const handleMouseLeave = () => {
    if (itemRef.current) {
      gsap.to(itemRef.current, {
        scale: 1,
        x: 0,
        backgroundColor: '#0A0A0A', // Back to deep-charcoal
        boxShadow: 'none',
        duration: 0.2,
        ease: 'power1.out',
        overwrite: true,
      });
    }
  };


  return (
    <div
      ref={itemRef}
      className="flex items-center justify-between p-4 md:p-6 bg-deep-charcoal border border-mid-gray/50 rounded-xl shadow-inner-soft transition-all duration-300 ease-expo-out transform-gpu will-change-transform
      interactive-element group hover:border-accent-purple cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor-text="Interact"
    >
      <div className="flex items-center flex-grow" onClick={() => onToggle(task.id)}>
        <button
          className={`w-6 h-6 md:w-8 md:h-8 rounded-full border-2 transition-all duration-300 ease-expo-out flex items-center justify-center flex-shrink-0 mr-4 interactive-element
            ${task.completed ? 'bg-accent-cyan border-accent-cyan' : 'border-mid-gray group-hover:border-accent-purple'}`}
          data-cursor-text={task.completed ? "Uncheck" : "Check"}
        >
          {task.completed && (
            <svg className="w-4 h-4 md:w-5 md:h-5 text-deep-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          )}
        </button>
        <span ref={textRef} className="text-off-white text-d-lg md:text-d-xl font-dm-sans leading-tight break-words will-change-transform">
          {task.text}
        </span>
      </div>
      <button
        onClick={handleDelete}
        className="ml-4 p-2 rounded-full text-mid-gray hover:text-neon-pink hover:bg-mid-gray/20 transition-colors duration-300 ease-expo-out interactive-element flex-shrink-0"
        data-cursor-text="Delete"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  );
};

export default ToDoItem;