import { PostData, PostInput } from "./post-entity";

export interface IPostRepository {
  getAll(size: number, cursor: number, user_id?: number): Promise<PostData[]>;
  create(post: PostInput): Promise<number>;
}