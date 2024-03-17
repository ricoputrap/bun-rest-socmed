import { Elysia, t } from "elysia";
import UserService from "./user-service";
import { EnumHttpStatusCode, ErrorResponse, SuccessResponse } from "../../constants";

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
);

export default userController;