import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { PostService } from "./posts.service";
import { Post } from "./post.entity";
import { CreatePostDto } from "./dto/create-post.dto";

@Resolver()
export class PostsResolver {
  constructor(private postsService: PostService) {}

  @Query(() => [Post])
  async posts(): Promise<Post[]> {
    return this.postsService.findAll();
  }

  @Query(() => Post, { nullable: true })
  async post(
    @Args("id", { type: () => Int }) id: number,
  ): Promise<Post | null> {
    const post = await this.postsService.findOne(id);
    if (!post) return null;
    return post;
  }

  @Mutation(() => Post)
  async createPost(
    @Args("createPostInput") createPostInput: CreatePostDto,
  ): Promise<Post> {
    return this.postsService.create(createPostInput);
  }

  @Mutation(() => Post, { nullable: true })
  async updatePost(
    @Args("id") id: number,
    @Args("title") title: string,
  ): Promise<Post> {
    return this.postsService.updateOne(id, title);
  }

  @Mutation(() => Boolean)
  async deletePost(@Args("id") id: number): Promise<boolean> {
    return this.postsService.remove(id);
  }
}
