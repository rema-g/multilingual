import { Request, Response } from 'express';
import { SubjectService } from '../services/subject.service';
import { HttpError } from '../utils/HttpError';
import { SubjectErrors } from '../errors/message';
import { ApiResponse } from '../utils/response.helpers'; 

export class SubjectController {
  private static subjectService = new SubjectService();

  public static async getAllSubjects(req: Request, res: Response): Promise<void> {
    try {
      const filters = this.parseFilters(req);
      const result = await this.subjectService.getSubjects(filters);
      ApiResponse.success(res, result, 'Subjects fetched successfully');
    } catch (err) {
      console.error('Get all subjects error:', err);
      ApiResponse.error(res, err, SubjectErrors.FETCH_ERROR);
    }
  }

  public static async getById(req: Request, res: Response): Promise<void> {
    try {
      const subject = await this.subjectService.getSubjectById(+req.params.id);
      if (!subject) {
        return ApiResponse.error(res, {}, SubjectErrors.NOT_FOUND, 404);
      }
      ApiResponse.success(res, subject, 'Subject fetched successfully');
    } catch (err) {
      ApiResponse.error(res, err, SubjectErrors.FETCH_ERROR);
    }
  }

  public static async create(req: Request, res: Response): Promise<void> {
    try {
      const subject = await this.subjectService.createSubject(req.body);
      ApiResponse.success(res, subject, 'Subject created successfully', 201);
    } catch (err) {
      if (err instanceof HttpError) {
        ApiResponse.error(res, {}, err.message, err.statusCode);
      } else {
        ApiResponse.error(res, err, SubjectErrors.CREATE_ERROR);
      }
    }
  }

  public static async update(req: Request, res: Response): Promise<void> {
    try {
      const subject = await this.subjectService.updateSubject(+req.params.id, req.body);
      ApiResponse.success(res, subject, 'Subject updated successfully');
    } catch (err) {
      if (err instanceof HttpError) {
        ApiResponse.error(res, {}, err.message, err.statusCode);
      } else {
        ApiResponse.error(res, err, SubjectErrors.UPDATE_ERROR);
      }
    }
  }

  public static async remove(req: Request, res: Response): Promise<void> {
    try {
      await this.subjectService.deleteSubject(+req.params.id);
      ApiResponse.success(res, null, 'Subject deleted successfully');
    } catch (err) {
      if (err instanceof HttpError) {
        ApiResponse.error(res, {}, err.message, err.statusCode);
      } else {
        ApiResponse.error(res, err, SubjectErrors.DELETE_ERROR);
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