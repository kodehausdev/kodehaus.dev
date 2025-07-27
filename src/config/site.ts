
import type { NavItem, Project, LearningItem, TechRadarItem, TechRadarStatus } from "@/types";
import {
  Github, Twitter, Mail,
  BotMessageSquare, Wand2, Beef, Layers, BookOpen, BrainCircuit, Code, ShieldCheck, Timer, Landmark, Palette, FileText,
  FlaskConical, SearchCheck, Zap, Receipt, Vote
} from "lucide-react";

export const siteConfig = {
  name: "KodeHaus",
  description:
    "The creative space of a self-taught developer building modern mobile and AI-powered apps with a focus on real-world impact.",
  url: "https://seyi.space",
  ogImage: "/images/og-image.png",
  links: {
    twitter: "https://x.com/kodehausdev",
    github: "https://github.com/kodehausdev",
    email: "mailto:hi.kodehaus@gmail.com",
  },
};

export const navItems: NavItem[] = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Projects", href: "/projects" },
  { title: "Learning", href: "/learning" },
  { title: "AI Toolkit", href: "/ai-documentation", icon: FileText },
  { title: "Contact", href: "/contact" },
];

export const projects: Project[] = [
  {
    title: "Chatverse",
    description: "A real-time chat application built with Firebase and Jetpack Compose, enabling seamless communication.",
    stack: ["Firebase", "Jetpack Compose", "Android"],
    link: "#",
    iconName: "BotMessageSquare",
    image: "/images/project-chatverse-mockup.jpg",
    imageAiHint: "chat app",
  },
  {
    title: "WanderWise",
    description: "An AI-powered travel planner that suggests itineraries and local gems based on user preferences.",
    stack: ["Gemini AI", "Next.js", "Firebase"],
    link: "#",
    iconName: "Wand2",
    image: "/images/project-wanderwise-travel.jpg",
    imageAiHint: "travel planner",
  },
  {
    title: "Watin We Go Chop",
    description: "An AI meal planner tailored for Nigerian homes, suggesting recipes based on available ingredients and dietary needs.",
    stack: ["Gemini AI", "Flutter", "Firebase"],
    link: "#",
    iconName: "Beef",
    image: "/images/project-watin-we-go-chop.jpg",
    imageAiHint: "nigerian food",
  },
  {
    title: "YieldZen",
    description: "A user-friendly Web3 staking platform for decentralized finance (DeFi) platforms.",
    stack: ["Solidity", "Next.js", "Ethers.js"],
    link: "#",
    iconName: "Layers",
    image: "/images/project-yieldzen.jpg",
    imageAiHint: "crypto finance",
  },
  {
    title: "Community Wallet",
    description: "An Ethereum-based DAO (Decentralized Autonomous Organization) for managing community funds transparently.",
    stack: ["Solidity", "Hardhat", "React"],
    link: "#",
    iconName: "ShieldCheck",
    image: "/images/project-community-wallet.jpg",
    imageAiHint: "community savings",
  },
  {
    title: "FocusFlow",
    description: "A Jetpack Compose focus timer designed to help users maintain focus and productivity.",
    stack: ["Jetpack Compose", "Android", "Kotlin"],
    link: "#",
    iconName: "Timer",
    image: "/images/project-focusflow.jpg",
    imageAiHint: "timer productivity",
  },
  {
    title: "NairaTrack AI",
    description: "An intelligent expense tracker for Nigerians that uses AI to scan and digitize receipts, automatically categorizing spending.",
    stack: ["Jetpack Compose", "Gemini AI", "Firebase", "Kotlin"],
    link: "#",
    iconName: "Receipt",
    image: "/images/project-nairatrack.jpg",
    imageAiHint: "receipt scanner finance",
  },
  {
    title: "DAOVoter",
    description: "A secure and transparent on-chain voting system for DAOs, built with Solidity and designed for community governance.",
    stack: ["Solidity", "Next.js", "Ethers.js", "Hardhat"],
    link: "#",
    iconName: "Vote",
    image: "/images/project-daovoter.jpg",
    imageAiHint: "voting community blockchain",
  },
];

export const learningJourneyItems: LearningItem[] = [
  {
    title: "Gemini Prompt Engineering",
    description: "Exploring advanced techniques for crafting effective prompts to leverage the power of Google's Gemini models.",
    icon: BrainCircuit,
  },
  {
    title: "Firebase AI Studio",
    description: "Utilizing Firebase AI Studio to integrate and manage AI models within applications seamlessly.",
    icon: Wand2,
  },
  {
    title: "Solidity Governance",
    description: "Understanding and implementing governance mechanisms in smart contracts and DAOs using Solidity for trust-driven communities.",
    icon: Landmark,
  },
  {
    title: "Android UI/UX Principles",
    description: "Mastering Android UI/UX design principles to create intuitive, culturally intelligent, and visually appealing user experiences.",
    icon: Palette,
  },
];

export const techRadarStatusOrder: TechRadarStatus[] = ['Actively Using', 'Experimenting With', 'Evaluating'];

export const techRadarItems: TechRadarItem[] = [
  {
    name: "Next.js",
    status: "Actively Using",
    description: "Primary framework for building web applications with React.",
    icon: Code,
  },
  {
    name: "Firebase",
    status: "Actively Using",
    description: "Comprehensive platform for backend services, database, and hosting.",
    icon: Zap,
  },
  {
    name: "Jetpack Compose",
    status: "Actively Using",
    description: "Modern toolkit for building native Android UIs with Kotlin.",
    icon: Code,
  },
  {
    name: "Genkit (Firebase AI)",
    status: "Experimenting With",
    description: "Exploring Genkit for integrating generative AI into applications.",
    icon: BrainCircuit,
  },
  {
    name: "Solidity",
    status: "Experimenting With",
    description: "Learning and applying Solidity for smart contract development on Ethereum.",
    icon: Layers,
  },
  {
    name: "Flutter",
    status: "Evaluating",
    description: "Assessing Flutter for cross-platform mobile application development.",
    icon: FlaskConical,
  },
  {
    name: "Rust",
    status: "Evaluating",
    description: "Keeping an eye on Rust for systems programming and WebAssembly.",
    icon: SearchCheck,
  },
   {
    name: "Advanced CI/CD",
    status: "Experimenting With",
    description: "Improving deployment pipelines with GitHub Actions and Docker.",
    icon: Layers,
  }
];

export const contactMethods = [
  {
    name: "Twitter / X",
    Icon: Twitter,
    href: "https://x.com/K4PSX", 
    text: "@K4PSX" 
  },
  {
    name: "Email",
    Icon: Mail,
    href: "mailto:Fatokifury@gmail.com", 
    text: "Fatokifury@gmail.com" 
  },
  {
    name: "GitHub",
    Icon: Github,
    href: "https://github.com/FatokiFury", 
    text: "FatokiFury" 
  }
];
