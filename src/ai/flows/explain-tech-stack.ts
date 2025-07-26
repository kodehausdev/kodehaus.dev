
'use server';
/**
 * @fileOverview A Genkit flow to explain a technology stack item.
 *
 * - explainTechStack - A function that generates an explanation for a given technology, optionally in the context of a project.
 * - ExplainTechStackInput - The input type for the explainTechStack function.
 * - ExplainTechStackOutput - The return type for the explainTechStack function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainTechStackInputSchema = z.object({
  technologyName: z.string().describe('The name of the technology to explain.'),
  projectContext: z.string().optional().describe('An optional context of a project where this technology is used.'),
});
export type ExplainTechStackInput = z.infer<typeof ExplainTechStackInputSchema>;

const ExplainTechStackOutputSchema = z.object({
  explanation: z.string().describe('The concise explanation of the technology.'),
});
export type ExplainTechStackOutput = z.infer<typeof ExplainTechStackOutputSchema>;

export async function explainTechStack(input: ExplainTechStackInput): Promise<ExplainTechStackOutput> {
  return explainTechStackFlow(input);
}

const explainTechStackPrompt = ai.definePrompt({
  name: 'explainTechStackPrompt',
  input: {schema: ExplainTechStackInputSchema},
  output: {schema: ExplainTechStackOutputSchema},
  model: 'googleai/gemini-1.5-flash-latest',
  prompt: `You are a helpful tech explainer. Your goal is to provide concise and easy-to-understand explanations of software technologies.

Technology to explain: {{{technologyName}}}

{{#if projectContext}}
Project Context: {{{projectContext}}}
Explain '{{{technologyName}}}' in 2-3 sentences.
Then, add 1-2 sentences on how '{{{technologyName}}}' is typically used in a project like '{{{projectContext}}}'.
{{else}}
Explain '{{{technologyName}}}' in 2-3 sentences.
{{/if}}

Keep the entire explanation under 5 sentences and suitable for a general audience, including those who may not be deeply technical.
Focus on clarity and brevity. Ensure the output is a single string for the 'explanation' field.`,
});

const explainTechStackFlow = ai.defineFlow(
  {
    name: 'explainTechStackFlow',
    inputSchema: ExplainTechStackInputSchema,
    outputSchema: ExplainTechStackOutputSchema,
  },
  async input => {
    const {output} = await explainTechStackPrompt(input);
    if (!output) {
      throw new Error('No output from explainTechStackPrompt');
    }
    return output;
  }
);
