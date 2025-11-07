
'use server';
/**
 * @fileOverview Converts medical instructions into simple, local-language explanations with audio and icons (ELI5 mode).
 *
 * - explainLikeIm5 - A function that simplifies medical instructions.
 * - ExplainLikeIm5Input - The input type for the explainLikeImm5 function.
 * - ExplainLikeIm5Output - The return type for the explainLikeIm5 function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';
import {googleAI} from '@genkit-ai/google-genai';

const ExplainLikeIm5InputSchema = z.object({
  instruction: z
    .string()
    .describe('The medical instruction or prescription to simplify.'),
  language: z
    .string()
    .default('en')
    .describe('The target language for the explanation.'),
});
export type ExplainLikeIm5Input = z.infer<typeof ExplainLikeIm5InputSchema>;

const ExplainLikeIm5OutputSchema = z.object({
  simpleExplanation: z
    .string()
    .describe('The simplified explanation of the medical instruction.'),
  iconSuggestions: z
    .array(z.string())
    .describe('An array of icon suggestions related to the instruction.'),
   audioDataUri: z.string().optional().describe('The audio data URI of the explanation.')
});
export type ExplainLikeIm5Output = z.infer<typeof ExplainLikeIm5OutputSchema>;

export async function explainLikeIm5(input: ExplainLikeIm5Input): Promise<ExplainLikeIm5Output> {
  return explainLikeIm5Flow(input);
}

const explainLikeIm5Prompt = ai.definePrompt({
  name: 'explainLikeIm5Prompt',
  input: {schema: ExplainLikeIm5InputSchema},
  output: {schema: ExplainLikeIm5OutputSchema},
  prompt: `You are an expert in simplifying complex medical instructions into easy-to-understand explanations for patients with low health literacy.  Your goal is to provide clear, actionable advice in simple language, and suggest icons which can visually represent the instruction.

Instruction: {{{instruction}}}
Language: {{{language}}}

Here's how you should format your response:

1.  **simpleExplanation:**  Provide a simplified explanation of the medical instruction in the specified language.  Use everyday language and avoid medical jargon. Break down complex instructions into smaller, manageable steps.
2.  **iconSuggestions:** Suggest 3-5 relevant icons that can visually represent the instruction.  These icons should be universally recognizable and help the patient understand the instruction at a glance. Return the icon names in an array of strings.

Ensure the explanation is accurate and safe for the patient to follow.
`,
});

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    let bufs = [] as any[];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}

const explainLikeIm5Flow = ai.defineFlow(
  {
    name: 'explainLikeIm5Flow',
    inputSchema: ExplainLikeIm5InputSchema,
    outputSchema: ExplainLikeIm5OutputSchema,
  },
  async input => {
    const {output: explanation} = await explainLikeIm5Prompt(input);
    if (!explanation) {
      throw new Error('Failed to generate explanation');
    }

    try {
      const {media} = await ai.generate({
        model: googleAI.model('gemini-2.5-flash-preview-tts'),
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: {voiceName: 'Algenib'},
            },
          },
        },
        prompt: explanation.simpleExplanation,
      });
      if (!media) {
        throw new Error('no media returned');
      }

      const audioBuffer = Buffer.from(
        media.url.substring(media.url.indexOf(',') + 1),
        'base64'
      );
      const wavBase64 = await toWav(audioBuffer);

      return {
        ...explanation,
        audioDataUri: `data:audio/wav;base64,${wavBase64}`,
      };
    } catch (error) {
        console.error("Failed to generate audio, returning text only:", error);
        // If audio generation fails (e.g. due to rate limiting),
        // we can still return the text explanation.
        return {
            ...explanation,
            audioDataUri: undefined,
        };
    }
  }
);
