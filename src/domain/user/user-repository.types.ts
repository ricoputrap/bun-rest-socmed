import { User, UserInput, UserWithPassword } from "./user-entity"

export interface IUserRepository {
  getAll(): Promise<User[]>
  getById(id: number, is_active?: boolean): Promise<User | undefined>
  getByUsername(username: string, withPassword?: boolean): Promise<
    User | UserWithPassword | undefined
  >
  getByEmail(email: string, is_active?: boolean): Promise<User | undefined>
  create(user: UserInput): Promise<number>
}
