import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { HttpError } from '../utils/HttpError';
import { ApiResponse } from '../utils/response.helpers';

export class UserController {
  private static userService = new UserService();

  public static async create(req: Request, res: Response): Promise<void> {
    const task = "CREATE_USER";
    try {
      const { name, email, password, role } = req.body;

      const user = await UserController.userService.createUser({ name, email, password, role });

      const userSafe = { ...user, password: undefined };
      console.log(task + "_SUCCESS");
      ApiResponse.success(res, userSafe, "User created successfully", 201);
    } catch (err) {
      UserController.handleError(res, err, task, "Failed to create user");
    }
  }

  public static async login(req: Request, res: Response): Promise<void> {
    const task = "USER_LOGIN";
    try {
      const { email, password } = req.body;

      const result = await UserController.userService.login({ email, password });
      console.log(task + "_SUCCESS");
      ApiResponse.success(res, result, "Login successful");
    } catch (err: any) {
      UserController.handleError(res, err, task, "Login failed");
    }
  }

  public static async logout(req: Request, res: Response): Promise<void> {
    const task = "USER_LOGOUT";
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw new HttpError("User not authenticated", 401);
      }

      await UserController.userService.logout(userId);
      console.log(task + "_SUCCESS");
      ApiResponse.success(res, null, "Logout successful");
    } catch (err) {
      UserController.handleError(res, err, task, "Logout failed");
    }
  }

  private static handleError(res: Response, err: any, task: string, fallback: string) {
    console.error(task + "_ERROR", err);
    if (err instanceof HttpError) {
      ApiResponse.error(res, {}, err.message, err.statusCode);
    } else {
      ApiResponse.error(res, err, fallback);
    }
  }
}
