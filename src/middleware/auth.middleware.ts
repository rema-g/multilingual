import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import { ApiResponse } from '../utils/response.helpers';
import { UserRepository } from '../repositories/user.repositories';

interface JwtPayload {
  id: number;
  email: string;
  role: string;
  exp?: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

const userRepository = new UserRepository();

export const validateSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return ApiResponse.error(res, null, 'No token provided', 401);
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return ApiResponse.error(res, null, 'Invalid token format', 401);
    }

    try {
      const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload;
      
      const expirationTime = decoded.exp ? decoded.exp * 1000 : 0;
      const currentTime = Date.now();
      const fiveMinutes = 5 * 60 * 1000;

      if (expirationTime - currentTime <= fiveMinutes) {
        return ApiResponse.error(res, null, 'Token is about to expire', 401);
      }

      const user = await userRepository.findById(decoded.id);
      if (!user) {
        return ApiResponse.error(res, null, 'User not found', 401);
      }

      req.user = decoded;
      next();
    } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
        return ApiResponse.error(res, null, 'Token has expired', 401);
      }
      return ApiResponse.error(res, null, 'Invalid token', 401);
    }
  } catch (error) {
    return ApiResponse.error(res, error, 'Authentication failed', 500);
  }
};