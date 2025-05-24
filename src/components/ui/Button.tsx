import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  variant?: 'primary' | 'outline' | 'ghost';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, variant = 'primary', className = '' }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const hoverTween = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (buttonRef.current) {
      if (variant === 'primary') {
        hoverTween.current = gsap.to(buttonRef.current, {
          scale: 1.05,
          boxShadow: '0 0 20px rgba(78, 231, 233, 0.4), 0 0 40px rgba(142, 45, 226, 0.3)',
          backgroundColor: '#8E2DE2',
          ease: 'power2.out',
          paused: true,
          duration: 0.3,
          overwrite: true,
        });
      } else if (variant === 'outline') {
        hoverTween.current = gsap.to(buttonRef.current, {
          borderColor: '#4EE7E9',
          color: '#4EE7E9',
          scale: 1.02,
          boxShadow: '0 0 15px rgba(78, 231, 233, 0.3)',
          ease: 'power2.out',
          paused: true,
          duration: 0.3,
          overwrite: true,
        });
      }
    }
  }, [variant]);

  const handleMouseEnter = () => {
    hoverTween.current?.play();
  };

  const handleMouseLeave = () => {
    hoverTween.current?.reverse();
  };

  const baseClasses = "font-poppins font-medium text-d-lg md:text-d-xl px-10 py-4 rounded-full transition-all duration-300 ease-expo-out interactive-element transform-gpu will-change-transform";
  let variantClasses = '';

  switch (variant) {
    case 'primary':
      variantClasses = 'bg-accent-purple text-off-white hover:bg-gradient-to-r from-accent-purple to-accent-cyan shadow-soft-glow';
      break;
    case 'outline':
      variantClasses = 'bg-transparent text-off-white border-2 border-mid-gray hover:border-accent-cyan hover:text-accent-cyan';
      break;
    case 'ghost':
      variantClasses = 'bg-transparent text-off-white hover:bg-off-white/10';
      break;
  }

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor-text="Click"
    >
      {text}
    </button>
  );
};

export default Button;