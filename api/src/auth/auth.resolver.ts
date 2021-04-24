import {
  Context,
  Resolver,
  Mutation,
  Args,
  ObjectType,
  Field,
  Int,
} from "@nestjs/graphql";

import { CreateUserInput } from "src/users/dto/create-user.input";
import { FieldError, GQLContext } from "../types";
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

  async revoke(@Args("userId", { type: () => Int }) userId: number) {
    await this.authService.revokeRefreshToken(userId);
    return true;
  }

  @Mutation(() => LoginResponse)
  async login(
    @Args("options") options: CreateUserInput,
    @Context() { res }: GQLContext,
  ) {
    const user = await this.authService.validate(
      options.username,
      options.password,
    );

    if (!user) {
      return {
        errors: [{ field: "password", message: "Incorrect user credentials" }],
      };
    }

    const refreshToken = this.authService.generateRefreshToken(user);
    res.cookie("jid", refreshToken, { httpOnly: true, path: "/refresh_token" });

    return this.authService.generateAccessToken(user);
  }

  @Mutation(() => Boolean)
  logout(@Context() { res }: GQLContext) {
    res.cookie("jid", "", { httpOnly: true });
    return true;
  }
}
