import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface ToDoInputProps {
  onAddTask: (text: string) => void;
}

const ToDoInput: React.FC<ToDoInputProps> = ({ onAddTask }) => {
  const [taskText, setTaskText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskText.trim()) {
      onAddTask(taskText.trim());
      setTaskText('');
      // Animate input clear
      gsap.to(inputRef.current, { x: -10, duration: 0.1, ease: 'power1.out', onComplete: () => gsap.to(inputRef.current, { x: 0, duration: 0.3, ease: 'back.out(1.7)' }) });
    }
  };

  // Button hover animation
  useEffect(() => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 1.05,
        backgroundColor: '#4EE7E9',
        color: '#0A0A0A',
        ease: 'power2.out',
        paused: true,
        duration: 0.3,
        overwrite: true,
      }).revertOnRelease = true;

      buttonRef.current.addEventListener('mouseenter', () => (gsap.getTween(buttonRef.current!) as any).play());
      buttonRef.current.addEventListener('mouseleave', () => (gsap.getTween(buttonRef.current!) as any).reverse());
    }
  }, []);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl bg-dark-gray shadow-inner-soft border border-mid-gray/50 transform-gpu will-change-transform">
      <input
        ref={inputRef}
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Add a new elite task..."
        className="flex-grow bg-transparent text-off-white text-d-lg font-dm-sans placeholder-mid-gray px-4 py-3 outline-none border-b-2 border-mid-gray focus:border-accent-cyan transition-colors duration-300 ease-expo-out interactive-element will-change-transform"
        data-cursor-text="Type"
      />
      <button
        ref={buttonRef}
        type="submit"
        className="flex-shrink-0 bg-accent-purple text-off-white text-d-lg font-poppins font-semibold px-8 py-3 rounded-full transition-all duration-300 ease-expo-out interactive-element transform-gpu will-change-transform"
        data-cursor-text="Add"
      >
        Add Task
      </button>
    </form>
  );
};

export default ToDoInput;