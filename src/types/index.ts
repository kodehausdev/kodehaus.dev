
"use client"

import type { LucideIcon } from "lucide-react";

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
  icon?: LucideIcon; 
  label?: string;
};

export type Project = {
  title: string;
  description: string;
  stack: string[];
  link?: string;
  githubLink?: string;
  iconName?: string; 
  image?: string;
  imageAiHint?: string;
};

export type LearningItem = {
  title: string;
  description: string;
  icon?: LucideIcon; 
};

export type TechRadarStatus = 'Actively Using' | 'Experimenting With' | 'Evaluating';

export type TechRadarItem = {
  name: string;
  status: TechRadarStatus;
  description?: string;
  icon?: LucideIcon; 
};
