import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import * as cookieParser from "cookie-parser";
import { AppModule } from "./app.module";
import { origin } from "src/constants";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin, credentials: true });
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(5000);
}
bootstrap();
