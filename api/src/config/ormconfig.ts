import { config } from "dotenv";

import { __prod__ } from "../constants";
import { ConnectionOptions } from "typeorm";
import { User } from "src/users/user.entity";
import { Post } from "src/posts/post.entity";

config();

const connectionOptions: ConnectionOptions = {
  type: "postgres",
  host: __prod__ ? process.env.TYPEORM_HOST : "localhost",
  port: __prod__ ? parseInt(process.env.TYPEORM_PORT) : 5432,
  username: __prod__ ? process.env.TYPEORM_USERNAME : "admin",
  password: __prod__ ? process.env.TYPEORM_PASSWORD : "super_secret",
  database: "okuru",
  entities: [Post, User],
  synchronize: false,
  migrations: ["dist/migrations/*.js"],
  cli: {
    migrationsDir: "src/migrations",
  },
};

export = connectionOptions;
