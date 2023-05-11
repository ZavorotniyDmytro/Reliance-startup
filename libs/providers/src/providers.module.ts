import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';

import { SequelizeModule } from './sequelize/sequelize.module';

@Module({

  imports: [SequelizeModule, ConfigModule.forRoot({
	isGlobal: true,
	validationSchema: Joi.object({
		POSTGRES_HOST: Joi.string().required(),
		POSTGRES_USER: Joi.string().required(),
		POSTGRES_DB: Joi.string().required(),
		POSTGRES_PASSWORD: Joi.string().required(),
		POSTGRES_PORT: Joi.number().required().default(5432),		
	})
}),]
})
export class ProvidersModule {}
