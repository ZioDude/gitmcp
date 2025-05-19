"use client";

import { cn } from "@/lib/utils";
import { motion, MotionProps } from "motion/react";
import { useEffect, useRef, useState, ReactElement, ElementType } from "react";

interface TypingAnimationProps extends Omit<MotionProps, 'children'> {
  text: string;
  className?: string;
  duration?: number;
  delay?: number;
  as?: ElementType;
  startOnView?: boolean;
}

export function TypingAnimation({
  text,
  className,
  duration = 50,
  delay = 0,
  as: Component = "div",
  startOnView = false,
  ...props
}: TypingAnimationProps): ReactElement {
  const MotionComponent = motion[Component as keyof typeof motion] || motion.div;

  const [displayedText, setDisplayedText] = useState<string>("");
  const [started, setStarted] = useState(!startOnView);
  const elementRef = useRef<HTMLDivElement>(null);

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

      if (elementRef.current) {
        observer.observe(elementRef.current);
      }
      return () => observer.disconnect();
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

  return (
    <MotionComponent
      ref={elementRef}
      className={cn(
        className,
      )}
      {...props}
    >
      {displayedText}
      <span style={{ visibility: 'hidden', position: 'absolute', pointerEvents: 'none' }}>{text}</span>
    </MotionComponent>
  );
}

export default TypingAnimation; 