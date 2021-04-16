import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { UsersService } from "../../users/users.service";
import { User } from "../../users/user.entity";
import { JWT_SECRET } from "src/utils/constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET,
    });
  }

  async validate(validationPayload: {
    username: string;
    sub: number;
  }): Promise<User | null> {
    return this.userService.findByUsername(validationPayload.username);
  }
}
