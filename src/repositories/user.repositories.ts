import { User, UserCreationAttributes } from "../models/user.model";

export class UserRepository {
  public async createUser(userData: UserCreationAttributes): Promise<User> {
    return await User.create(userData);
  }
  
  public async findByEmail(email: string): Promise<User | null> {
    return await User.findOne({ where: { email } });
  }
}