import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ChatsModule } from './chats/chats.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { AnnouncementModule } from './announcement/announcement.module';
import { DatabaseModule } from './database/database.module';
import { ResumeModule } from './resume/resume.module';
import { RolesModule } from './roles/role.module';
import { ContractModule } from './contract/contract.module';
import { ReviewModule } from './review/review.module';
import { FollowerModule } from './follower/follower.module';


@Module({
	imports: [
		ConfigModule.forRoot({
			validationSchema: Joi.object({
				PORT: Joi.number(),
				POSTGRES_HOST: Joi.string().required(),
				POSTGRES_USER: Joi.string().required(),
				POSTGRES_DB: Joi.string().required(),
				POSTGRES_PASSWORD: Joi.string().required(),
				POSTGRES_PORT: Joi.number().default(5432),
				MAIL_HOST: Joi.string().required(),
        		MAIL_USER: Joi.string().required(),
        		MAIL_PASSWORD: Joi.string().required(),
				WEBHOOKSITE_URL: Joi.string().required(),
			})
		}),
		UserModule,
		ChatsModule,
		AnnouncementModule,
		AuthenticationModule,
		DatabaseModule,
		ResumeModule,
		RolesModule,
		ContractModule,
		ReviewModule,
		FollowerModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
