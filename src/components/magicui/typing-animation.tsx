"use client";

import { cn } from "@/lib/utils";
import { motion, MotionProps } from "motion/react";
import {
  useEffect,
  useRef,
  useState,
  ReactElement,
  ElementType,
} from "react";

// Props specific to TypingAnimation's functionality
interface TypingAnimationOwnProps<C extends ElementType = "div"> {
  text: string;
  className?: string;
  duration?: number;
  delay?: number;
  as?: C; // The component to render as, e.g., "div", "p"
  startOnView?: boolean;
}

// Props to be spread to the underlying motion component, excluding those handled by TypingAnimation
type MotionSpreadProps = Omit<MotionProps, "children" | "as" | "ref">;

// Combined props for the TypingAnimation component
type TypingAnimationProps<C extends ElementType = "div"> =
  TypingAnimationOwnProps<C> & MotionSpreadProps;

export function TypingAnimation<C extends ElementType = "div">({ // C defaults to "div"
  text,
  className,
  duration = 50,
  delay = 0,
  as, // User-provided 'as' prop of type C or undefined
  startOnView = false,
  ...motionProps // These are MotionSpreadProps
}: TypingAnimationProps<C>): ReactElement {
  const [displayedText, setDisplayedText] = useState<string>("");
  const [started, setStarted] = useState(!startOnView);

  // Determine the actual component type to use. Default to "div".
  // Type assertion ensures ActualAsComponent is compatible with C.
  const ActualAsComponent = (as || "div") as C;

  // Ref type is React.ElementRef<C>, e.g., RefObject<HTMLDivElement> if C is "div"
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
  const MotionAsComponent =
    typeof ActualAsComponent === "string" &&
    Object.prototype.hasOwnProperty.call(motion, ActualAsComponent)
      ? motion[ActualAsComponent as keyof typeof motion]
      : motion.div; // Fallback to motion.div

  return (
    <MotionAsComponent
      ref={elementRef} // Now correctly typed, no 'as any' needed
      className={cn(className)}
      {...motionProps} // Spread the filtered MotionProps
    >
      {displayedText}
      {/* Invisible text for layout calculation - helps prevent layout shifts as text types out */}
      <span style={{ visibility: 'hidden', position: 'absolute', top: '-9999px', left: '-9999px' }}>{text}</span>
    </MotionAsComponent>
  );
}

export default TypingAnimation; 