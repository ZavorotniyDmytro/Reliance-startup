import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { AppModule } from './app.module';

async function bootstrap() {
	const PORT = 3000
	const app = await NestFactory.create(AppModule);

	// swagger
	const config = new DocumentBuilder()
		.setTitle('Reliance API')
		.setDescription('Documentation Reliance REST API')
		.setVersion('1.0.0')
		//.addTag('API')
		.build()
	//app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('/api/docs', app, document)

	await app.listen(PORT, () => console.log(`Server start in PORT = ${PORT}`));
}
bootstrap();
