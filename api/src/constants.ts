import { config } from "dotenv";

config();

export const __prod__ = process.env.NODE_ENV === "production";
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
export const origin = __prod__ ? "" : "http://localhost:3000";
