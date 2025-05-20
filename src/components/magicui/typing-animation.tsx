"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react"; // Removed MotionProps
import * as React from "react";
import {
  useEffect,
  useRef,
  useState,
} from "react";

// Define a type for components that can receive a ref and are valid for React.ElementRef
// This version excludes JSX.IntrinsicElements to avoid namespace issues.
type RefTargetableMotionComponent =
  | React.ComponentClass<object>
  | React.ForwardRefExoticComponent<object>
  | (typeof motion.div); // Explicitly include motion.div or similar as a base

// Props specific to TypingAnimation's functionality
interface TypingAnimationOwnProps<C extends RefTargetableMotionComponent = typeof motion.div> {
  text: string;
  className?: string;
  duration?: number;
  delay?: number;
  as?: C; // The component to render as, e.g., motion.div, motion.p
  startOnView?: boolean;
}

// Props to be spread to the underlying motion component, excluding those handled by TypingAnimation
type MotionSpreadProps<C extends RefTargetableMotionComponent> = Omit<React.ComponentPropsWithoutRef<C>, "children" | "as">;

// Combined props for the TypingAnimation component
type TypingAnimationProps<C extends RefTargetableMotionComponent = typeof motion.div> =
  TypingAnimationOwnProps<C> & MotionSpreadProps<C>;

export function TypingAnimation<C extends RefTargetableMotionComponent = typeof motion.div>({ // C defaults to motion.div
  text,
  className,
  duration = 50,
  delay = 0,
  as, // User-provided 'as' prop of type C or undefined
  startOnView = false,
  ...motionProps // These are MotionSpreadProps
}: TypingAnimationProps<C>): React.ReactElement {
  const [displayedText, setDisplayedText] = useState<string>("");
  const [started, setStarted] = useState(!startOnView);

  // Determine the actual component type to use. Default to motion.div.
  const ActualAsComponent = (as || motion.div) as C;

  // Ref type is React.ElementRef<C>
  const elementRef = useRef<React.ElementRef<C>>(null);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let localObserver: IntersectionObserver | undefined;

    if (startOnView) {
      const currentElement = elementRef.current;
      // Ensure currentElement exists and is an instance of Element for IntersectionObserver
      if (currentElement && currentElement instanceof Element) {
        localObserver = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              timeoutId = setTimeout(() => {
                setStarted(true);
              }, delay);
              localObserver?.disconnect(); // Disconnect after intersection
            }
          },
          { threshold: 0.1 },
        );
        localObserver.observe(currentElement);
      } else if (currentElement) {
        // Fallback: if currentElement exists but is not an Element (e.g. custom component ref not forwarding to DOM)
        // This case might indicate a setup issue, but we can try to start after delay.
        // console.warn("TypingAnimation: 'as' prop did not yield a DOM Element for IntersectionObserver. Starting after delay.");
        timeoutId = setTimeout(() => setStarted(true), delay);
      }
      // If currentElement is null, animation won't start via observer.
    } else { // Not startOnView
      timeoutId = setTimeout(() => {
        setStarted(true);
      }, delay);
    }

    return () => {
      localObserver?.disconnect();
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [delay, startOnView, elementRef]); // Added elementRef as a dependency

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
  // ActualAsComponent is now the motion component itself.
  const MotionComponentToRender = ActualAsComponent;

  return (
    <MotionComponentToRender
      ref={elementRef} // Now correctly typed, no 'as any' needed
      className={cn(className)}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {...motionProps as any} // Cast to any, acknowledging type complexity
    >
      {displayedText}
      {/* Invisible text for layout calculation - helps prevent layout shifts as text types out */}
      <span style={{ visibility: 'hidden', position: 'absolute', top: '-9999px', left: '-9999px' }}>{text}</span>
    </MotionComponentToRender>
  );
}

export default TypingAnimation; 