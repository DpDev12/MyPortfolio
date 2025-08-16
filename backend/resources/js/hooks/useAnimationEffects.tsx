// hooks/useAnimationEffects.ts - Updated with scroll reset capability
import { useState, useEffect, useRef } from 'react';

// TypeScript Interfaces (same as before)
export interface TypewriterOptions {
  texts?: string[];
  typeSpeed?: number;
  backSpeed?: number;
  pauseTime?: number;
  loop?: boolean;
  startDelay?: number;
}

export interface TypewriterResult {
  text: string;
  isComplete: boolean;
}

export interface FadeInOptions {
  duration?: number;
  delay?: number;
  trigger?: boolean;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export interface FadeInResult {
  style: React.CSSProperties;
  isVisible: boolean;
}

export interface CountUpOptions {
  start?: number;
  end: number;
  duration?: number;
  trigger?: boolean;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}

export interface InViewOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export type InViewResult = [React.RefObject<HTMLDivElement>, boolean];

// UPDATED FADE IN HOOK - with reset capability
export const useFadeIn = ({ 
  duration = 1000, 
  delay = 0, 
  trigger = true,
  direction = 'up'
}: FadeInOptions): FadeInResult => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (trigger && !hasStarted) {
      // Start animation
      timeoutRef.current = setTimeout(() => {
        setIsVisible(true);
        setHasStarted(true);
      }, delay);
    } else if (!trigger && hasStarted) {
      // Reset animation when trigger becomes false
      setIsVisible(false);
      setHasStarted(false);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [trigger, delay, hasStarted]);

  const getTransform = (): string => {
    if (!isVisible) {
      switch (direction) {
        case 'up': return 'translateY(30px)';
        case 'down': return 'translateY(-30px)';
        case 'left': return 'translateX(30px)';
        case 'right': return 'translateX(-30px)';
        default: return 'none';
      }
    }
    return 'none';
  };

  const style: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: getTransform(),
    transition: `all ${duration}ms ease-out`
  };

  return { style, isVisible };
};

// UPDATED BOUNCE ONCE HOOK - with reset capability
export const useBounceOnce = (
  delay: number = 0,
  duration: number = 0,
  trigger: boolean = true
): { style: React.CSSProperties; isVisible: boolean } => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (trigger && !hasStarted) {
      timeoutRef.current = setTimeout(() => {
        setIsVisible(true);
        setHasStarted(true);
      }, delay);
    } else if (!trigger && hasStarted) {
      // Reset animation when trigger becomes false
      setIsVisible(false);
      setHasStarted(false);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [trigger, delay, hasStarted]);

  const style: React.CSSProperties = {
    transform: isVisible ? 'scale(1)' : 'scale(0)',
    opacity: isVisible ? 1 : 0,
    transition: 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  };

  return { style, isVisible };
};

// UPDATED SLIDE IN HOOK - with reset capability
export const useSlideIn = (
  direction: 'left' | 'right' | 'up' | 'down' = 'left',
  duration: number = 500,
  delay: number = 0,
  trigger: boolean = true
): { style: React.CSSProperties; isVisible: boolean } => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (trigger && !hasStarted) {
      timeoutRef.current = setTimeout(() => {
        setIsVisible(true);
        setHasStarted(true);
      }, delay);
    } else if (!trigger && hasStarted) {
      setIsVisible(false);
      setHasStarted(false);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [trigger, delay, hasStarted]);

  const getInitialTransform = (): string => {
    switch (direction) {
      case 'left': return 'translateX(-100%)';
      case 'right': return 'translateX(100%)';
      case 'up': return 'translateY(-100%)';
      case 'down': return 'translateY(100%)';
      default: return 'translateX(-100%)';
    }
  };

  const style: React.CSSProperties = {
    transform: isVisible ? 'translate(0)' : getInitialTransform(),
    opacity: isVisible ? 1 : 0,
    transition: `all ${duration}ms ease-out`
  };

  return { style, isVisible };
};

// UPDATED BREATHE ONCE HOOK - with reset capability
export const useBreatheOnce = (
  duration: number = 1500,
  trigger: boolean = true
): { style: React.CSSProperties; isAnimating: boolean } => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (trigger && !hasStarted) {
      setIsAnimating(true);
      setHasStarted(true);
      timeoutRef.current = setTimeout(() => setIsAnimating(false), duration);
    } else if (!trigger && hasStarted) {
      setIsAnimating(false);
      setHasStarted(false);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [trigger, duration, hasStarted]);

  const style: React.CSSProperties = isAnimating
    ? { animation: `breatheOnce ${duration}ms ease-out forwards` }
    : {};

  return { style, isAnimating };
};

// UPDATED BOUNCE IN HOOK - with reset capability
export const useBounceIn = (
  delay: number = 0,
  trigger: boolean = true
): { style: React.CSSProperties; isVisible: boolean } => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (trigger && !hasStarted) {
      timeoutRef.current = setTimeout(() => {
        setIsVisible(true);
        setHasStarted(true);
      }, delay);
    } else if (!trigger && hasStarted) {
      setIsVisible(false);
      setHasStarted(false);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [trigger, delay, hasStarted]);

  const style: React.CSSProperties = {
    transform: isVisible ? 'scale(1)' : 'scale(0)',
    opacity: isVisible ? 1 : 0,
    transition: 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  };

  return { style, isVisible };
};

//new interface
export interface DropOptions {
  direction?: "left" | "right" | "up" | "down" | "drop";
  duration?: number;
  delay?: number;
  trigger?: boolean;
  withBounce?: boolean;
}
// UPDATED DROP HOOK - with reset capability
export const useDrop = (
  directionOrOptions: "left" | "right" | "up" | "down" | "drop" = "left",
  duration: number = 500,
  delay: number = 0,
  trigger: boolean = true,
  withBounce: boolean = true
): { style: React.CSSProperties; isVisible: boolean } => {

    // Check if first parameter is an object (new style) or string (old style)
  const isObjectStyle = typeof directionOrOptions === 'object';
  
  // Extract options based on parameter style
  const options: Required<DropOptions> = isObjectStyle 
    ? {
        direction: 'drop',
        duration: 800,
        delay: 0,
        trigger: true,
        withBounce: true,
        ...directionOrOptions as DropOptions
      }
    : {
        direction: directionOrOptions as "left" | "right" | "up" | "down" | "drop",
        duration,
        delay,
        trigger,
        withBounce
      };

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

//   useEffect(() => {
//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current);
//     }

//     if (trigger && !hasStarted) {
//       timeoutRef.current = setTimeout(() => {
//         setIsVisible(true);
//         setHasStarted(true);
//       }, delay);
//     } else if (!trigger && hasStarted) {
//       setIsVisible(false);
//       setHasStarted(false);
//     }

//     return () => {
//       if (timeoutRef.current) {
//         clearTimeout(timeoutRef.current);
//       }
//     };
//   }, [trigger, delay, hasStarted]);

//   const getInitialTransform = (): string => {
//     switch (direction) {
//       case "left": return "translateX(-100%)";
//       case "right": return "translateX(100%)";
//       case "up": return "translateY(-100%)";
//       case "down": return "translateY(100%)";
//       case "drop": return "translateY(-200px)";
//       default: return "translateX(-100%)";
//     }
//   };

//   const style: React.CSSProperties = {
//     transform: isVisible ? "translate(0)" : getInitialTransform(),
//     opacity: isVisible ? 1 : 0,
//     transition: `all ${duration}ms ease-out`,
//     animation: isVisible && withBounce ? "bounceVibrate 0.6s ease-out" : "none",
//   };

useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (options.trigger && !hasStarted) {
      timeoutRef.current = setTimeout(() => {
        setIsVisible(true);
        setHasStarted(true);
      }, options.delay);
    } else if (!options.trigger && hasStarted) {
      setIsVisible(false);
      setHasStarted(false);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [options.trigger, options.delay, hasStarted]);

  const getAnimation = (): string => {
    if (!isVisible) return 'none';
    
    if (options.direction === 'drop') {
      return options.withBounce 
        ? `fall ${options.duration}ms ease-out forwards, bounceVibrate 0.6s ease-out ${options.duration}ms forwards`
        : `fall ${options.duration}ms ease-out forwards`;
    } else {
      const animationName = options.direction === 'left' ? 'slideInLeft' : 
                           options.direction === 'right' ? 'slideInRight' : 
                           options.direction === 'up' ? 'slideInUp' : 'slideInDown';
      return options.withBounce 
        ? `${animationName} ${options.duration}ms ease-out forwards, bounceVibrate 0.6s ease-out ${options.duration}ms forwards`
        : `${animationName} ${options.duration}ms ease-out forwards`;
    }
  };

  const style: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    animation: getAnimation(),
    animationFillMode: 'forwards'
  };

  return { style, isVisible };
};

// UPDATED COUNT UP HOOK - with reset capability
export const useCountUp = ({ 
  start = 0, 
  end, 
  duration = 2000, 
  trigger = true,
  decimals = 0,
  prefix = '',
  suffix = ''
}: CountUpOptions): string => {
  const [count, setCount] = useState<number>(start);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);

  useEffect(() => {
    if (trigger && !hasStarted) {
      setIsAnimating(true);
      setHasStarted(true);
      const startTime = Date.now();
      const startValue = start;
      const endValue = end;
      const totalChange = endValue - startValue;

      const animateCount = (): void => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = startValue + (totalChange * easeOut);
        
        setCount(Number(currentValue.toFixed(decimals)));
        
        if (progress < 1) {
          requestAnimationFrame(animateCount);
        } else {
          setIsAnimating(false);
        }
      };

      requestAnimationFrame(animateCount);
    } else if (!trigger && hasStarted) {
      // Reset when trigger becomes false
      setCount(start);
      setIsAnimating(false);
      setHasStarted(false);
    }
  }, [start, end, duration, trigger, decimals, hasStarted]);

  return `${prefix}${count}${suffix}`;
};

// Keep existing hooks that don't need modification
export const useTypewriter = ({ 
  texts = ['Default text'], 
  typeSpeed = 100, 
  backSpeed = 50, 
  pauseTime = 2000,
  loop = true,
  startDelay = 0
}: TypewriterOptions): TypewriterResult => {
  const [displayText, setDisplayText] = useState<string>('');
  const [textIndex, setTextIndex] = useState<number>(0);
  const [charIndex, setCharIndex] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isStarted, setIsStarted] = useState<boolean>(false);

  useEffect(() => {
    if (startDelay > 0 && !isStarted) {
      const delayTimer = setTimeout(() => setIsStarted(true), startDelay);
      return () => clearTimeout(delayTimer);
    } else if (startDelay === 0) {
      setIsStarted(true);
    }
  }, [startDelay, isStarted]);

  useEffect(() => {
    if (!isStarted) return;

    const currentText = texts[textIndex];
    
    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentText.length) {
          setDisplayText(currentText.slice(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          if (!loop && textIndex === texts.length - 1) return;
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (charIndex > 0) {
          setDisplayText(currentText.slice(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setTextIndex((textIndex + 1) % texts.length);
        }
      }
    }, isDeleting ? backSpeed : typeSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, textIndex, texts, typeSpeed, backSpeed, pauseTime, loop, isStarted]);

  const isComplete = !loop && textIndex === texts.length - 1 && charIndex === texts[textIndex]?.length;
  
  return { text: displayText, isComplete };
};

export const useInView = ({ 
  threshold = 0.1, 
  rootMargin = '0px',
  triggerOnce = true 
}: InViewOptions = {}): InViewResult => {
  const [isInView, setIsInView] = useState<boolean>(false);
  const [hasTriggered, setHasTriggered] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!triggerOnce || !hasTriggered)) {
          setIsInView(true);
          if (triggerOnce) setHasTriggered(true);
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, triggerOnce, hasTriggered]);

  return [ref, isInView];
};