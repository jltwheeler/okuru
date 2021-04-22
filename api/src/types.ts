import { Field, ObjectType } from "@nestjs/graphql";
import { Request, Response } from "express";

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

export interface GQLContext {
  req: Request;
  res: Response;
}
