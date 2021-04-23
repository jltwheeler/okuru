import { Controller, Post, Req, Res } from "@nestjs/common";
import { Response, Request } from "express";
import { AuthService } from "./auth.service";

@Controller("refresh_token")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async refresh(@Req() req: Request, @Res() res: Response) {
    const token = req.cookies.jid;
    const invalidResponse = { ok: false, accessToken: "" };

    if (!token) {
      return res.json(invalidResponse);
    }

    let user = null;
    try {
      user = await this.authService.verifyRefreshToken(token);
    } catch (error) {
      console.log(error);
      return res.json(invalidResponse);
    }

    if (!user) {
      res.json(invalidResponse);
    }

    const refreshToken = this.authService.generateRefreshToken(user);
    res.cookie("jid", refreshToken, { httpOnly: true });

    return res.json(this.authService.generateAccessToken(user));
  }
}
