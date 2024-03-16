import { User, UserInput } from "./user-entity";
import UserRepository, { IUserRepository } from "./user-repository";

class UserService {
  private userRepository: IUserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getAll(): Promise<User[]> {
    return this.userRepository.getAll();
  }

  async getById(id: number, isActive: boolean = true): Promise<User | undefined> {
    return this.userRepository.getById(id, isActive);
  }

  async create(newUser: UserInput): Promise<number> {
    // validate username
    const user = await this.userRepository.getByEmail(newUser.email);
    if (user) {
      throw new Error("Email already exists");
    }

    // validate email

    return this.userRepository.create(newUser);
  }
}

export default UserService;