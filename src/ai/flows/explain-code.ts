
'use server';
/**
 * @fileOverview A Genkit flow to explain a snippet of code.
 *
 * - explainCode - A function that generates an explanation for a given code snippet.
 * - ExplainCodeInput - The input type for the explainCode function.
 * - ExplainCodeOutput - The return type for the explainCode function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainCodeInputSchema = z.object({
  codeSnippet: z.string().describe('The code snippet to be explained.'),
});
export type ExplainCodeInput = z.infer<typeof ExplainCodeInputSchema>;

const ExplainCodeOutputSchema = z.object({
  explanation: z.string().describe('The detailed explanation of the code snippet, formatted in markdown.'),
});
export type ExplainCodeOutput = z.infer<typeof ExplainCodeOutputSchema>;

export async function explainCode(input: ExplainCodeInput): Promise<ExplainCodeOutput> {
  return explainCodeFlow(input);
}

const explainCodePrompt = ai.definePrompt({
  name: 'explainCodePrompt',
  input: {schema: ExplainCodeInputSchema},
  output: {schema: ExplainCodeOutputSchema},
  model: 'googleai/gemini-1.5-flash-latest',
  prompt: `You are an expert code reviewer and AI assistant. Your task is to explain a given code snippet in a clear, concise, and easy-to-understand manner.

The explanation should be formatted in markdown.
1.  Start with a high-level summary of what the code does.
2.  Provide a line-by-line or block-by-block breakdown of the code's logic.
3.  Use markdown for code blocks and formatting to improve readability.
4.  Be helpful and educational.

Code to explain:
\`\`\`
{{{codeSnippet}}}
\`\`\`

Generate the explanation and provide it in the 'explanation' field of the output.`,
});

const explainCodeFlow = ai.defineFlow(
  {
    name: 'explainCodeFlow',
    inputSchema: ExplainCodeInputSchema,
    outputSchema: ExplainCodeOutputSchema,
  },
  async input => {
    const {output} = await explainCodePrompt(input);
    if (!output) {
      throw new Error('No output from explainCodePrompt');
    }
    return output;
  }
);
