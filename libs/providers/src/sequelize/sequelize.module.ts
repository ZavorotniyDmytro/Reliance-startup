import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { SequelizeModule as GlobalSequelizeModule } from '@nestjs/sequelize';
import { Chat, Contract, ContractMaterial, Follower, Material, Message, Resume, Review, Role, User, UserChat, UserRole, Worker } from '@lib/models';
import { Announcement } from '@lib/models';




@Module({
	imports: [ConfigModule.forRoot({
		envFilePath: ['./libs/providers/.env'],
		validationSchema: Joi.object({
			POSTGRES_HOST: Joi.string().required(),
			POSTGRES_USER: Joi.string().required(),
			POSTGRES_DB: Joi.string().required(),
			POSTGRES_PASSWORD: Joi.string().required(),
			POSTGRES_PORT: Joi.number().required().default(5432),		
		})
	}),
	GlobalSequelizeModule.forRootAsync({
		imports: [ConfigModule],
		inject: [ConfigService],
		useFactory:  (configService: ConfigService) => ({
			dialect: 'postgres',
			host: configService.get<string>('POSTGRES_HOST'),
			port: configService.get<number>('POSTGRES_PORT'),
			username: configService.get<string>('POSTGRES_USER'),
			password: configService.get<string>('POSTGRES_PASSWORD'),
			database: configService.get<string>('POSTGRES_DB'),
			models: [
				Announcement, 
				Chat, Message, 
				Contract, ContractMaterial,
				Follower, 
				Material, 
				Resume, 
				Review, 
				Role, 
				UserRole, UserChat, User, Worker	],
			autoLoadModels: true,
			synchronize: true,
		})
	}),]
})
export class SequelizeModule {}
