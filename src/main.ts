
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.use(cookieParser());
	const configService = app.get(ConfigService);

	await app.connectMicroservice<MicroserviceOptions>({
		transport: Transport.TCP,
		options: {
		  	port: configService.get('PORT'),
		},
	});
	app.startAllMicroservices();	
	const PORT = configService.get<number>('PORT')
	app.listen(PORT, ()=>console.log(`Server started at port ${PORT}`))
	const configSwagger = new DocumentBuilder()
		.setTitle('Reliance API')
		.setDescription('Documentation Reliance REST API')
		.setVersion('1.0.0')
		.build()

	const document = SwaggerModule.createDocument(app, configSwagger)
	SwaggerModule.setup('/api/docs', app, document)
	
	
}
bootstrap();