
import Image from "next/image";
import { Users, Lightbulb, BookOpen } from "lucide-react";
import { type Metadata } from 'next';
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `About`,
  description: `Discover the story of the developer behind ${siteConfig.name}, passionate about Android, AI, Web3, and bringing cultural intelligence to tech.`,
};

export default function AboutPage() {
  return (
    <div className="space-y-12 py-8">
      <section className="text-center">
        <h1 className="text-4xl sm:text-5xl font-headline font-bold mb-4">My Story: The Builder from {siteConfig.name}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A glimpse into the journey that fuels {siteConfig.name}, driven by curiosity and a desire to create impactful technology.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <Image
            src="/images/project-community-wallet.jpg"
            alt="Portrait of the developer"
            width={600}
            height={800}
            data-ai-hint="developer portrait"
            sizes="(max-width: 768px) 100vw, 50vw"
            className="rounded-lg shadow-xl object-cover aspect-[3/4]"
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-headline font-semibold">The Self-Taught Builder</h2>
          <p className="text-lg leading-relaxed text-foreground/80">
            My journey into technology wasn't conventional. As a self-taught developer, this space – {siteConfig.name} – is where curiosity meets code. What started as tinkering with Android development from scratch, learning Jetpack Compose and Kotlin, quickly blossomed into a full-blown passion for software.
          </p>
          <p className="text-lg leading-relaxed text-foreground/80">
            I find immense joy in mastering these tools, meticulously crafting user interfaces and experiences that are both functional and delightful, directly addressing real needs I observe around me in Abuja and beyond.
          </p>
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex items-start space-x-4 p-6 bg-card rounded-lg shadow-md border border-border">
          <Users className="h-10 w-10 text-primary flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-2xl font-semibold mb-2">Inspired by Real Needs: From My Kitchen to Local Markets</h3>
            <p className="text-md leading-relaxed text-foreground/80">
              My motivation isn't just about writing code; it's about solving real problems for real people. Whether it's building tools to help my family in the kitchen, support my local community, or streamline processes in the bustling markets of Abuja, I believe technology should be an enabler. This drive fuels my work with Firebase and AI, shipping indie tools that make a tangible difference.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4 p-6 bg-card rounded-lg shadow-md border border-border">
          <Lightbulb className="h-10 w-10 text-primary flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-2xl font-semibold mb-2">Exploring New Frontiers: AI, Web3, and Cultural Intelligence</h3>
            <p className="text-md leading-relaxed text-foreground/80">
              The tech landscape is constantly evolving. I'm fascinated by AI's potential, especially with tools like Gemini and Firebase AI Studio, to create intelligent applications. Simultaneously, I'm delving into Web3 and Solidity, not just for the tech, but to explore how decentralized systems can build trust-driven communities and solve complex problems in novel ways.
            </p>
             <p className="text-md leading-relaxed text-foreground/80 mt-4">
              A core part of my exploration is figuring out how to bring more cultural intelligence into tech. I believe understanding diverse perspectives and local contexts is key to building truly global and impactful solutions.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4 p-6 bg-card rounded-lg shadow-md border border-border">
          <BookOpen className="h-10 w-10 text-primary flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-2xl font-semibold mb-2">A Lifelong Learner</h3>
            <p className="text-md leading-relaxed text-foreground/80">
              The path of a self-taught developer is one of continuous learning. I embrace challenges, seek out new knowledge, and am always eager to experiment with new technologies. My goal is to keep building, keep learning, and keep pushing the boundaries of what I can create.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
