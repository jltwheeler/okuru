import { join } from "path";

import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Connection } from "typeorm";

import * as connectionOptions from "./config/ormconfig";
import { AuthModule } from "./auth/auth.module";
import { PostModule } from "./posts/posts.module";
import { UsersModule } from "./users/users.module";
import { origin } from "./constants";

@Module({
  imports: [
    TypeOrmModule.forRoot(connectionOptions),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      cors: {
        origin,
        credentials: true,
      },
      context: ({ req, res }) => ({ req, res }),
    }),
    AuthModule,
    PostModule,
    UsersModule,
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
