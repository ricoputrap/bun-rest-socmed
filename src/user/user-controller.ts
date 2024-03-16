import { Elysia, t } from "elysia";
import UserService from "./user-service";
import { EnumHttpStatusCode } from "../constants";

const userController = new Elysia();
const userService = new UserService();

type SuccessResponse = {
  data: any;
  statusCode: EnumHttpStatusCode;
}

type ErrorResponse = {
  statusCode: EnumHttpStatusCode;
  error: string;
  message: string;
}

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
      const user = await userService.create(body);
      
      const response: SuccessResponse = {
        data: user,
        statusCode: EnumHttpStatusCode.CREATED
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