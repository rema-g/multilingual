// src/schema/subject.schema.ts
import { z } from 'zod';

const noHTMLScript = (val: string) => !/<[^>]*script|<[^>]+>/i.test(val);
const languageCodePattern = /^[a-z]{2}$/;

const translationSchema = z.object({
  language_code: z
    .string()
    .refine(val => languageCodePattern.test(val), {
      message: 'language_code must be a valid 2-letter code (e.g., "en")',
    })
    .refine(noHTMLScript, {
      message: 'language_code must not contain HTML or script tags',
    }),
  name: z
    .string()
    .refine(noHTMLScript, {
      message: 'name must not contain HTML or script tags',
    }),
  description: z
    .string()
    .refine(noHTMLScript, {
      message: 'description must not contain HTML or script tags',
    }),
});

export const subjectBodySchema = z.object({
  exam_type: z
    .string()
    .refine(noHTMLScript, {
      message: 'exam_type must not contain HTML or script tags',
    }),
  translations: z
    .array(translationSchema)
    .min(1, { message: 'At least one translation is required' }),
});
