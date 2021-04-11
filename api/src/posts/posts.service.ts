import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreatePostDto } from "./dto/create-post.dto";
import { Post } from "./post.entity";

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  create(createUserDto: CreatePostDto): Promise<Post> {
    const post = new Post();
    post.title = createUserDto.title;

    return this.postRepository.save(post);
  }

  findAll(): Promise<Post[]> {
    return this.postRepository.find();
  }

  findOne(id: number): Promise<Post> {
    return this.postRepository.findOne(id);
  }

  async updateOne(id: number, title: string): Promise<any> {
    const post = await this.findOne(id);
    if (!post) return null;
    return this.postRepository.save({ ...post, title });
  }

  async remove(id: number): Promise<boolean> {
    try {
      await this.postRepository.delete(id);
    } catch {
      return false;
    }
    return true;
  }
}
