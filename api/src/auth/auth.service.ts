import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as argon2 from "argon2";

import { JWT_REFRESH_SECRET } from "src/constants";
import { User } from "../users/user.entity";
import { UsersService } from "../users/users.service";

interface DecodedRefreshJwt {
  sub: number;
  iat: number;
  exp: number;
}

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

  generateRefreshToken(user: User): string {
    return this.jwtService.sign(
      { sub: user.id },
      {
        expiresIn: "7d",
        secret: JWT_REFRESH_SECRET,
      },
    );
  }

  generateAccessToken(user: User): { access_token: string } {
    const payload = {
      username: user.username,
      sub: user.id,
    };
    return { access_token: this.jwtService.sign(payload) };
  }

  async verifyRefreshToken(token: string): Promise<User> {
    const decoded: DecodedRefreshJwt = this.jwtService.verify(token, {
      secret: JWT_REFRESH_SECRET,
    });
    const user = await this.usersService.findOne(decoded.sub);

    if (!user) {
      throw new Error("Unable to get the user from the decoded token");
    }
    return user;
  }
}
