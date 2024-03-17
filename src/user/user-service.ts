import { User, UserInput, UserWithPassword } from "./user-entity";
import UserRepository from "./user-repository";
import { IUserRepository } from "./user-repository.types";

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

  async getByUsername(username: string, withPassword: boolean = false): Promise<
    User | UserWithPassword | undefined
  > {
    return this.userRepository.getByUsername(username, withPassword);
  }

  async create(newUser: UserInput): Promise<number> {
    // validate username
    const userByUsername = await this.userRepository.getByUsername(newUser.username);
    if (userByUsername) {
      throw new Error("Username already exists");
    }

    // validate email
    const userByEmail = await this.userRepository.getByEmail(newUser.email);
    if (userByEmail) {
      throw new Error("Email already exists");
    }

    // hash password
    newUser.password = await Bun.password.hash(newUser.password);

    return this.userRepository.create(newUser);
  }
}

export default UserService;