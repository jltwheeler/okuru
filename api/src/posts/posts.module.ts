import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { PostService } from "./posts.service";
import { Post } from "./post.entity";
import { PostsResolver } from "./posts.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [PostService, PostsResolver],
})
export class PostModule {}
