import { Request, Response } from "express";
import { SubjectService } from "../services/subject.service";
import { HttpError } from "../utils/HttpError";
import { SubjectErrors } from "../errors/message";
import { ApiResponse } from "../utils/response.helpers";

export class SubjectController {
  private static subjectService = new SubjectService();

  public static async get(
    req: Request,
    res: Response
  ): Promise<void> {
    const task = "GET_ALL_SUBJECT";
    try {
      const filters = SubjectController.parseFilters(req);
      const result = await SubjectController.subjectService.getSubjects(filters);
      console.log(task + "_SUCCESS");
      ApiResponse.success(res, result, "Subjects fetched successfully");
    } catch (err) {
      console.error(task + "_ERROR", err);
      ApiResponse.error(res, err, SubjectErrors.FETCH_ERROR);
    }
  }

  public static async getById(req: Request, res: Response): Promise<void> {
    const task = "GET_SUBJECT";
    try {
      const subject = await SubjectController.subjectService.getSubjectById(+req.params.id);
      if (!subject) {
        return ApiResponse.error(res, {}, SubjectErrors.NOT_FOUND, 404);
      }
      console.log(task + "_SUCCESS");
      ApiResponse.success(res, subject, "Subject fetched successfully");
    } catch (err) {
      console.error(task + "_ERROR", err);
      ApiResponse.error(res, err, SubjectErrors.FETCH_ERROR);
    }
  }

  public static async create(req: Request, res: Response): Promise<void> {
    const task = "CREATE_SUBJECT";
    try {
      const subject = await SubjectController.subjectService.createSubject(req.body);
      console.log(task + "_SUCCESS");
      ApiResponse.success(res, subject, "Subject created successfully", 201);
    } catch (err) {
      if (err instanceof HttpError) {
        ApiResponse.error(res, {}, err.message, err.statusCode);
      } else {
        console.error(task + "_ERROR", err);
        ApiResponse.error(res, err, SubjectErrors.CREATE_ERROR);
      }
    }
  }

  public static async update(req: Request, res: Response): Promise<void> {
    const task = "UPDATE_SUBJECT";
    try {
      const subject = await SubjectController.subjectService.updateSubject(
        +req.params.id,
        req.body
      );
      console.log(task + "_SUCCESS");
      ApiResponse.success(res, subject, "Subject updated successfully");
    } catch (err) {
      if (err instanceof HttpError) {
        console.error(task + "_ERROR", err);
        ApiResponse.error(res, {}, err.message, err.statusCode);
      } else {
        console.error(task + "_ERROR", err);
        ApiResponse.error(res, err, SubjectErrors.UPDATE_ERROR);
      }
    }
  }

  public static async remove(req: Request, res: Response): Promise<void> {
    const task = "DELETE_SUBJECT";
    try {
      await SubjectController.subjectService.deleteSubject(+req.params.id);
      console.log(task + "_SUCCESS");
      ApiResponse.success(res, null, "Subject deleted successfully");
    } catch (err) {
      if (err instanceof HttpError) {
        console.error(task + "_ERROR", err);
        ApiResponse.error(res, {}, err.message, err.statusCode);
      } else {
        console.error(task + "_ERROR", err);
        ApiResponse.error(res, err, SubjectErrors.DELETE_ERROR);
      }
    }
  }

  public static async removeTranslation(req: Request, res: Response): Promise<void> {
    const { id, language_code } = req.params;
    const task = "DELETE_TRANSLATION";
  
    try {
      await SubjectController.subjectService.softDeleteTranslation(+id, language_code);
      console.log(task + "_SUCCESS");
      ApiResponse.success(res, null, "Translation deleted successfully");
    } catch (err) {
      console.error(task + "_ERROR", err);
      ApiResponse.error(res, err, "Error soft deleting translation");
    }
  }

  private static parseFilters(req: Request) {
    const {
      page = 1,
      limit = 10,
      search = "",
      sortBy = "created_at",
      order = "DESC",
    } = req.query;

    return {
      search: search.toString(),
      sortBy: sortBy.toString(),
      order: order.toString().toUpperCase() === "ASC" ? "ASC" : "DESC",
      page: parseInt(page.toString(), 10),
      limit: parseInt(limit.toString(), 10),
    };
  }
}
