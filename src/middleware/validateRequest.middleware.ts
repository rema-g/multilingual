import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { subjectBodySchema, subjectQuerySchema } from '../schema/subject.schema'; 

const noHTMLScript = (val?: string) => typeof val === 'string' && !/<[^>]*script|<[^>]+>/i.test(val);

const querySchema = subjectQuerySchema;

const idParamSchema = z.object({
  id: z.string().refine(val => /^\d+$/.test(val), {
    message: 'id must be a numeric string',
  }),
});

const idAndLangParamSchema = z.object({
  id: z.string().refine(val => /^\d+$/.test(val), {
    message: 'id must be a numeric string',
  }),
  language_code: z.string().refine(val => /^[a-z]{2}$/i.test(val), {
    message: 'language_code must be a 2-letter code',
  }),
});

type ValidationMap = {
  [pathPattern: string]: {
    [method: string]: {
      query?: z.ZodSchema;
      body?: z.ZodSchema;
      params?: z.ZodSchema;
    };
  };
};

const validationConfig: ValidationMap = {
  '/api/subjects': {
    get: { query: querySchema },
    post: { body: subjectBodySchema },
  },
  '/api/subjects/:id': {
    get: { params: idParamSchema },
    put: { body: subjectBodySchema, params: idParamSchema },
    delete: { params: idParamSchema },
  },
  '/api/subjects/:id/translations/:language_code': {
    delete: { params: idAndLangParamSchema },
  },
};

function matchPath(reqPath: string): string | undefined {
    const cleanPath = reqPath.replace(/\?.*$/, '').replace(/\/$/, '');
  
    return Object.keys(validationConfig).find((pattern) => {
      const regex = new RegExp('^' + pattern.replace(/:[^/]+/g, '[^/]+') + '$');
      return regex.test(cleanPath);
    });
}  

export const validateRequest = (req: Request, res: Response, next: NextFunction): void => {

  const fullPath = (req.baseUrl + req.path).replace(/\/$/, '');

  const matchedPath = matchPath(fullPath);
  const method = req.method.toLowerCase();

  const methodSchemas = matchedPath ? validationConfig[matchedPath]?.[method] : null;

  if (!methodSchemas) {
    next();
    return;
  }

  if (methodSchemas.query) {
    const result = methodSchemas.query.safeParse(req.query);
    if (!result.success) {
      res.status(400).json({ message: 'Query validation failed', errors: result.error.errors });
      return; 
    }
  }

  if (methodSchemas.body) {
    const result = methodSchemas.body.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ message: 'Body validation failed', errors: result.error.errors });
      return;
    }
  }

  if (methodSchemas.params) {
    const result = methodSchemas.params.safeParse(req.params);
    if (!result.success) {
      res.status(400).json({ message: 'Params validation failed', errors: result.error.errors });
      return;
    }
  }

  next();
};
