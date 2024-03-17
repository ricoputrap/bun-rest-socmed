import { Elysia } from "elysia";
import UserService from "../../user/user-service";
import { newUserModel } from "../auth-model";
import { EnumHttpStatusCode, ErrorResponse, SuccessResponse } from "../../../constants";

const userService = new UserService();

const register = new Elysia()
  .use(newUserModel)
  .post("/register", async ({ body, set }) => {
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
    body: 'new-user'
  });

export default register;