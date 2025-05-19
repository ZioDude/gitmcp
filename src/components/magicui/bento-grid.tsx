"use client";

import { ArrowRightIcon } from "@radix-ui/react-icons";
import { ComponentPropsWithoutRef, ReactNode } from "react";

import { Button } from "@/components/ui/button"; // Assuming this is a shadcn/ui button
import { cn } from "@/lib/utils";

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string;
  className: string;
  background: ReactNode;
  Icon: React.ElementType;
  description: string;
  href: string;
  cta: string;
  // Allow children for more flexibility if needed in the future
  children?: ReactNode; 
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", // Adjusted for responsiveness
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  children, // Added children here
  ...props
}: BentoCardProps) => (
  <div
    key={name} // key should ideally be on the mapped component in page.tsx, but keeping it here if it's part of the original MagicUI structure
    className={cn(
      "group relative flex flex-col justify-between overflow-hidden rounded-xl",
      // Custom theme adjustments:
      "bg-black/50 border border-purple-700/60",
      "hover:border-purple-500 hover:bg-black/70 transition-all duration-300",
      "shadow-xl shadow-purple-900/20 hover:shadow-purple-700/40",
      className,
    )}
    {...props}
  >
    {background && <div className="absolute inset-0 opacity-80 group-hover:opacity-100 transition-opacity duration-300">{background}</div>}
    <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-2 p-6 transition-all duration-300 group-hover:-translate-y-4">
      {Icon && <Icon className="h-10 w-10 origin-left transform-gpu text-purple-300 transition-all duration-300 ease-in-out group-hover:scale-90 mb-2" />}
      <h3 className="text-2xl font-semibold text-purple-200">
        {name}
      </h3>
      <p className="max-w-lg text-purple-400/80 text-sm leading-relaxed">
        {description}
      </p>
    </div>

    {children && <div className="p-6 z-10">{children}</div>}

    <div
      className={cn(
        "z-10 flex w-full translate-y-8 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
      )}
    >
      <Button variant="ghost" asChild size="sm" className="pointer-events-auto bg-purple-600 hover:bg-purple-700 text-white rounded-lg group-hover:shadow-md group-hover:shadow-purple-500/50 text-sm px-4 py-2">
        <a href={href}>
          {cta}
          <ArrowRightIcon className="ms-2 h-4 w-4 rtl:rotate-180" />
        </a>
      </Button>
    </div>
    {/* Removed the extra overlay div as background is handled by the main div and the background prop */}
  </div>
);

export { BentoCard, BentoGrid }; 