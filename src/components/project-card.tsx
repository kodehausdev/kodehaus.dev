
"use client";

import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, HelpCircle, Loader2, BotMessageSquare, Wand2, Beef, Layers, ShieldCheck, Timer, Receipt, Vote } from "lucide-react";
import type { LucideIcon, LucideProps } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useState, useEffect, type ForwardRefExoticComponent, type RefAttributes } from "react";
import { explainTechStack } from "@/ai/flows/explain-tech-stack";
import { useToast } from "@/hooks/use-toast";

interface ProjectCardProps {
  project: Project;
}

const iconMap: { [key: string]: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>> } = {
  BotMessageSquare,
  Wand2,
  Beef,
  Layers,
  ShieldCheck,
  Timer,
  Receipt,
  Vote,
};

export function ProjectCard({ project }: ProjectCardProps) {
  const { title, description, stack, link, githubLink, iconName, image, imageAiHint } = project;
  const { toast } = useToast();

  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [isLoadingExplanation, setIsLoadingExplanation] = useState(false);
  const [isExplainerDialogOpen, setIsExplainerDialogOpen] = useState(false);

  const IconComponent = iconName ? iconMap[iconName] : null;

  const handleTechClick = (tech: string) => {
    setSelectedTech(tech);
    setIsExplainerDialogOpen(true);
  };

  useEffect(() => {
    if (isExplainerDialogOpen && selectedTech) {
      const fetchExplanation = async () => {
        setIsLoadingExplanation(true);
        setExplanation(null);
        try {
          const result = await explainTechStack({
            technologyName: selectedTech,
            projectContext: description,
          });
          setExplanation(result.explanation);
        } catch (error) {
          console.error("Error fetching tech explanation:", error);
          toast({
            title: "Error",
            description: `Could not load explanation for ${selectedTech}. Please try again.`,
            variant: "destructive",
          });
          setExplanation(`Failed to load explanation for ${selectedTech}.`);
        } finally {
          setIsLoadingExplanation(false);
        }
      };
      fetchExplanation();
    }
  }, [isExplainerDialogOpen, selectedTech, description, toast]);

  return (
    <>
      <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
        {image && (
          <div className="relative w-full h-48 sm:h-56">
            <Image
              src={image}
              alt={title}
              data-ai-hint={imageAiHint || "project technology"}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        )}
        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle className="text-2xl font-headline">{title}</CardTitle>
            {IconComponent && <IconComponent className="h-8 w-8 text-primary" />}
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{description}</p>
          <div className="flex flex-wrap gap-2">
            {stack.map((tech) => (
              <Button
                key={tech}
                variant="secondary"
                size="sm"
                className="text-xs h-auto py-1 px-2 rounded-md items-center"
                onClick={() => handleTechClick(tech)}
                aria-label={`Learn more about ${tech}`}
              >
                {tech} <HelpCircle className="ml-1.5 h-3 w-3 shrink-0" />
              </Button>
            ))}
          </div>
        </CardContent>
        <CardFooter className="mt-auto flex flex-col sm:flex-row sm:justify-between items-stretch sm:items-center gap-2 pt-4">
          {link && link !== "#" && (
            <Button asChild variant="default" size="sm" className="w-full sm:w-auto">
              <Link href={link} target="_blank" rel="noopener noreferrer">
                View Project <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
          {githubLink && (
            <Button asChild variant="outline" size="sm" className="w-full sm:w-auto">
              <Link href={githubLink} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" /> Source Code
              </Link>
            </Button>
          )}
          {(link === "#" || !link) && !githubLink && (
              <Button variant="outline" size="sm" disabled className="w-full sm:w-auto">
                Details Coming Soon
              </Button>
          )}
        </CardFooter>
      </Card>

      <Dialog open={isExplainerDialogOpen} onOpenChange={setIsExplainerDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <HelpCircle className="h-5 w-5 mr-2 text-primary" />
              About: {selectedTech}
            </DialogTitle>
          </DialogHeader>
          {isLoadingExplanation ? (
            <div className="flex items-center justify-center py-6 my-2">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
          ) : (
            <div className="py-2 text-base leading-relaxed whitespace-pre-line text-muted-foreground">
              {explanation}
            </div>
          )}
          <DialogFooter className="sm:justify-start">
            <Button type="button" variant="secondary" onClick={() => setIsExplainerDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
