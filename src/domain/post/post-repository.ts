import db from "../../db";
import { PostData, PostInput } from "./post-entity";
import { IPostRepository } from "./post-repository.types";

class PostRepository implements IPostRepository {
  getAll(): Promise<PostData[]> {
    return new Promise((resolve) => {
      const posts = db
        .query<PostData, null>(`SELECT * FROM post`)
        .all(null) as PostData[];

      resolve(posts);
    })
  }

  create(post: PostInput): Promise<number> {
    return new Promise((resolve) => {
      const newPost = db.query<PostData, [string, number, number, number]>(`
        INSERT INTO post
        (content, mood, privacy, user_id)
        VALUES (?, ?, ?, ?)
        RETURNING id
      `)
      .get(post.content, post.mood, post.privacy, post.user_id) as PostData;

      resolve(newPost.id);
    })
  }
}

export default PostRepository;