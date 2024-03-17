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

export type User = Omit<UserData, 'password'>;

export type UserInput = {
  name: string;
  username: string;
  email: string;
  password: string;
}