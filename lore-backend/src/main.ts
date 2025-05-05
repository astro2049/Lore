import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";
import { ValidationPipe } from "@nestjs/common";
import { IS_PRODUCTION } from "./common/constants";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());
    // Cors
    if (!IS_PRODUCTION) {
        app.enableCors({
            origin: "http://localhost:5173",
            credentials: true
        });
    }
    await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
