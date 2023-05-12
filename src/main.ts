import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.use(cookieParser());
	const configService = app.get(ConfigService);

	const PORT = configService.get('PORT') ?? 3000;
	await app.listen(PORT, () => 	console.log(`Server start in PORT = ${PORT}`));

	
	const configSwagger = new DocumentBuilder()
		.setTitle('Reliance API')
		.setDescription('Documentation Reliance REST API')
		.setVersion('1.0.0')
		.build()

	const document = SwaggerModule.createDocument(app, configSwagger)
	SwaggerModule.setup('/api/docs', app, document)
}
bootstrap();