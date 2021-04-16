import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

import { UsersModule } from "../users/users.module";
import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { JWT_SECRET } from "src/utils/constants";
import { LocalStrategy } from "./strategies/local.strategy";

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: "3600s" },
    }),
  ],
  providers: [AuthResolver, AuthService, JwtStrategy, LocalStrategy],
})
export class AuthModule {}
