import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as argon2 from "argon2";

import { CreateUserInput } from "./dto/create-user.input";
import { User, UserResponse } from "./user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(options: CreateUserInput): Promise<UserResponse> {
    const existingUser = await this.userRepository.findOne({
      username: options.username,
    });
    if (existingUser) {
      return {
        errors: [
          { field: "username", message: "That username is already taken!" },
        ],
      };
    }

    const newUser = new User();
    const hashedPassword = await argon2.hash(options.password);

    newUser.username = options.username;
    newUser.password = hashedPassword;

    return { user: await this.userRepository.save(newUser) };
  }

  async login(options: CreateUserInput): Promise<UserResponse> {
    const user = await this.userRepository.findOne({
      username: options.username,
    });
    if (!user) {
      return {
        errors: [
          { field: "username", message: "That username doesn't exist!" },
        ],
      };
    }

    const valid = await argon2.verify(user.password, options.password);
    if (!valid) {
      return {
        errors: [{ field: "password", message: "Incorrect password" }],
      };
    }

    return { user };
  }
}
