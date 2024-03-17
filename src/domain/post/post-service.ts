import { PostData, PostInput } from "./post-entity";
import PostRepository from "./post-repository";
import { IPostRepository } from "./post-repository.types";

class PostService {
  private postRepository: IPostRepository;

  constructor() {
    this.postRepository = new PostRepository();
  }

  async getAll(): Promise<PostData[]> {
    return this.postRepository.getAll();
  }

  async create(post: PostInput): Promise<number> {
    return this.postRepository.create(post);
  }
}

export default PostService;