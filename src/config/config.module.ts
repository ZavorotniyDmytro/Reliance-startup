import { Module } from '@nestjs/common';
import * as Joi from '@hapi/joi';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

@Module({
	imports:[NestConfigModule.forRoot({
		envFilePath: ['.env',],
		validationSchema: Joi.object({
			PORT: Joi.number(),
			MAIL_HOST: Joi.string().required(),
			MAIL_USER: Joi.string().required(),
			MAIL_PASSWORD: Joi.string().required(),
			WEBHOOKSITE_URL: Joi.string().required(),
			S3_ACCESS_KEY_ID: Joi.string().required(),
			S3_SECRET_ACCESS_KEY: Joi.string().required(),
			BUCKET_NAME: Joi.string().required(),
			AWS_REGION: Joi.string().required().default('eu-central-1')
		})
	}),]
})
export class ConfigModule {}
