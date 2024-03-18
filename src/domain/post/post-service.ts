import { PostData, PostInput } from "./post-entity";
import PostRepository from "./post-repository";
import { IPostRepository } from "./post-repository.types";

class PostService {
  private postRepository: IPostRepository;

  constructor() {
    this.postRepository = new PostRepository();
  }

  /**
   * Retrieves all post data with optional pagination parameters.
   *
   * @param {number} size - The number of items to retrieve
   * @param {number} cursor - An optional cursor for pagination, which is the post id
   * @return {Promise<PostData[]>} A promise that resolves to an array of PostData
   */
  async getAll(size: number, cursor: number, user_id: number): Promise<PostData[]> {
    return this.postRepository.getAll(size, cursor, user_id);
  }

  async create(post: PostInput): Promise<number> {
    return this.postRepository.create(post);
  }
}

export default PostService;