import { Response } from "express";

export class ApiResponse {
  static success(
    res: Response,
    data: any,
    message = "Success",
    statusCode = 200
  ): void {
    if (!res.headersSent) {
      res.status(statusCode).json({
        success: true,
        message,
        data,
      });
    }
  }

  static error(
    res: Response,
    error: any,
    message = "Something went wrong",
    statusCode = 500
  ): void {
    if (!res.headersSent) {
      res.status(statusCode).json({
        success: false,
        message,
        error,
      });
    }
  }
}
