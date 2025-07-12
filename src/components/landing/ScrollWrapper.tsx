import React, { ReactNode } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface ScrollWrapperProps {
  children: ReactNode;
  className?: string;
  animationType?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale';
  delay?: number;
  threshold?: number;
}

export const ScrollWrapper: React.FC<ScrollWrapperProps> = ({
  children,
  className = '',
  animationType = 'fadeIn',
  delay = 0,
  threshold = 0.1,
}) => {
  const { ref, isVisible } = useScrollAnimation(threshold);

  const getAnimationClass = () => {
    const baseClass = 'transition-all duration-1000 ease-out';

    if (!isVisible) {
      switch (animationType) {
        case 'fadeIn':
          return `${baseClass} opacity-0 transform`;
        case 'slideUp':
          return `${baseClass} opacity-0 transform translate-y-16`;
        case 'slideLeft':
          return `${baseClass} opacity-0 transform translate-x-16`;
        case 'slideRight':
          return `${baseClass} opacity-0 transform -translate-x-16`;
        case 'scale':
          return `${baseClass} opacity-0 transform scale-90`;
        default:
          return `${baseClass} opacity-0 transform`;
      }
    }

    return `${baseClass} opacity-100 transform translate-y-0 translate-x-0 scale-100`;
  };

  return (
    <div
      ref={ref}
      className={`${getAnimationClass()} ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </div>
  );
};
