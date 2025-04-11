import { Request, Response } from 'express';
import { SubjectService } from '../services/subject.service';

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

    const result = await SubjectService.getSubjects(filters);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching subjects', error: err });
  }
};

export const getById = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await SubjectService.getSubjectById(+req.params.id);
    if (!data) {
      res.status(404).json({ message: 'Subject not found' });
      return;
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching subject', error: err });
  }
};

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Incoming request body:', req.body);
    const created = await SubjectService.createSubject(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ message: 'Error creating subject', error: err });
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await SubjectService.updateSubject(+req.params.id, req.body);
    if (!updated) {
      res.status(404).json({ message: 'Subject not found' });
      return;
    }
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating subject', error: err });
  }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const success = await SubjectService.deleteSubject(+req.params.id);
    if (!success) {
      res.status(404).json({ message: 'Subject not found' });
      return;
    }
    res.status(200).json({ message: 'Subject deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting subject', error: err });
  }
};
