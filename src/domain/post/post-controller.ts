import { Elysia } from "elysia";
import { EnumPostMood, EnumPostPrivacy, PostInput, postModel } from "./post-entity";
import PostService from "./post-service";
import { EnumHttpStatusCode, ErrorResponse, SuccessResponse } from "../../constants";
import { jwtAccessSetup } from "../auth/jwt-setup";

const postService = new PostService();

const postController = new Elysia({ prefix: "/posts" })
  .use(jwtAccessSetup)
  .derive(async ({ jwt, request: { headers } }) => {
    const authorization = headers.get("Authorization") ?? "Bearer ";

    // "Authorization" : "Bearer <token>"
    const token = authorization.split(" ")[1];
  
    // token is missing
    if (!token) {
      throw new Error("Missing token");
    }

    // validate payload
    const payload = await jwt.verify(token);

    if (!payload) {
      throw new Error("Invalid token");
    }

    return { payload };
  })
  .use(postModel)
  .get("/", async ({ set, query }) => {
    try {
      const size = query.size ? parseInt(query.size) : 10;
      const cursor = query.cursor ? parseInt(query.cursor) : Number.MAX_VALUE;

      const posts = await postService.getAll(size, cursor);
      let next_cursor = posts[posts.length - 1]?.id ?? 0;

      const response: SuccessResponse = {
        data: {
          posts,
          pagination: {
            size,
            next_cursor
          }
        },
        statusCode: EnumHttpStatusCode.OK
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
  })
  .post("/create", async ({ body, set, payload }) => {
    try {
      if (body.content === "") {
        throw new Error("Content is required");
      }

      const newPost: PostInput = {
        content: body.content,
        mood: body.mood ?? EnumPostMood.NORMAL,
        privacy: body.privacy ?? EnumPostPrivacy.PUBLIC,
        user_id: payload.id
      }

      const postId = await postService.create(newPost);

      set.status = EnumHttpStatusCode.CREATED;
      const response: SuccessResponse = {
        data: {
          id: postId
        },
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
    body: 'post-create'
  })

export default postController;