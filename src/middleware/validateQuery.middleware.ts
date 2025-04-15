import { RequestHandler } from 'express';
import { z } from 'zod';

const noHTMLScript = (val: string) => !/<[^>]*script|<[^>]+>/i.test(val);

const querySchema = z.object({
  page: z
    .string()
    .optional()
    .refine(val => !isNaN(Number(val ?? '')), {
      message: 'page must be a valid number',
    }),

  limit: z
    .string()
    .optional()
    .refine(val => !isNaN(Number(val ?? '')), {
      message: 'limit must be a valid number',
    }),

  sort: z
    .string()
    .optional()
    .refine(val => noHTMLScript(val ?? ''), {
      message: 'sort must not contain HTML or script tags',
    }),

  search: z
    .string()
    .optional()
    .refine(val => noHTMLScript(val ?? ''), {
      message: 'search must not contain HTML or script tags',
    }),

  exam_type: z
    .string()
    .optional()
    .refine(val => noHTMLScript(val ?? ''), {
      message: 'exam_type must not contain HTML or script tags',
    }),
});

export const validateQuery: RequestHandler = (req, res, next) => {
  const result = querySchema.safeParse(req.query);

  if (!result.success) {
    res.status(400).json({
      message: 'Query validation failed',
      errors: result.error.errors,
    });
    return;
  }

  next();
};
