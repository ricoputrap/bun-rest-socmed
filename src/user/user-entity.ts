import { Elysia, t } from 'elysia'

export type UserData = {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  profile_picture?: string;
  is_active: boolean;
  created_at?: number;
}

export type User = Omit<UserData, 'password' | 'is_active'>;
export type UserWithPassword = Omit<UserData, 'is_active'>;

export type UserInput = {
  name: string;
  username: string;
  email: string;
  password: string;
}