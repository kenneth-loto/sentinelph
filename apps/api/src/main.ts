import { NestFactory } from "@nestjs/core";
import cookieParser from "cookie-parser";
import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.use(cookieParser());
	app.setGlobalPrefix("api");
	app.enableCors({
		origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
		credentials: true,
	});
	await app.listen(process.env.PORT ?? 4000);
	console.log("🚀 SentinelPH API running on: http://localhost:4000/api");
}
bootstrap();
