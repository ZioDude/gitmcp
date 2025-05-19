"use client";

import React, { ReactElement, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react"; // Assuming motion/react is used, adjust if framer-motion

// Interface for the items that AnimatedList will render
interface ListItem {
  id: string | number; // Each item needs a unique id for key prop
  component: ReactElement; // The actual React component to render
}

interface AnimatedListProps {
  items: ListItem[]; // Expect an array of objects with id and component
  animationType?: "fade" | "slide"; // Example animation types
  delay?: number;
  duration?: number;
  stagger?: number; // Time between each item's animation
  className?: string;
  initial?: object;
  animate?: object;
  exit?: object;
  onAnimationComplete?: () => void;
  startOnView?: boolean;
}

const AnimatedList = React.forwardRef<HTMLDivElement, AnimatedListProps>(
  (
    {
      items,
      animationType = "fade",
      delay = 0,
      duration = 0.4,
      stagger = 0.1,
      className,
      initial: initialProps,
      animate: animateProps,
      exit: exitProps,
      onAnimationComplete,
      startOnView = true,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(!startOnView);
    const internalRef = React.useRef<HTMLDivElement>(null);
    const combinedRef = ref || internalRef;

    useEffect(() => {
      if (startOnView) {
        const currentReff = (combinedRef as React.RefObject<HTMLDivElement>)?.current;
        if (!currentReff) return;

        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              observer.unobserve(currentReff);
            }
          },
          { threshold: 0.1 }
        );

        observer.observe(currentReff);
        return () => {
            if (currentReff) {
                observer.unobserve(currentReff);
            }
        }
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startOnView, combinedRef, delay]);

    const animations = {
      fade: {
        initial: { opacity: 0, ...initialProps },
        animate: { opacity: 1, ...animateProps },
        exit: { opacity: 0, ...exitProps },
      },
      slide: {
        initial: { opacity: 0, y: 20, ...initialProps },
        animate: { opacity: 1, y: 0, ...animateProps },
        exit: { opacity: 0, y: -20, ...exitProps },
      },
    };

    const selectedAnimation = animations[animationType] || animations.fade;

    return (
      <div ref={combinedRef} className={cn("relative", className)} {...props}>
        <AnimatePresence>
          {isVisible &&
            items.map((item, i) => (
              <motion.div
                key={item.id}
                initial={selectedAnimation.initial}
                animate={selectedAnimation.animate}
                exit={selectedAnimation.exit}
                transition={{
                  duration,
                  delay: delay + i * stagger,
                  ease: "easeInOut",
                }}
                onAnimationComplete={onAnimationComplete}
                className="mb-2" // Added some margin between items
              >
                {item.component}
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    );
  }
);

AnimatedList.displayName = "AnimatedList";

// The Notification component and demo setup (AnimatedListDemo) from your magicuicodes.txt
// will be kept separate. This AnimatedList is more generic.

// If you intend to use the demo structure directly, we would need to adjust this file or
// create a new one like `animated-list-demo.tsx`

export { AnimatedList }; // Exporting named export
export default AnimatedList; // Also default for convenience 