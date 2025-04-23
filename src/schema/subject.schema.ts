import { z } from 'zod';

const noHTMLScript = (val: string) => !/<[^>]*script|<[^>]+>/i.test(val);

const safeString = () =>
  z
    .string()
    .optional()
    .refine((val) => val === undefined || noHTMLScript(val), {
      message: 'Field must not contain HTML or script tags',
    });

const translationSchema = z.object({
  language_code: z
    .string()
    .transform((val) => val.toLowerCase())
    .refine((val) => /^[a-z]{2}$/.test(val), {
      message: 'language_code must be a valid 2-letter lowercase code (e.g., "en")',
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
    .optional()
    .refine((val) => val === undefined || noHTMLScript(val), {
      message: 'description must not contain HTML or script tags',
    }),
});

export const subjectBodySchema = z.object({
  exam_type: z
    .string()
    .transform((val) => val.toLowerCase())
    .refine(noHTMLScript, {
      message: 'exam_type must not contain HTML or script tags',
    }),

  translations: z
    .array(translationSchema)
    .min(1, { message: 'At least one translation is required' }),
});

export const subjectQuerySchema = z.object({
  page: z
    .string()
    .optional()
    .refine((val) => val === undefined || !isNaN(Number(val)), {
      message: 'page must be a valid number',
    }),

  limit: z
    .string()
    .optional()
    .refine((val) => val === undefined || !isNaN(Number(val)), {
      message: 'limit must be a valid number',
    }),

  sortBy: safeString(),
  search: safeString(),
  exam_type: safeString(),
});
