import { Elysia, t } from "elysia";
import UserService from "./user-service";
import { EnumHttpStatusCode, ErrorResponse, SuccessResponse } from "../constants";

const userController = new Elysia();
const userService = new UserService();

userController.group("/users", (app) => app
  // get all active users
  .get("/", async ({ set }) => {
    try {
      const users = await userService.getAll();
      const response: SuccessResponse = {
        data: users,
        statusCode: EnumHttpStatusCode.OK
      }

      return response;
    }
    catch (error) {
      set.status = EnumHttpStatusCode.INTERNAL_SERVER_ERROR;
      const errorResponse: ErrorResponse = {
        statusCode: EnumHttpStatusCode.INTERNAL_SERVER_ERROR,
        error: "Internal Server Error",
        message: "Something went wrong"
      }

      return errorResponse;
    }
  })

  // create new user
  .post("/", async ({ body, set }) => {
    try {
      if (body.name === "") {
        throw new Error("Name is required");
      }
      if (body.username === "") {
        throw new Error("Username is required");
      }
      if (body.email === "") {
        throw new Error("Email is required");
      }
      if (body.password === "") {
        throw new Error("Password is required");
      }

      const user = await userService.create(body);
      
      const response: SuccessResponse = {
        data: user,
        statusCode: EnumHttpStatusCode.CREATED
      }
      return response;
    }
    catch (error: any) {
      set.status = EnumHttpStatusCode.INTERNAL_SERVER_ERROR;

      const errorResponse: ErrorResponse = {
        statusCode: EnumHttpStatusCode.INTERNAL_SERVER_ERROR,
        error: "Internal Server Error",
        message: error.message
      }

      return errorResponse;
    }
  }, {
    body: t.Object({
      name: t.String(),
      username: t.String(),
      email: t.String(),
      password: t.String()
    })
  })
);

export default userController;