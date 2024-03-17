import { PostData, PostInput } from "./post-entity";

export interface IPostRepository {
  getAll(): Promise<PostData[]>;
  create(post: PostInput): Promise<number>;
}