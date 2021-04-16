import { Resolver, Mutation, Args, ObjectType, Field } from "@nestjs/graphql";
import { CreateUserInput } from "src/users/dto/create-user.input";
import { FieldError } from "../utils/types";

import { AuthService } from "./auth.service";

@ObjectType()
export class LoginResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field({ nullable: true })
  access_token?: string;
}

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)
  async login(@Args("options") options: CreateUserInput) {
    const user = await this.authService.validate(
      options.username,
      options.password,
    );

    if (!user) {
      return {
        errors: [{ field: "password", message: "Incorrect user credentials" }],
      };
    }
    return this.authService.login(user);
  }
}
