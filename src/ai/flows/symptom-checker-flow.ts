'use server';
/**
 * @fileOverview A symptom checker AI agent.
 *
 * - symptomChecker - A function that handles the symptom checking process.
 * - SymptomCheckerInput - The input type for the symptomChecker function.
 * - SymptomCheckerOutput - The return type for the symptomChecker function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SymptomCheckerInputSchema = z.object({
  symptoms: z.string().describe('The symptoms described by the user.'),
});
export type SymptomCheckerInput = z.infer<typeof SymptomCheckerInputSchema>;

const SymptomCheckerOutputSchema = z.object({
  analysis: z
    .string()
    .describe(
      'A brief analysis of the possible conditions based on the symptoms.'
    ),
  recommendation: z
    .string()
    .describe(
      'A recommendation for the user, e.g., consult a specific type of doctor or seek immediate attention.'
    ),
});
export type SymptomCheckerOutput = z.infer<typeof SymptomCheckerOutputSchema>;

export async function symptomChecker(
  input: SymptomCheckerInput
): Promise<SymptomCheckerOutput> {
  return symptomCheckerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'symptomCheckerPrompt',
  input: {schema: SymptomCheckerInputSchema},
  output: {schema: SymptomCheckerOutputSchema},
  prompt: `You are an AI Health Assistant. A user is describing their symptoms. Your task is to provide a brief, helpful analysis and a safe recommendation.

  IMPORTANT: You are not a doctor. Do not provide a diagnosis. Always advise the user to consult with a qualified healthcare professional for an accurate diagnosis and treatment plan.

  User's Symptoms: "{{{symptoms}}}"

  Based on these symptoms, provide a general analysis of potential issues and recommend the next steps. For example, if the symptoms suggest a cold, you might recommend seeing a general practitioner. If symptoms are severe, recommend immediate medical attention.

  Your response should be structured as follows:
  - analysis: A brief summary of what the symptoms might indicate (e.g., "The symptoms you've described are common with respiratory infections...").
  - recommendation: Clear, actionable advice on what to do next (e.g., "It would be best to consult a general physician to get an accurate diagnosis.").`,
});

const symptomCheckerFlow = ai.defineFlow(
  {
    name: 'symptomCheckerFlow',
    inputSchema: SymptomCheckerInputSchema,
    outputSchema: SymptomCheckerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
