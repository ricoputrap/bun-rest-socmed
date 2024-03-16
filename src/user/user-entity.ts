export type UserData = {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  profilePicture: string;
  createdAt: number;
  isActive: boolean;
}

export type User = Omit<UserData, 'password'>;

export type UserInput = {
  name: string;
  username: string;
  email: string;
  password: string;
}