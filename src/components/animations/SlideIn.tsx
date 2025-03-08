
import React, { useState, useEffect, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SlideInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  direction?: 'left' | 'right' | 'top' | 'bottom';
  distance?: number;
  staggerIndex?: number;
  staggerDelay?: number;
}

const SlideIn: React.FC<SlideInProps> = ({
  children,
  delay = 0,
  duration = 500,
  className,
  direction = 'left',
  distance = 50,
  staggerIndex = 0,
  staggerDelay = 100
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay + staggerIndex * staggerDelay);

    return () => clearTimeout(timer);
  }, [delay, staggerIndex, staggerDelay]);

  const getInitialTransform = () => {
    switch (direction) {
      case 'left': return `translateX(-${distance}px)`;
      case 'right': return `translateX(${distance}px)`;
      case 'top': return `translateY(-${distance}px)`;
      case 'bottom': return `translateY(${distance}px)`;
      default: return `translateX(-${distance}px)`;
    }
  };

  const style = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translate(0, 0)' : getInitialTransform(),
    transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
  };

  return (
    <div className={cn(className)} style={style}>
      {children}
    </div>
  );
};

export default SlideIn;
