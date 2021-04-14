import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";

import { UsersService } from "./users.service";
import { UserResponse } from "./user.entity";
import { CreateUserInput } from "./dto/create-user.input";

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => UserResponse)
  register(@Args("options") options: CreateUserInput) {
    return this.usersService.create(options);
  }

  @Mutation(() => UserResponse)
  login(@Args("options") options: CreateUserInput) {
    return this.usersService.login(options);
  }
}
