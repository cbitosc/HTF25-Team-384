'use server';
/**
 * @fileOverview Smart prescription reader AI flow.
 *
 * - smartPrescriptionReader - A function that extracts prescription details from an image.
 * - SmartPrescriptionReaderInput - The input type for the smartPrescriptionReader function.
 * - SmartPrescriptionReaderOutput - The return type for the smartPrescriptionReader function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SmartPrescriptionReaderInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a prescription, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type SmartPrescriptionReaderInput = z.infer<typeof SmartPrescriptionReaderInputSchema>;

const PrescriptionItemSchema = z.object({
  medication: z.string().describe('The name of the medication.'),
  dosage: z.string().describe('The dosage instruction (e.g., "500 mg").'),
  frequency: z.string().describe('How often to take the medication (e.g., "Twice a day").'),
  instruction: z.string().describe('A simple, clear instruction for the patient (e.g., "Take one tablet in the morning and one at night after your meal.").'),
});

const SmartPrescriptionReaderOutputSchema = z.object({
  extractedText: z.string().describe('The raw text extracted from the prescription image.'),
  parsedPrescription: z.array(PrescriptionItemSchema).describe('An array of parsed prescription items.'),
});
export type SmartPrescriptionReaderOutput = z.infer<typeof SmartPrescriptionReaderOutputSchema>;

export async function smartPrescriptionReader(
  input: SmartPrescriptionReaderInput
): Promise<SmartPrescriptionReaderOutput> {
  return smartPrescriptionReaderFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smartPrescriptionReaderPrompt',
  input: { schema: SmartPrescriptionReaderInputSchema },
  output: { schema: SmartPrescriptionReaderOutputSchema },
  prompt: `You are an AI assistant that extracts information from prescription images and makes it easy for patients to understand.

  Analyze the following prescription image:
  Photo: {{media url=photoDataUri}}

  Your task is to:
  1.  Extract all the text from the image using OCR.
  2.  For each medication, parse the extracted text to identify the 'medication' name, its 'dosage', and 'frequency'.
  3.  Most importantly, for each medication, generate a simple, clear 'instruction' in plain language for the patient. For example, if the prescription says "Paracetamol 1 tab x 3 times a day after food", the instruction should be "Take one tablet of Paracetamol three times a day after you have eaten."
  4.  Return the raw extracted text and the array of parsed prescription items.
  `,
});

const smartPrescriptionReaderFlow = ai.defineFlow(
  {
    name: 'smartPrescriptionReaderFlow',
    inputSchema: SmartPrescriptionReaderInputSchema,
    outputSchema: SmartPrescriptionReaderOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('Failed to extract prescription details.');
    }
    return output;
  }
);
