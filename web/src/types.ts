export interface ProcessEnv {
  NODE_ENV: string | undefined;
}

export interface AccessToken {
  username: string;
  sub: number;
  exp: number;
}
