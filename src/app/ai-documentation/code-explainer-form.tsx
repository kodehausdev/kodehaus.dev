
"use client";

import { useState, useTransition } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Sparkles, Terminal } from "lucide-react";
import { explainCode } from "@/ai/flows/explain-code";
import type { ExplainCodeInput } from "@/ai/flows/explain-code";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  codeSnippet: z.string().min(10, "Code snippet must be at least 10 characters"),
});

type FormData = ExplainCodeInput;

export function CodeExplainerForm() {
  const [isPending, startTransition] = useTransition();
  const [explanation, setExplanation] = useState<string | null>(null);
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
      setExplanation(null);
      try {
        const result = await explainCode(data);
        if (result && result.explanation) {
          setExplanation(result.explanation);
        } else {
          throw new Error("Failed to generate explanation or empty response.");
        }
      } catch (error) {
        console.error("Error generating explanation:", error);
        toast({
          title: "Error Generating Explanation",
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
            AI Code Explainer
          </CardTitle>
          <CardDescription>
            Paste a code snippet below, and our AI assistant will generate a detailed explanation for you.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="codeSnippet">Code Snippet</Label>
              <Textarea
                id="codeSnippet"
                {...register("codeSnippet")}
                placeholder="Paste your code here..."
                className="min-h-[200px] font-mono text-sm"
              />
              {errors.codeSnippet && <p className="text-sm text-destructive">{errors.codeSnippet.message}</p>}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={() => { reset(); setExplanation(null); }}>
              Clear
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
                  Explain Code
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {isPending && !explanation && (
        <div className="text-center py-8">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
          <p className="mt-4 text-muted-foreground">Generating explanation, please wait...</p>
        </div>
      )}

      {explanation && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-xl font-headline">
              <Terminal className="h-5 w-5 mr-2 text-accent" />
              Generated Explanation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert variant="default" className="bg-muted/50">
                <AlertTitle>AI-Generated Explanation</AlertTitle>
                <AlertDescription>
                  The explanation below is in Markdown format. You can copy it for your notes or documentation.
                </AlertDescription>
            </Alert>
            <pre className="mt-4 p-4 bg-secondary/30 rounded-md text-sm overflow-x-auto whitespace-pre-wrap break-words leading-relaxed">
                {explanation}
            </pre>
          </CardContent>
           <CardFooter>
              <Button onClick={() => navigator.clipboard.writeText(explanation)} variant="default">
                Copy to Clipboard
              </Button>
            </CardFooter>
        </Card>
      )}
    </div>
  );
}
