import { User, UserCreationAttributes } from "../models/user.model";

export class UserRepository {
  public async createUser(userData: UserCreationAttributes): Promise<User> {
    return await User.create(userData);
  }
  
  public async findByEmail(email: string): Promise<User | null> {
    return await User.findOne({ where: { email } });
  }

  public async updateRefreshToken(userId: number, token: string): Promise<void> {
    await User.update({ refresh_token: token }, { where: { id: userId } });
  }
  
  public async findById(id: number): Promise<User | null> {
    return User.findByPk(id);
  }
}