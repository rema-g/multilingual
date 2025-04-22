import { RequestHandler, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { subjectBodySchema } from '../schema/subject.schema';

const noHTMLScript = (val: string) => !/<[^>]*script|<[^>]+>/i.test(val);

const querySchema = z.object({
  page: z.string().optional().refine(val => !isNaN(Number(val ?? '')), {
    message: 'page must be a valid number',
  }),
  limit: z.string().optional().refine(val => !isNaN(Number(val ?? '')), {
    message: 'limit must be a valid number',
  }),
  sort: z.string().optional().refine(val => noHTMLScript(val ?? ''), {
    message: 'sort must not contain HTML or script tags',
  }),
  search: z.string().optional().refine(val => noHTMLScript(val ?? ''), {
    message: 'search must not contain HTML or script tags',
  }),
  exam_type: z.string().optional().refine(val => noHTMLScript(val ?? ''), {
    message: 'exam_type must not contain HTML or script tags',
  }),
});

type ValidationMap = {
  [path: string]: {
    [method: string]: {
      query?: z.ZodSchema;
      body?: z.ZodSchema;
    };
  };
};

const validationConfig: ValidationMap = {
  '/subjects': {
    get: { query: querySchema },
    post: { body: subjectBodySchema },
  },
};

export const validateRequest = (req: Request, res: Response, next: NextFunction): void=> {
  const path = req.path;
  const method = req.method.toLowerCase();

  const methodSchemas = validationConfig[path]?.[method];

  if (!methodSchemas) return next();

  if (methodSchemas.query) {
    const result = methodSchemas.query.safeParse(req.query);
    if (!result.success) {
       res.status(400).json({
        message: 'Query validation failed',
        errors: result.error.errors,
      });
      return;
    }
  }

  // Validate body
  if (methodSchemas.body) {
    const result = methodSchemas.body.safeParse(req.body);
    if (!result.success) {
       res.status(400).json({
        message: 'Body validation failed',
        errors: result.error.errors,
      });
      return;
    }
  }

  return next();
};
