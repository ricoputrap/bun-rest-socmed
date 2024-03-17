import cookie from "@elysiajs/cookie";
import { Elysia } from "elysia";
import { basicAuthModel } from "../auth-model";
import { jwtAccessSetup, jwtRefreshSetup } from "../jwt-setup";
import { EnumHttpStatusCode, ErrorResponse, SuccessResponse } from "../../../constants";
import UserService from "../../user/user-service";
import { UserWithPassword } from "../../user/user-entity"

const userService = new UserService();

const login = new Elysia()
  .use(cookie())
  .use(basicAuthModel)
  .use(jwtAccessSetup)
  .use(jwtRefreshSetup)
  .post("/login", async ({ body, set, jwt, jwtRefresh, setCookie }) => {
    try {
      const { username, password } = body;

      // validate username and password are not empty
      if (!username || !password) {
        throw new Error("Username and password are required");
      }

      // validate user exists
      const user = await userService.getByUsername(username, true) as UserWithPassword;
      if (!user) {
        set.status = EnumHttpStatusCode.FORBIDDEN;
        const response: ErrorResponse = {
          statusCode: EnumHttpStatusCode.FORBIDDEN,
          error: "Forbidden",
          message: "User not found"
        }

        return response;
      }

      // validate password
      const isPasswordValid = await Bun.password.verify(password, user.password);
      if (!isPasswordValid) {
        set.status = EnumHttpStatusCode.FORBIDDEN;
        const response: ErrorResponse = {
          statusCode: EnumHttpStatusCode.FORBIDDEN,
          error: "Forbidden",
          message: "Invalid password"
        }

        return response;
      }

      // create access token
      const accessToken = await jwt.sign({
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        profile_picture: user.profile_picture ?? ""
      });

      // create refresh token
      const refreshToken = await jwtRefresh.sign({
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        profile_picture: user.profile_picture ?? ""
      });

      setCookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
      })

      const response: SuccessResponse = {
        statusCode: EnumHttpStatusCode.OK,
        data: {
          accessToken
        }
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
    body: 'auth-sign'
  });


export default login;