import { Elysia } from "elysia";
import userController from "./domain/user/user-controller";
import swagger from "@elysiajs/swagger";
import authController from "./domain/auth/auth-controller";
import postController from "./domain/post/post-controller";
import { jwtAccessSetup } from "./domain/auth/jwt-setup";
import { EnumHttpStatusCode, ErrorResponse } from "./constants";

const app = new Elysia()
  .use(swagger())
  .get("/", () => {
    return {
      text: "Hello, Elysia!"
    };
  })
  .use(authController)
  .use(jwtAccessSetup)
  .onBeforeHandle(async ({ jwt, set, request: { headers } }) => {
    try {
      const authorization = headers.get("Authorization");
  
      // "Authorization" header is missing
      if (!authorization) {
        throw new Error("Missing authorization header");
      }
  
      // "Authorization" : "Bearer <token>"
      const token = authorization.split(" ")[1];
  
      // token is missing
      if (!token) {
        throw new Error("Missing token");
      }
  
      // validate payload
      const user = await jwt.verify(token);
  
      if (!user) {
        throw new Error("Invalid token");
      }
    }
    catch (error: any) {
      set.status = EnumHttpStatusCode.UNAUTHORIZED;
      const errorResponse: ErrorResponse = {
        statusCode: EnumHttpStatusCode.UNAUTHORIZED,
        error: "Unauthorized",
        message: error.message
      }

      return errorResponse;
    }
  })
  .use(userController)
  .use(postController)
  // todo .use(searchController)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
