"use client";

import { motion } from "motion/react";
import {
  ComponentPropsWithoutRef,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/utils";

export interface AnimatedGridPatternProps
  extends ComponentPropsWithoutRef<"svg"> {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  strokeDasharray?: any;
  numSquares?: number;
  maxOpacity?: number;
  duration?: number;
  repeatDelay?: number;
}

export function AnimatedGridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = 0,
  numSquares = 50,
  className,
  maxOpacity = 0.5,
  duration = 4,
  repeatDelay = 0.5, // This prop seems to be defined but not used in the provided code. Will keep it for now.
  ...props
}: AnimatedGridPatternProps) {
  const id = useId();
  const containerRef = useRef<SVGSVGElement>(null); // Added type for useRef
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  // Memoize generateSquares function if it doesn't depend on frequently changing props not listed in its dependencies
  // For now, assuming it's fine as is, but consider for optimization if performance issues arise.
  const generateSquares = (count: number) => {
    // Ensure getPos is defined or imported if it's from elsewhere, or define it locally.
    // For now, defining a simple getPos, adjust if it needs access to dimensions directly before set.
    const getPos = () => [
      Math.floor((Math.random() * (dimensions.width || width * 10)) / width), // Fallback for initial render
      Math.floor((Math.random() * (dimensions.height || height * 10)) / height), // Fallback for initial render
    ];
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      pos: getPos(),
    }));
  };

  const [squares, setSquares] = useState(() => generateSquares(numSquares));

  // Function to update a single square's position
  const updateSquarePosition = (squareId: number) => { // Changed id to squareId to avoid conflict with useId
    const getPos = () => [
        Math.floor((Math.random() * dimensions.width) / width),
        Math.floor((Math.random() * dimensions.height) / height),
      ];
    setSquares((currentSquares) =>
      currentSquares.map((sq) =>
        sq.id === squareId
          ? {
              ...sq,
              pos: getPos(),
            }
          : sq,
      ),
    );
  };

  // Update squares to animate in
  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      setSquares(generateSquares(numSquares));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dimensions, numSquares]); // Removed generateSquares from deps as it's redefined inside or should be memoized

  // Resize observer to update container dimensions
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, [containerRef]);

  return (
    <svg
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30 stroke-gray-400/30",
        className,
      )}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill="none"
            strokeDasharray={strokeDasharray}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
      <svg x={x} y={y} className="overflow-visible">
        {squares.map(({ pos: [sqX, sqY], id: squareId }, index) => ( // Renamed x,y in destructuring to avoid conflict
          <motion.rect
            initial={{ opacity: 0 }}
            animate={{ opacity: maxOpacity }}
            transition={{
              duration,
              repeat: 1, // Ensures it animates out as well
              delay: index * 0.1, // Stagger animation
              repeatType: "reverse",
            }}
            onAnimationComplete={() => updateSquarePosition(squareId)} // Pass the correct id
            key={`${sqX}-${sqY}-${index}-${squareId}`} // Ensure key is unique
            width={width - 1}
            height={height - 1}
            x={sqX * width + 1}
            y={sqY * height + 1}
            fill="currentColor"
            strokeWidth="0"
          />
        ))}
      </svg>
    </svg>
  );
}

export default AnimatedGridPattern; // Added default export 