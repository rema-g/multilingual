import { RequestHandler } from 'express';
import { subjectBodySchema } from '../schema/subject.schema';

export const validateBody: RequestHandler = (req, res, next) => {
  const result = subjectBodySchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      message: 'Validation failed',
      errors: result.error.errors,
    });
    return;
  }

  next();
};
