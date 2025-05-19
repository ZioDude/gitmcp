"use client";

import { cn } from "@/lib/utils";
import React from 'react';

// Placeholder for Icons - replace with actual icons later (e.g., from lucide-react)
const PlaceholderIcon = ({ className }: { className?: string }) => (
  <svg className={cn("h-8 w-8 text-purple-400", className)} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

export default PlaceholderIcon; 