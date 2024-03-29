import db from "../../db";
import { PostData, PostInput } from "./post-entity";
import { IPostRepository } from "./post-repository.types";

class PostRepository implements IPostRepository {
  /**
   * Retrieve all post data with optional pagination parameters
   * from the oldest one to the newest one
   * but the news one should be printed first
   *
   * @param {number} size - the number of items to retrieve
   * @param {number} cursor - the post id to start retrieving items from
   * @return {Promise<PostData[]>} a promise that resolves with an array of PostData
   */
  getAll(size: number, cursor: number, user_id: number): Promise<PostData[]> {
    return new Promise((resolve) => {
      let query = `
        SELECT id, content, mood, privacy, created_at, user_id
        FROM post
        WHERE id < ? ${user_id > 0 ? "AND user_id = ?" : ""}
        ORDER BY id DESC
        LIMIT ?
      `;

      const posts = user_id > 0
        ? db
          .query<PostData, [number, number, number]>(query)
          .all(cursor, user_id, size) as PostData[]
        : db
          .query<PostData, [number, number]>(query)
          .all(cursor, size) as PostData[]

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