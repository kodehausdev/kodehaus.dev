
import { projects } from "@/config/site";
import { ProjectCard } from "@/components/project-card";
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Explore projects built by Seyi, showcasing skills in Android, AI, and Web3.',
};

export default function ProjectsPage() {
  return (
    <div className="space-y-12 py-8">
      <section className="text-center">
        <h1 className="text-4xl sm:text-5xl font-headline font-bold mb-4">My Projects</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A selection of projects I&apos;ve built and contributed to. Each one represents a learning opportunity and a step forward in my development journey.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </section>
    </div>
  );
}
