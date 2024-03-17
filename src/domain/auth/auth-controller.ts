import { Elysia } from "elysia";
import login from "./routes/login";

const authController = new Elysia({ prefix: "/auth" })
  .use(login);

export default authController;