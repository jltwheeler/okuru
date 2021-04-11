import { join } from "path";

import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Connection } from "typeorm";

import { __prod__ } from "./constants";
import { PostModule } from "./posts/posts.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "admin",
      password: "super_secret",
      database: "okuru",
      autoLoadEntities: true,
      synchronize: __prod__ ? false : true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
    }),
    PostModule,
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
