import { AuthGuard } from "@nestjs/passport";

// This will be used for any potential REST endpoints that require jwt auth
export class JwtAuthGuard extends AuthGuard("jwt") {}
