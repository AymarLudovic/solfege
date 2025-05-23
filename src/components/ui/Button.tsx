import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, variant = 'primary', className }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    gsap.set(button, { willChange: 'transform, background-color, color' });

    const hoverIn = () => {
      gsap.to(button, {
        scale: 1.05,
        y: -5,
        duration: 0.3,
        ease: 'back.out(2)',
        overwrite: 'auto'
      });
      if (variant === 'primary' || variant === 'secondary') {
        gsap.to(button, {
          backgroundColor: variant === 'primary' ? 'rgb(0, 255, 232)' : 'rgb(139, 92, 246)', // Accent color on hover
          color: '#0A0A0A',
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      }
    };

    const hoverOut = () => {
      gsap.to(button, {
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto'
      });
      if (variant === 'primary' || variant === 'secondary') {
        gsap.to(button, {
          backgroundColor: variant === 'primary' ? '#8B5CF6' : '#00FFE8', // Original color
          color: '#F0F0F0',
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      }
    };

    button.addEventListener('mouseenter', hoverIn);
    button.addEventListener('mouseleave', hoverOut);

    return () => {
      button.removeEventListener('mouseenter', hoverIn);
      button.removeEventListener('mouseleave', hoverOut);
      gsap.killTweensOf(button);
    };
  }, [variant]);

  const baseClasses = "py-3 px-8 rounded-full font-spacegrotesk text-lg font-bold transition-colors duration-300 relative overflow-hidden group";
  let variantClasses = "";

  switch (variant) {
    case 'primary':
      variantClasses = "bg-accent-purple text-light-contrast hover:bg-light-contrast hover:text-dark-deep";
      break;
    case 'secondary':
      variantClasses = "bg-accent-cyan text-dark-deep hover:bg-accent-purple hover:text-light-contrast";
      break;
    case 'outline':
      variantClasses = "bg-transparent border-2 border-accent-pink text-accent-pink hover:bg-accent-pink hover:text-dark-deep";
      break;
    default:
      variantClasses = "bg-accent-purple text-light-contrast";
  }

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${className || ''} interactive-element`}
    >
      <span className="relative z-10">{children}</span>
      {/* Subtle background overlay for hover effect */}
      <span className="absolute inset-0 bg-light-contrast opacity-0 group-hover:opacity-10 transition-opacity duration-300 z-0"></span>
    </button>
  );
};

export default Button;