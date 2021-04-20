import { Field, InputType } from "@nestjs/graphql";
import { IsDefined } from "class-validator";

@InputType()
export class CreatePostDto {
  @IsDefined()
  @Field()
  title!: string;
}
