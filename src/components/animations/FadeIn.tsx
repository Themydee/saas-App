
import React, { useState, useEffect, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
}

const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 500,
  className,
  direction = 'up',
  distance = 20
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const getTransformValue = () => {
    if (direction === 'none') return 'translate(0, 0)';
    if (direction === 'up') return `translateY(${isVisible ? 0 : distance}px)`;
    if (direction === 'down') return `translateY(${isVisible ? 0 : -distance}px)`;
    if (direction === 'left') return `translateX(${isVisible ? 0 : distance}px)`;
    if (direction === 'right') return `translateX(${isVisible ? 0 : -distance}px)`;
    return 'translate(0, 0)';
  };

  const style = {
    opacity: isVisible ? 1 : 0,
    transform: getTransformValue(),
    transition: `opacity ${duration}ms, transform ${duration}ms`,
  };

  return (
    <div className={cn(className)} style={style}>
      {children}
    </div>
  );
};

export default FadeIn;
