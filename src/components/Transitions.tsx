import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

type TransitionType = 'fade' | 'slide' | 'grow' | 'zoom' | 'collapse';

interface TransitionsProps {
  children: React.ReactNode;
  show: boolean;
  type?: TransitionType;
  position?: 'top-left' | 'top' | 'top-right' | 'bottom-left' | 'bottom' | 'bottom-right';
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

const getAnimation = (type: TransitionType, direction: TransitionsProps['direction']) => {
  switch (type) {
    case 'fade':
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      };
    case 'slide': {
      const distance = 20;
      const dir = {
        up: { y: distance },
        down: { y: -distance },
        left: { x: distance },
        right: { x: -distance },
      }[direction || 'up'];
      return {
        initial: { ...dir, opacity: 0 },
        animate: { x: 0, y: 0, opacity: 1 },
        exit: { ...dir, opacity: 0 },
      };
    }
    case 'zoom':
    case 'grow':
      return {
        initial: { scale: 0.9, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 0.9, opacity: 0 },
      };
    case 'collapse':
      return {
        initial: { height: 0, opacity: 0 },
        animate: { height: 'auto', opacity: 1 },
        exit: { height: 0, opacity: 0 },
      };
    default:
      return {};
  }
};

export const Transitions = ({
  children,
  show,
  type = 'grow',
  position = 'top-left',
  direction = 'up',
  className,
}: TransitionsProps) => {
  const animation = getAnimation(type, direction);

  const originMap: Record<string, string> = {
    'top-left': 'origin-top-left',
    top: 'origin-top',
    'top-right': 'origin-top-right',
    'bottom-left': 'origin-bottom-left',
    bottom: 'origin-bottom',
    'bottom-right': 'origin-bottom-right',
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={cn(originMap[position], className)}
          initial={animation.initial}
          animate={animation.animate}
          exit={animation.exit}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
