import db from "../../db";
import { User, UserData, UserInput, UserWithPassword } from "./user-entity";
import { IUserRepository } from "./user-repository.types";

class UserRepository implements IUserRepository {
  getAll(): Promise<User[]> {
    return new Promise((resolve) => {
      const users = db.query<UserData, null>(`
        SELECT id, name, username, email, profile_picture, created_at
        FROM user
        WHERE is_active = 1
      `).all(null);

      resolve(users);
    })
  }

  getById(id: number, isActive: boolean = true): Promise<User | undefined>  {
    return new Promise((resolve) => {
      const is_active: number = isActive ? 1 : 0;
      const user = db.query<UserData, [number, number]>(`
        SELECT id, name, username, email, profile_picture, created_at
        FROM user
        WHERE id = ? AND is_active = ?
      `).get(id, is_active);

      if (user) resolve(user);
      else resolve(undefined);
    })
  }

  getByUsername(username: string, withPassword: boolean = false): Promise<
    User | UserWithPassword | undefined
  > {
    return new Promise((resolve) => {
      let columns = "id, name, username, email, profile_picture, created_at";
      if (withPassword) columns = `${columns}, password`;

      const user = db.query<UserData, [string]>(`
        SELECT ${columns}
        FROM user
        WHERE username = ? AND is_active = 1
      `).get(username);

      if (user) resolve(user);
      else resolve(undefined);
    })
  }

  getByEmail(email: string, isActive: boolean = true): Promise<User | undefined> {
    return new Promise((resolve) => {
      const is_active: number = isActive ? 1 : 0;
      const user = db.query<UserData, [string, number]>(`
        SELECT id, name, username, email, profile_picture, created_at
        FROM user
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