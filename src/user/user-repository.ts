import db from "../db";
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
    return new Promise((resolve) => {
      const users = db.query<UserData, null>(`
        SELECT * FROM user
        WHERE is_active = 1
      `).all(null);

      resolve(users);
    })
  }

  getById(id: number, isActive: boolean = true): Promise<User | undefined>  {
    return new Promise((resolve) => {
      const is_active: number = isActive ? 1 : 0;
      const user = db.query<UserData, [number, number]>(`
        SELECT * FROM user
        WHERE id = ? AND is_active = ?
      `).get(id, is_active);

      if (user) resolve(user);
      else resolve(undefined);
    })
  }

  getByUsername(username: string, isActive: boolean = true): Promise<User | undefined> {
    return new Promise((resolve) => {
      const is_active: number = isActive ? 1 : 0;
      const user = db.query<UserData, [string, number]>(`
        SELECT * FROM user
        WHERE username = ? AND is_active = ?
      `).get(username, is_active);

      if (user) resolve(user);
      else resolve(undefined);
    })
  }

  getByEmail(email: string, isActive: boolean = true): Promise<User | undefined> {
    return new Promise((resolve) => {
      const is_active: number = isActive ? 1 : 0;
      const user = db.query<UserData, [string, number]>(`
        SELECT * FROM user
        WHERE email = ? AND is_active = ?
      `).get(email, is_active);

      if (user) resolve(user);
      else resolve(undefined);
    });
  }

  create(user: UserInput): Promise<number> {
    return new Promise((resolve) => {
      const newUser = db.query<UserData, [string, string, string, string]>(`
        INSERT INTO user
        (name, username, email, password)
        VALUES (?, ?, ?, ?)
        RETURNING id
      `)
      .get(user.name, user.username, user.email, user.password) as UserData;

      resolve(newUser?.id);
    })
  }
}

export default UserRepository;