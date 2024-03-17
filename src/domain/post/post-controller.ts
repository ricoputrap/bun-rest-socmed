import { Elysia } from "elysia";
import { EnumPostMood, EnumPostPrivacy, PostInput, postModel } from "./post-entity";
import PostService from "./post-service";
import { EnumHttpStatusCode, ErrorResponse, SuccessResponse } from "../../constants";

const postService = new PostService();

const postController = new Elysia({ prefix: "/posts" })
  .use(postModel)
  .get("/", async ({ set }) => {
    try {
      const posts = await postService.getAll();
      const response: SuccessResponse = {
        data: posts,
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
  .post("/create", async ({ body, set }) => {
    try {
      if (body.content === "") {
        throw new Error("Content is required");
      }

      const newPost: PostInput = {
        content: body.content,
        mood: body.mood ?? EnumPostMood.NORMAL,
        privacy: body.privacy ?? EnumPostPrivacy.PUBLIC,
        user_id: 1
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