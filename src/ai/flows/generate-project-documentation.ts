
'use server';

/**
 * @fileOverview A Genkit flow that generates documentation for AI-powered projects.
 *
 * - generateAiProjectDocumentation - A function that generates documentation for AI-powered projects.
 * - GenerateAiProjectDocumentationInput - The input type for the generateAiProjectDocumentation function.
 * - GenerateAiProjectDocumentationOutput - The return type for the generateAiProjectDocumentation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAiProjectDocumentationInputSchema = z.object({
  projectName: z.string().describe('The name of the AI-powered project.'),
  projectDescription: z.string().describe('A detailed description of the project.'),
  techStack: z.string().describe('A comma-separated string of the tech stack used in the project (e.g., Gemini, Firebase, Next.js).'),
  keyFeatures: z.string().describe('The key features of the project, can be newline-separated.'),
});

export type GenerateAiProjectDocumentationInput = z.infer<
  typeof GenerateAiProjectDocumentationInputSchema
>;

const GenerateAiProjectDocumentationOutputSchema = z.object({
  documentation: z.string().describe('The generated documentation for the AI-powered project, formatted in markdown.'),
});

export type GenerateAiProjectDocumentationOutput = z.infer<
  typeof GenerateAiProjectDocumentationOutputSchema
>;

export async function generateAiProjectDocumentation(
  input: GenerateAiProjectDocumentationInput
): Promise<GenerateAiProjectDocumentationOutput> {
  return generateAiProjectDocumentationFlow(input);
}

const generateAiProjectDocumentationPrompt = ai.definePrompt({
  name: 'generateAiProjectDocumentationPrompt',
  input: {schema: GenerateAiProjectDocumentationInputSchema},
  output: {schema: GenerateAiProjectDocumentationOutputSchema},
  model: 'googleai/gemini-1.5-flash-latest',
  prompt: `You are an AI documentation generator. Generate documentation for the following AI-powered project.
The documentation should be formatted in markdown and clearly explain the project's purpose, tech stack, key features, and potential implementation details.

Project Name: {{{projectName}}}
Project Description: {{{projectDescription}}}
Tech Stack: {{{techStack}}}
Key Features: {{{keyFeatures}}}

Please generate the documentation in markdown format. For the "Tech Stack" and "Key Features" sections, format the provided strings into proper markdown bulleted lists.

Example Markdown Structure:
# Project: {{{projectName}}}

## Overview
{{{projectDescription}}}

## Tech Stack
- [First technology]
- [Second technology]
- ...

## Key Features
- [First feature]
- [Second feature]
- ...

## Potential Implementation Notes
(Provide a brief, high-level suggestion on implementation if appropriate, based on the description and features.)

Output the entire response as a single markdown string for the 'documentation' field.
`,
});

const generateAiProjectDocumentationFlow = ai.defineFlow(
  {
    name: 'generateAiProjectDocumentationFlow',
    inputSchema: GenerateAiProjectDocumentationInputSchema,
    outputSchema: GenerateAiProjectDocumentationOutputSchema,
  },
  async input => {
    const {output} = await generateAiProjectDocumentationPrompt(input);
     if (!output) {
      throw new Error('No output from generateAiProjectDocumentationPrompt');
    }
    return output;
  }
);
