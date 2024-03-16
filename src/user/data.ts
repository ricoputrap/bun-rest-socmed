import { UserData } from "./user-entity";

const users: UserData[] = [
  {
    id: 1,
    name: "Rico Putra",
    username: "ricoputra",
    email: "ricoputra@gmail.com",
    password: "1234",
    profilePicture: "https://i.pravatar.cc/300",
    createdAt: Date.now(),
    isActive: true
  },
  {
    id: 2,
    name: "Ryu",
    username: "ryu",
    email: "ryu@gmail.com",
    password: "1234",
    profilePicture: "https://i.pravatar.cc/300",
    createdAt: Date.now(),
    isActive: true
  }
];

export default users;