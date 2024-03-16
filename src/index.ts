import { Elysia } from "elysia";
import userController from "./user/user-controller";

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .use(userController)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
