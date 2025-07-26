
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Users, Brain } from "lucide-react";
import Image from "next/image";
import { siteConfig } from "@/config/site";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-12 min-h-[calc(100vh-10rem)] py-10">
      <section className="w-full max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline font-extrabold tracking-tight mb-6">
          <span className="block">Welcome to {siteConfig.name} —</span>
          <span className="block text-accent">a space for wild ideas,</span>
          <span className="block text-primary">sharp code, and real impact.</span>
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto mb-8">
          Hi, I'm Seyi. From {siteConfig.name}, my creative hub, I build solutions for real-world needs, from my family's kitchen to local markets in Abuja, using Android (Jetpack Compose), Firebase, Gemini AI, and Solidity (Web3).
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button asChild size="lg" className="shadow-lg hover:shadow-primary/50 transition-shadow duration-300">
            <Link href="/projects">
              View My Work <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="shadow-lg hover:shadow-accent/50 transition-shadow duration-300">
            <Link href="/contact">
              Get In Touch
            </Link>
          </Button>
        </div>
      </section>

      <section className="w-full max-w-4xl mx-auto pt-16">
        <h2 className="text-3xl font-headline font-bold mb-8 text-center">What I Focus On</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-card rounded-lg shadow-lg border border-border hover:shadow-xl transition-shadow duration-300">
            <Code className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Android Development</h3>
            <p className="text-muted-foreground">
              Crafting native Android apps with Jetpack Compose, focusing on clean architecture and delightful user experiences.
            </p>
          </div>
          <div className="p-6 bg-card rounded-lg shadow-lg border border-border hover:shadow-xl transition-shadow duration-300">
            <Brain className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">AI & Machine Learning</h3>
            <p className="text-muted-foreground">
              Exploring Gemini AI and Firebase AI Studio to build intelligent applications that solve practical problems.
            </p>
          </div>
          <div className="p-6 bg-card rounded-lg shadow-lg border border-border hover:shadow-xl transition-shadow duration-300">
            <Users className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Web3 & Solidity</h3>
            <p className="text-muted-foreground">
              Diving into the world of decentralized technologies, learning Solidity for smart contracts and DAO development.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full max-w-3xl mx-auto pt-16">
        <Image
          src="/images/project-nairatrack.jpg"
          alt="Abstract representation of code or technology"
          width={800}
          height={400}
          data-ai-hint="creative technology workspace"
          sizes="(max-width: 800px) 100vw, 800px"
          className="rounded-lg shadow-2xl object-cover"
          priority
        />
      </section>
    </div>
  );
}
