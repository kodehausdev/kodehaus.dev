
import { AiDocumentationForm } from "./ai-documentation-form";
import { CodeExplainerForm } from "./code-explainer-form";
import { type Metadata } from 'next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Code } from "lucide-react";

export const metadata: Metadata = {
  title: 'AI Developer Toolkit',
  description: 'Use AI to generate project documentation or explain code snippets.',
};

export default function AiToolkitPage() {
  return (
    <div className="space-y-12 py-8">
      <section className="text-center">
        <h1 className="text-4xl sm:text-5xl font-headline font-bold mb-4">AI Developer Toolkit</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A collection of AI-powered tools to streamline your development workflow. Generate documentation or get code explanations in seconds.
        </p>
      </section>

      <Tabs defaultValue="documentation" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
          <TabsTrigger value="documentation">
            <FileText className="mr-2 h-4 w-4" />
            Project Documentation
          </TabsTrigger>
          <TabsTrigger value="explainer">
            <Code className="mr-2 h-4 w-4" />
            Code Explainer
          </TabsTrigger>
        </TabsList>
        <TabsContent value="documentation" className="mt-8">
          <AiDocumentationForm />
        </TabsContent>
        <TabsContent value="explainer" className="mt-8">
          <CodeExplainerForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
