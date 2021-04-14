import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreateUserInput {
  @Field({ description: "Username" })
  username: string;

  @Field({ description: "Password" })
  password: string;
}
