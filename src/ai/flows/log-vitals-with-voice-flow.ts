'use server';
/**
 * @fileOverview Parses vital signs from a user's spoken phrase.
 *
 * - logVitalsWithVoice - A function that extracts vital signs from text.
 * - LogVitalsWithVoiceInput - The input type for the logVitalsWithVoice function.
 * - LogVitalsWithVoiceOutput - The return type for the logVitalsWithVoice function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const LogVitalsWithVoiceInputSchema = z.object({
  phrase: z.string().describe('The user\'s spoken phrase about their vitals.'),
});
export type LogVitalsWithVoiceInput = z.infer<
  typeof LogVitalsWithVoiceInputSchema
>;

const LogVitalsWithVoiceOutputSchema = z.object({
  bloodSugar: z.number().optional().describe('The extracted blood sugar level.'),
  bloodPressure: z.string().optional().describe('The extracted blood pressure level as a string (e.g., "120/80").'),
  painLevel: z.number().optional().describe('The extracted pain level.'),
  heartRate: z.number().optional().describe('The extracted heart rate in beats per minute.'),
  temperature: z.number().optional().describe('The extracted body temperature.'),
  oxygen: z.number().optional().describe('The extracted blood oxygen saturation level as a percentage.'),
});
export type LogVitalsWithVoiceOutput = z.infer<
  typeof LogVitalsWithVoiceOutputSchema
>;

export async function logVitalsWithVoice(
  input: LogVitalsWithVoiceInput
): Promise<LogVitalsWithVoiceOutput> {
  return logVitalsWithVoiceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'logVitalsWithVoicePrompt',
  input: { schema: LogVitalsWithVoiceInputSchema },
  output: { schema: LogVitalsWithVoiceOutputSchema },
  prompt: `You are an AI assistant that parses vital signs from a user's spoken text.

  The user's phrase is: "{{{phrase}}}"

  Extract the following information if available:
  - Blood Sugar (as a number)
  - Blood Pressure (as a string, e.g., "120/80")
  - Pain Level (as a number, usually out of 10)
  - Heart Rate (as a number, in beats per minute)
  - Temperature (as a number, can be in Fahrenheit or Celsius)
  - Oxygen Saturation (as a number, as a percentage)

  If a value is not mentioned, leave it undefined. For blood pressure, look for formats like "120 over 80" or "120 by 80". For oxygen, look for "spo2" or "oxygen level".
  `,
});

const logVitalsWithVoiceFlow = ai.defineFlow(
  {
    name: 'logVitalsWithVoiceFlow',
    inputSchema: LogVitalsWithVoiceInputSchema,
    outputSchema: LogVitalsWithVoiceOutputSchema,
  },
  async (input) => {
    try {
      const { output } = await prompt(input);
      return output!;
    } catch (error) {
      console.error("Error parsing vitals with AI", error);
      // Return an empty object on failure.
      // The frontend will handle this gracefully.
      return {};
    }
  }
);
