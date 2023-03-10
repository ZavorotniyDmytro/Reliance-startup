import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AnnouncementModule } from './announcement/announcement.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatsModule } from './chats/chats.module';
import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import * as Joi from '@hapi/joi';
import { DatabaseModule } from './database/database.module';

@Module({
	imports: [
		UserModule,
		ChatsModule,
		AnnouncementModule,
		AuthenticationModule,
		DatabaseModule,
		ConfigModule.forRoot({
			validationSchema: Joi.object({
				PORT: Joi.number(),
				POSTGRES_HOST: Joi.string().required(),
				POSTGRES_USER: Joi.string().required(),
				POSTGRES_DB: Joi.string().required(),
				POSTGRES_PASSWORD: Joi.string().required(),
				POSTGRES_PORT: Joi.number().default(5432),
			})
		})
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
