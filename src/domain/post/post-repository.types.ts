import { PostData, PostInput } from "./post-entity";

export interface IPostRepository {
  getAll(size: number, cursor: number): Promise<PostData[]>;
  create(post: PostInput): Promise<number>;
}