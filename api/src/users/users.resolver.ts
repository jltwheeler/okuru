import { Int, Resolver, Query, Mutation, Args } from "@nestjs/graphql";

import { UsersService } from "./users.service";
import { User, UserResponse } from "./user.entity";
import { CreateUserInput } from "./dto/create-user.input";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "src/auth/guards/gql-auth.guard";
import { CurrentUser } from "src/auth/current-user.decorator";

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return this.usersService.findOne(user.id);
  }

  @Query(() => [User])
  @UseGuards(GqlAuthGuard)
  users() {
    return this.usersService.findAll();
  }

  @Query(() => UserResponse, { nullable: true })
  async user(@Args("id", { type: () => Int }) id: number) {
    const user = await this.usersService.findOne(id);

    if (!user) {
      return {
        errors: [
          { field: "id", message: `The user with ID:${id} does not exist` },
        ],
      };
    }

    return { user };
  }

  @Mutation(() => UserResponse)
  async register(
    @Args("options") options: CreateUserInput,
  ): Promise<UserResponse> {
    const user = await this.usersService.create(options);

    if (!user) {
      return {
        errors: [
          { field: "username", message: "That username is already taken!" },
        ],
      };
    }
    return { user };
  }
}
