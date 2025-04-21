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
      const user = await this.userService.createUser({ name, email, password, role });

      const userSafe = { ...user, password: undefined };
      console.log(task + "_SUCCESS");
      ApiResponse.success(res, userSafe, "User created successfully", 201);
    } catch (err) {
      if (err instanceof HttpError) {
        console.error(task + "_ERROR", err);
        ApiResponse.error(res, {}, err.message, err.statusCode);
      } else {
        console.error(task + "_ERROR", err);
        ApiResponse.error(res, err, "Failed to create user");
      }
    }
  }

  public static async login(req: Request, res: Response): Promise<void> {
    const task = "USER_LOGIN";

    try {
      const { email, password } = req.body;
      const result = await this.userService.login({ email, password });

      console.log(task + "_SUCCESS");
      ApiResponse.success(res, result, "Login successful");
    } catch (err: any) {
      console.error(task + "_ERROR", err);
      if (err instanceof HttpError) {
        ApiResponse.error(res, {}, err.message, err.statusCode);
      } else {
        ApiResponse.error(res, err, "Login failed");
      }
    }
  }
}
