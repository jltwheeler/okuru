import { Controller, Post, Req } from "@nestjs/common";
import { Request } from "express";
import { AuthService } from "./auth.service";

@Controller("refresh_token")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async refresh(@Req() req: Request) {
    const token = req.cookies.jid;
    if (!token) {
      return { ok: false, accessToken: "" };
    }

    let user = null;
    try {
      user = await this.authService.verifyRefreshToken(token);
    } catch (error) {
      console.log(error);
      return { ok: false, accessToken: "" };
    }

    if (!user) {
      return { ok: false, accessToken: "" };
    }

    return this.authService.generateAccessToken(user);
  }
}
