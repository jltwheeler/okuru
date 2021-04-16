import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";

import { AuthService } from "../auth.service";
import { User } from "../../users/user.entity";

// Not sure a local strategy is needed as GraphQL auth 'login' mutation takes
// care of the login. That mutation will provided users with a valid JWT.

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<User> {
    const user = await this.authService.validate(username, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
