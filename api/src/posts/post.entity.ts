import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Field, Int, ObjectType } from "@nestjs/graphql";

@Entity({ name: "posts" })
@ObjectType()
export class Post {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @CreateDateColumn()
  createdAt!: string;

  @Field()
  @UpdateDateColumn()
  updatedAt!: string;

  @Field()
  @Column()
  title!: string;
}
