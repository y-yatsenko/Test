import { Request, Response } from "express";
import { IPostRepository } from "../repositories/ContentfulRepository.ts";

class PostController {
  constructor(postRepository: IPostRepository) {
    this.postRepository = postRepository;
  }
  postRepository: IPostRepository;

  public getAllPosts = async (req: Request, res: Response) => {
    try {
      const response = await this.postRepository.getPosts();

      return res.status(200).json(response);
    } catch (e) {
      console.error("Error fetching posts:", e);
      res.status(500).json({ message: "Error fetching posts from cms" });
    }
  }

  public getPostById = async (req: Request, res: Response) => {
    try {
      const id: string = req.params.id;
      const response = await this.postRepository.getPostById(id);

      return res.status(200).json(response);
    } catch (e) {
      console.error("Error fetching post:", e);
      res.status(500).json({ message: "Error fetching post from cms" });
    }
  }
}

export default PostController;
