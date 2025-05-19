"use client";

import { cn } from "@/lib/utils";
import { motion, MotionProps } from "motion/react";
import { useEffect, useRef, useState, ReactElement, ElementType } from "react";

interface TypingAnimationProps extends Omit<MotionProps, 'children'> {
  text: string;
  className?: string;
  duration?: number;
  delay?: number;
  as?: ElementType; // e.g., 'div', 'p', 'h1', etc.
  startOnView?: boolean;
}

export function TypingAnimation({
  text,
  className,
  duration = 50,
  delay = 0,
  as: AsComponent = "div",
  startOnView = false,
  ...props // These are the MotionProps (excluding children)
}: TypingAnimationProps): ReactElement {
  const [displayedText, setDisplayedText] = useState<string>("");
  const [started, setStarted] = useState(!startOnView);
  const elementRef = useRef<HTMLElement>(null); // Generic HTMLElement for the ref

  useEffect(() => {
    if (startOnView) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            const startTimeout = setTimeout(() => {
              setStarted(true);
            }, delay);
            observer.disconnect();
            return () => clearTimeout(startTimeout);
          }
        },
        { threshold: 0.1 },
      );

      const currentElement = elementRef.current;
      if (currentElement) {
        observer.observe(currentElement);
      }
      return () => {
        if (currentElement) {
          observer.unobserve(currentElement);
        }
      };
    } else {
        const startTimeout = setTimeout(() => {
            setStarted(true);
        }, delay);
        return () => clearTimeout(startTimeout);
    }
  }, [delay, startOnView]);

  useEffect(() => {
    if (!started || !text) return;

    setDisplayedText("");
    let i = 0;
    const typingEffect = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingEffect);
      }
    }, duration);

    return () => {
      clearInterval(typingEffect);
    };
  }, [text, duration, started]);

  // Dynamically select the motion component based on AsComponent
  // Fallback to motion.div if AsComponent is not a string or a recognized HTML tag string
  const MotionAsComponent =
    typeof AsComponent === "string" && (motion as any)[AsComponent]
      ? (motion as any)[AsComponent]
      : motion.div;

  return (
    <MotionAsComponent
      ref={elementRef} 
      className={cn(className)} // Apply Tailwind classes
      {...props} // Spread the rest of the MotionProps
    >
      {displayedText}
      {/* Invisible text for layout calculation - helps prevent layout shifts as text types out */}
      <span style={{ visibility: 'hidden', position: 'absolute', top: '-9999px', left: '-9999px' }}>{text}</span>
    </MotionAsComponent>
  );
}

export default TypingAnimation; 