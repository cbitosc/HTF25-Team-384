'use server';
/**
 * @fileOverview Converts medical reports into simple explanations.
 *
 * - explainMyReport - A function that simplifies medical reports.
 * - ExplainMyReportInput - The input type for the explainMyReport function.
 * - ExplainMyReportOutput - The return type for the explainMyReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainMyReportInputSchema = z.object({
  report: z.string().describe('The medical report text to simplify.'),
  language: z
    .string()
    .default('en')
    .describe('The target language for the explanation.'),
});
export type ExplainMyReportInput = z.infer<typeof ExplainMyReportInputSchema>;

const ExplainMyReportOutputSchema = z.object({
  summary: z
    .string()
    .describe('A high-level summary of the report findings.'),
  breakdown: z
    .array(
      z.object({
        parameter: z.string().describe('The name of the parameter, e.g., "Hemoglobin".'),
        value: z.string().describe('The measured value.'),
        explanation: z.string().describe('A simple explanation of what this parameter means and the result.'),
      })
    )
    .describe('A breakdown of each key parameter in the report.'),
});
export type ExplainMyReportOutput = z.infer<typeof ExplainMyReportOutputSchema>;

export async function explainMyReport(
  input: ExplainMyReportInput
): Promise<ExplainMyReportOutput> {
  return explainMyReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainMyReportPrompt',
  input: {schema: ExplainMyReportInputSchema},
  output: {schema: ExplainMyReportOutputSchema},
  prompt: `You are an AI assistant that explains complex medical lab reports to patients in simple, easy-to-understand language.

  Report Text:
  {{{report}}}

  Language: {{{language}}}

  Your task is to:
  1.  Provide a clear, concise 'summary' of the overall findings.
  2.  Create a 'breakdown' of the key parameters from the report. For each parameter, provide:
      - The 'parameter' name.
      - The 'value' that was measured.
      - A simple 'explanation' of what this parameter is and what the result means for the patient's health.

  Avoid medical jargon. Focus on clarity and providing actionable understanding.
  `,
});

const explainMyReportFlow = ai.defineFlow(
  {
    name: 'explainMyReportFlow',
    inputSchema: ExplainMyReportInputSchema,
    outputSchema: ExplainMyReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
