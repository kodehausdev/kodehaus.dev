
"use client";

import { useState, useTransition } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Sparkles, Terminal, Wrench, ArrowRight } from "lucide-react";
import { generateAiProjectDocumentation } from "@/ai/flows/generate-project-documentation";
import type { GenerateAiProjectDocumentationInput } from "@/ai/flows/generate-project-documentation";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  projectName: z.string().min(3, "Project name must be at least 3 characters"),
  projectDescription: z.string().min(10, "Project description must be at least 10 characters"),
  techStack: z.string().min(3, "Tech stack must be at least 3 characters (e.g., Next.js, Firebase)"),
  keyFeatures: z.string().min(10, "Key features must be at least 10 characters"),
});

type FormData = GenerateAiProjectDocumentationInput;

export function AiDocumentationForm() {
  const [isPending, startTransition] = useTransition();
  const [documentation, setDocumentation] = useState<string | null>(null);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    startTransition(async () => {
      setDocumentation(null);
      try {
        const result = await generateAiProjectDocumentation(data);
        if (result && result.documentation) {
          setDocumentation(result.documentation);
        } else {
          throw new Error("Failed to generate documentation or empty response.");
        }
      } catch (error) {
        console.error("Error generating documentation:", error);
        toast({
          title: "Error Generating Documentation",
          description: (error as Error).message || "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl font-headline">
            <Sparkles className="h-6 w-6 mr-2 text-primary" />
            Generate Project Documentation
          </CardTitle>
          <CardDescription>
            Fill in your project details below, and our AI assistant will generate
            markdown documentation for you.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="projectName">Project Name</Label>
              <Input id="projectName" {...register("projectName")} placeholder="e.g., My Awesome App" />
              {errors.projectName && <p className="text-sm text-destructive">{errors.projectName.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="projectDescription">Project Description</Label>
              <Textarea id="projectDescription" {...register("projectDescription")} placeholder="Describe your project in detail..." />
              {errors.projectDescription && <p className="text-sm text-destructive">{errors.projectDescription.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="techStack">Tech Stack</Label>
              <Input id="techStack" {...register("techStack")} placeholder="e.g., Next.js, Firebase, Gemini AI, Tailwind CSS" />
              {errors.techStack && <p className="text-sm text-destructive">{errors.techStack.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="keyFeatures">Key Features</Label>
              <Textarea id="keyFeatures" {...register("keyFeatures")} placeholder="List the main features of your project, separated by commas or new lines." />
              {errors.keyFeatures && <p className="text-sm text-destructive">{errors.keyFeatures.message}</p>}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={() => { reset(); setDocumentation(null); }}>
              Clear Form
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {isPending && !documentation && (
        <div className="text-center py-8">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
          <p className="mt-4 text-muted-foreground">Generating documentation, please wait...</p>
        </div>
      )}

      {documentation && (
        <>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-headline">
                <Terminal className="h-5 w-5 mr-2 text-accent" />
                Generated Documentation (Markdown)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Alert variant="default" className="bg-muted/50">
                <AlertTitle>Copy Your Documentation</AlertTitle>
                <AlertDescription>
                  The generated documentation is in Markdown format. You can copy and paste it into your project&apos;s README.md or other documentation files.
                </AlertDescription>
              </Alert>
              <pre className="mt-4 p-4 bg-secondary/30 rounded-md text-sm overflow-x-auto whitespace-pre-wrap break-all leading-relaxed">
                <code>{documentation}</code>
              </pre>
            </CardContent>
            <CardFooter>
              <Button onClick={() => navigator.clipboard.writeText(documentation)} variant="default">
                Copy to Clipboard
              </Button>
            </CardFooter>
          </Card>

          <Card className="shadow-lg mt-8">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl font-headline">
                <Wrench className="h-6 w-6 mr-3 text-primary" />
                Ready to Build?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-lg text-muted-foreground">
                Impressed with the project outline you&apos;ve generated?
              </p>
              <p className="text-muted-foreground">
                If you&apos;re looking for an experienced developer to bring this (or any other) app vision to life, I&apos;m here to help. Let&apos;s discuss your project requirements and turn your ideas into reality.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild size="lg" className="shadow-md hover:shadow-primary/40 transition-shadow">
                <Link href="/contact">
                  Want Me to Build This For You? <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </>
      )}
    </div>
  );
}
