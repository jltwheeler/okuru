import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as argon2 from "argon2";

import { JWT_SECRET } from "src/utils/constants";
import { User } from "../users/user.entity";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validate(username: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByUsername(username);

    if (!user) return null;

    const valid = await argon2.verify(user.password, password);

    return valid ? user : null;
  }

  async login(user: User): Promise<{ access_token: string }> {
    const payload = {
      username: user.username,
      sub: user.id,
    };
    return { access_token: this.jwtService.sign(payload) };
  }

  async verify(token: string): Promise<User> {
    const decoded = this.jwtService.verify(token, {
      secret: JWT_SECRET,
    });
    const user = this.usersService.findByUsername(decoded.username);

    if (!user) {
      throw new Error("Unable to get the user from the decoded token");
    }
    return user;
  }
}
