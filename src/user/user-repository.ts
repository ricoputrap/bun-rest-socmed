import users from "./data";
import { User, UserData, UserInput } from "./user-entity";

export interface IUserRepository {
  getAll(): Promise<User[]>
  getById(id: number, is_active?: boolean): Promise<User | undefined>
  getByUsername(username: string, is_active?: boolean): Promise<User | undefined>
  getByEmail(email: string, is_active?: boolean): Promise<User | undefined>
  create(user: UserInput): Promise<number>
}

class UserRepository implements IUserRepository {
  getAll(): Promise<User[]> {
    return new Promise((resolve) => resolve(users.filter(user => user.isActive)))
  }

  getById(id: number, isActive: boolean = true): Promise<User | undefined>  {
    return new Promise((resolve) => {
      resolve(users.find(user => user.id == id && user.isActive == isActive))
    })
  }

  getByUsername(username: string, isActive: boolean = true): Promise<User | undefined> {
    return new Promise((resolve) => {
      resolve(users.find(user => user.username == username && user.isActive == isActive))
    })
  }

  getByEmail(email: string, isActive: boolean = true): Promise<User | undefined> {
    return new Promise((resolve) => {
      resolve(users.find(user => user.email == email && user.isActive == isActive))
    })
  }

  create(user: UserInput): Promise<number> {
    return new Promise((resolve) => {

      const newUser: UserData = {
        ...user,
        id: users.length + 1,
        createdAt: Date.now(),
        isActive: true,
        profilePicture: ""
      }

      users.push(newUser);
      resolve(newUser.id);
    })
  }
}

export default UserRepository;