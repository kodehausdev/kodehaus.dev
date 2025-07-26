
"use client";

import Image from "next/image";
import { learningJourneyItems, techRadarItems, techRadarStatusOrder } from "@/config/site";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import type { TechRadarStatus } from "@/types";
import { Zap, FlaskConical, SearchCheck, HelpCircle, Loader2, Volume2 } from "lucide-react";
import { useState, useEffect } from "react";
import { explainTechStack } from "@/ai/flows/explain-tech-stack";
import { textToSpeech } from "@/ai/flows/text-to-speech";
import { useToast } from "@/hooks/use-toast";

export default function LearningJourneyPage() {
  const { toast } = useToast();
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [isLoadingExplanation, setIsLoadingExplanation] = useState(false);
  const [isExplainerDialogOpen, setIsExplainerDialogOpen] = useState(false);
  const [audioDataUri, setAudioDataUri] = useState<string | null>(null);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);

  const groupedTechRadarItems = techRadarStatusOrder.map(status => ({
    status,
    items: techRadarItems.filter(item => item.status === status),
  })).filter(group => group.items.length > 0);

  const handleTechClick = (tech: string) => {
    setSelectedTech(tech);
    setIsExplainerDialogOpen(true);
    setAudioDataUri(null); // Reset audio when opening a new dialog
  };

  const handleGenerateAudio = async (textToSpeak: string) => {
    if (!textToSpeak) return;
    setIsGeneratingAudio(true);
    setAudioDataUri(null);
    try {
      const result = await textToSpeech(textToSpeak);
      setAudioDataUri(result.audioDataUri);
    } catch (error) {
      console.error("Error generating audio:", error);
      toast({
        title: "Error Generating Audio",
        description: "Could not generate audio for the explanation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingAudio(false);
    }
  };

  useEffect(() => {
    if (isExplainerDialogOpen && selectedTech) {
      const fetchExplanation = async () => {
        setIsLoadingExplanation(true);
        setExplanation(null);
        setAudioDataUri(null);
        try {
          const result = await explainTechStack({
            technologyName: selectedTech
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
  }, [isExplainerDialogOpen, selectedTech, toast]);

  return (
    <>
      <div className="space-y-16 py-8">
        <section className="text-center">
          <h1 className="text-4xl sm:text-5xl font-headline font-bold mb-4">My Learning Path</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Technology is ever-evolving, and so is my quest for knowledge. Here's what I'm currently focused on learning and mastering.
          </p>
          <div className="mt-8 mb-12">
            <Image
              src="/images/project-yieldzen.jpg"
              alt="Illustration of continuous learning and technology growth"
              width={1000}
              height={300}
              data-ai-hint="learning technology"
              sizes="(max-width: 1024px) 100vw, 1000px"
              className="rounded-lg shadow-lg object-cover mx-auto"
            />
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {learningJourneyItems.map((item) => (
            <Card key={item.title} className="shadow-lg hover:shadow-accent/20 transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  {item.icon && <item.icon className="h-8 w-8 text-primary" />}
                  <CardTitle className="text-2xl font-headline">{item.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-headline font-bold mb-4">My Tech Radar</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A snapshot of technologies I'm working with. Click on any item to get a quick, AI-powered explanation.
            </p>
          </div>

          <div className="space-y-10">
            {groupedTechRadarItems.map(group => (
              <div key={group.status}>
                <h3 className="text-2xl font-semibold mb-6 text-primary flex items-center">
                  {group.status === "Actively Using" && <Zap className="mr-3 h-6 w-6" />}
                  {group.status === "Experimenting With" && <FlaskConical className="mr-3 h-6 w-6" />}
                  {group.status === "Evaluating" && <SearchCheck className="mr-3 h-6 w-6" />}
                  {group.status}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {group.items.map(item => (
                    <Card 
                      key={item.name} 
                      className="shadow-md hover:shadow-primary/15 transition-shadow duration-300 flex flex-col cursor-pointer group"
                      onClick={() => handleTechClick(item.name)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleTechClick(item.name)}
                    >
                      <CardHeader>
                        <CardTitle className="text-xl font-headline flex items-center justify-between">
                          <div className="flex items-center">
                            {item.icon && <item.icon className="h-6 w-6 mr-3 text-accent shrink-0" />}
                            {item.name}
                          </div>
                          <HelpCircle className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </CardTitle>
                      </CardHeader>
                      {item.description && (
                        <CardContent className="flex-grow">
                          <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center py-10">
            <h2 className="text-2xl font-headline font-semibold mb-4">Always Curious, Always Building</h2>
            <p className="text-md text-muted-foreground max-w-xl mx-auto">
              This journey is fueled by a humble confidence in my ability to learn and a builder's mindset to create. If you're passionate about similar technologies or have interesting problems to solve, let's connect!
            </p>
        </section>
      </div>

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
            <div className="py-2 space-y-4">
              <div className="text-base leading-relaxed whitespace-pre-line text-muted-foreground">
                {explanation}
              </div>
              {explanation && (
                <div className="flex items-center gap-4 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleGenerateAudio(explanation)}
                    disabled={isGeneratingAudio}
                  >
                    {isGeneratingAudio ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Volume2 className="mr-2 h-4 w-4" />
                    )}
                    Read Aloud
                  </Button>
                  {audioDataUri && (
                    <audio controls autoPlay src={audioDataUri} className="w-full max-w-xs">
                      Your browser does not support the audio element.
                    </audio>
                  )}
                </div>
              )}
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
