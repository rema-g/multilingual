import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";
import { UserRepository } from "../repositories/user.repositories";
import { LoginDTO } from "../dtos/user.dto";
import { User } from "../models/user.model";
import { UserCreationAttributes } from "../models/user.model";
import { HttpError } from "../utils/HttpError";
import config from '../config/config';


const JWT_SECRET = config.jwt.secret;
const JWT_EXPIRES_IN = config.jwt.expiresIn;

export class UserService {
    private userRepository = new UserRepository();

    async createUser(userData: UserCreationAttributes): Promise<User> {
        const user = await User.create(userData);
        return user;
    }

    public async login({ email, password }: LoginDTO): Promise<{ access_token: string; refresh_token: string; user: Partial<User> }> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) throw new HttpError("Invalid email or password", 401);
    
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new HttpError("Invalid email or password", 401);
        
        const payload = { id: user.id, email: user.email, role: user.role }

        const access_token = jwt.sign( payload, JWT_SECRET,
          { expiresIn: JWT_EXPIRES_IN } as SignOptions
        );

        const refresh_token = jwt.sign( payload, JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN } as SignOptions
          );

        await this.userRepository.updateRefreshToken(user.id, refresh_token);

        const updatedUser = await this.userRepository.findById(user.id);
        if (!updatedUser) throw new HttpError("User not found after login", 500);

        const userSafe = { ...updatedUser.get(), password: undefined };
    
        return { access_token: access_token,refresh_token:refresh_token ,user: userSafe };
      }
}
