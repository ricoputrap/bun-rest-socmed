import { Elysia } from "elysia";
import login from "./routes/login";
import register from "./routes/register";

const authController = new Elysia({ prefix: "/auth" })
  .use(login)
  .use(register)

export default authController;