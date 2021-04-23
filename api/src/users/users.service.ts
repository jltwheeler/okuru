import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as argon2 from "argon2";

import { CreateUserInput } from "./dto/create-user.input";
import { User } from "./user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(options: CreateUserInput): Promise<User | null> {
    const existingUser = await this.userRepository.findOne({
      username: options.username,
    });
    if (existingUser) return null;

    const newUser = new User();
    const hashedPassword = await argon2.hash(options.password);

    newUser.username = options.username;
    newUser.password = hashedPassword;

    return await this.userRepository.save(newUser);
  }

  async findByUsername(username: string): Promise<User | undefined> {
    if (!username) return undefined;

    return await this.userRepository.findOne({
      username: username,
    });
  }

  async findOne(id: number): Promise<User | null> {
    if (!id) return null;

    const user = await this.userRepository.findOne(id);
    if (!user) return null;

    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  incrementUserTokenVersion(userId: number) {
    return this.userRepository.increment({ id: userId }, "tokenVersion", 1);
  }
}
