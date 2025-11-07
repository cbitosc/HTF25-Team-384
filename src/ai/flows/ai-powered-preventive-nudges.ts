
'use server';

/**
 * @fileOverview AI-powered preventive nudges flow.
 *
 * - aiPoweredPreventiveNudges - A function that detects risky health patterns and alerts patients.
 * - AIPoweredPreventiveNudgesInput - The input type for the aiPoweredPreventiveNudges function.
 * - AIPoweredPreventiveNudgesOutput - The return type for the aiPoweredPreventiveNudges function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIPoweredPreventiveNudgesInputSchema = z.object({
  bloodPressureReadings: z.array(z.number()).describe('An array of blood pressure readings.'),
  bloodSugarReadings: z.array(z.number()).describe('An array of blood sugar readings.'),
  painLevels: z.array(z.number()).describe('An array of pain levels (1-10).'),
  moodLevels: z.array(z.string()).describe('An array of mood levels (e.g., happy, sad, anxious).'),
});

export type AIPoweredPreventiveNudgesInput = z.infer<typeof AIPoweredPreventiveNudgesInputSchema>;

const AIPoweredPreventiveNudgesOutputSchema = z.object({
  alertMessage: z.string().describe('A message alerting the patient to contact their doctor, if necessary.'),
  shouldAlert: z.boolean().describe('Whether or not an alert should be triggered.'),
});

export type AIPoweredPreventiveNudgesOutput = z.infer<typeof AIPoweredPreventiveNudgesOutputSchema>;

export async function aiPoweredPreventiveNudges(
  input: AIPoweredPreventiveNudgesInput
): Promise<AIPoweredPreventiveNudgesOutput> {
  return aiPoweredPreventiveNudgesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiPoweredPreventiveNudgesPrompt',
  input: {schema: AIPoweredPreventiveNudgesInputSchema},
  output: {schema: AIPoweredPreventiveNudgesOutputSchema},
  prompt: `You are an AI assistant that analyzes patient health data to detect risky patterns and provide proactive alerts.

  Analyze the following health data:
  Blood Pressure Readings: {{{bloodPressureReadings}}}
  Blood Sugar Readings: {{{bloodSugarReadings}}}
  Pain Levels: {{{painLevels}}}
  Mood Levels: {{{moodLevels}}}

  Based on this data, determine if the patient is exhibiting any risky health patterns. For example, consistently high blood pressure, extremely high or low blood sugar, consistently high pain levels, or consistently negative mood levels.

  If risky patterns are detected, generate an alert message advising the patient to contact their doctor. Set shouldAlert to true. Otherwise, set shouldAlert to false and provide an empty alertMessage.

  Consider recent trends and thresholds when determining if an alert is necessary.
  `,
});

const aiPoweredPreventiveNudgesFlow = ai.defineFlow(
  {
    name: 'aiPoweredPreventiveNudgesFlow',
    inputSchema: AIPoweredPreventiveNudgesInputSchema,
    outputSchema: AIPoweredPreventiveNudgesOutputSchema,
  },
  async input => {
    try {
      const {output} = await prompt(input);
      return output!;
    } catch (error) {
      console.error("Failed to get AI-powered preventive nudge:", error);
      // Return a safe default if the AI call fails
      return {
        shouldAlert: false,
        alertMessage: '',
      };
    }
  }
);
