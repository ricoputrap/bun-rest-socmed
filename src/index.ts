import { Elysia } from "elysia";
import userController from "./domain/user/user-controller";
import swagger from "@elysiajs/swagger";
import authController from "./domain/auth/auth-controller";

const app = new Elysia()
  .use(swagger())
  .get("/", () => {
    return {
      text: "Hello, Elysia!"
    };
  })
  .use(userController)
  .use(authController)
  // todo .use(postController)
  // todo .use(searchController)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
