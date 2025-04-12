import { Request, Response } from 'express';
import { SubjectService } from '../services/subject.service';
import { HttpError } from '../utils/HttpError';
import { SubjectErrors } from '../errors/message';

const subjectService = new SubjectService();

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 10, search = '', sortBy = 'createdAt', order = 'DESC' } = req.query;

    const filters = {
      search: search.toString(),
      sortBy: sortBy.toString(),
      order: order.toString().toUpperCase() === 'ASC' ? 'ASC' : 'DESC',
      page: parseInt(page.toString(), 10),
      limit: parseInt(limit.toString(), 10),
    };

    const result = await subjectService.getSubjects(filters);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: SubjectErrors.FETCH_ERROR, error: err });
  }
};

export const getById = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await subjectService.getSubjectById(+req.params.id);
    if (!data) {
      res.status(404).json({ message: SubjectErrors.NOT_FOUND });
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: SubjectErrors.FETCH_ERROR, error: err });
  }
};

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const created = await subjectService.createSubject(req.body);
    res.status(201).json(created);
  } catch (err) {
    if (err instanceof HttpError) {
      res.status(err.statusCode).json({ message: err.message });
    } else {
      res.status(500).json({ message: SubjectErrors.CREATE_ERROR, error: err });
    }
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await subjectService.updateSubject(+req.params.id, req.body);
    res.status(200).json(updated);
  } catch (err) {
    if (err instanceof HttpError) {
      res.status(err.statusCode).json({ message: err.message });
    } else {
      res.status(500).json({ message: SubjectErrors.UPDATE_ERROR, error: err });
    }
  }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const success = await subjectService.deleteSubject(+req.params.id);
    res.status(200).json({ message: 'Subject deleted successfully' });
  } catch (err) {
    if (err instanceof HttpError) {
      res.status(err.statusCode).json({ message: err.message });
    } else {
      res.status(500).json({ message: SubjectErrors.DELETE_ERROR, error: err });
    }
  }
};