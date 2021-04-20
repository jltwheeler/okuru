import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class FieldError {
  @Field()
  field!: string;

  @Field()
  message!: string;
}

export interface ProcessEnv {
  NODE_ENV: string | undefined;
}
