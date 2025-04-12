import { Request, Response } from 'express';
import { SubjectService } from '../services/subject.service';
import { HttpError } from '../utils/HttpError';
import { SubjectErrors } from '../errors/message';

export class SubjectController {
  private static subjectService = new SubjectService();

  public static async getAllSubjects(req: Request, res: Response): Promise<void> {
    try {
      const filters = this.parseFilters(req);
      const result = await this.subjectService.getSubjects(filters);
      res.status(200).json(result);
    } catch (err) {
      console.error('Get all subjects error:', err); 
      res.status(500).json({ message: SubjectErrors.FETCH_ERROR, error: err });
    }
  }

  public static async getById(req: Request, res: Response): Promise<void> {
    try {
      const subject = await this.subjectService.getSubjectById(+req.params.id);
      if (!subject) {
        res.status(404).json({ message: SubjectErrors.NOT_FOUND });
        return;
      }
      res.status(200).json(subject);
    } catch (err) {
      res.status(500).json({ message: SubjectErrors.FETCH_ERROR, error: err });
    }
  }

  public static async create(req: Request, res: Response): Promise<void> {
    try {
      const subject = await this.subjectService.createSubject(req.body);
      res.status(201).json(subject);
    } catch (err) {
      if (err instanceof HttpError) {
        res.status(err.statusCode).json({ message: err.message });
      } else {
        res.status(500).json({ message: SubjectErrors.CREATE_ERROR, error: err });
      }
    }
  }

  public static async update(req: Request, res: Response): Promise<void> {
    try {
      const subject = await this.subjectService.updateSubject(+req.params.id, req.body);
      res.status(200).json(subject);
    } catch (err) {
      if (err instanceof HttpError) {
        res.status(err.statusCode).json({ message: err.message });
      } else {
        res.status(500).json({ message: SubjectErrors.UPDATE_ERROR, error: err });
      }
    }
  }

  public static async remove(req: Request, res: Response): Promise<void> {
    try {
      await this.subjectService.deleteSubject(+req.params.id);
      res.status(200).json({ message: 'Subject deleted successfully' });
    } catch (err) {
      if (err instanceof HttpError) {
        res.status(err.statusCode).json({ message: err.message });
      } else {
        res.status(500).json({ message: SubjectErrors.DELETE_ERROR, error: err });
      }
    }
  }

  private static parseFilters(req: Request) {
    const {
      page = 1,
      limit = 10,
      search = '',
      sortBy = 'createdAt',
      order = 'DESC',
    } = req.query;

    return {
      search: search.toString(),
      sortBy: sortBy.toString(),
      order: order.toString().toUpperCase() === 'ASC' ? 'ASC' : 'DESC',
      page: parseInt(page.toString(), 10),
      limit: parseInt(limit.toString(), 10),
    };
  }
}