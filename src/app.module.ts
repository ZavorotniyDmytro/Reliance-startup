
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './user/user.module';
import { ChatsModule } from './chats/chats.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { AnnouncementModule } from './announcement/announcement.module';
import { DatabaseModule } from './database/database.module';
import { ResumeModule } from './resume/resume.module';
import { RolesModule } from './roles/role.module';
import { ContractModule } from './contract/contract.module';
import { ReviewModule } from './review/review.module';
import { S3Module } from './awsS3/s3.module';
import { ConfigModule } from './config/config.module';

@Module({
	imports: [
		ConfigModule,
		UserModule,
		ChatsModule,
		AnnouncementModule,
		AuthenticationModule,
		DatabaseModule,
		ResumeModule,
		RolesModule,
		ContractModule,
		ReviewModule,
		S3Module,
		ConfigModule
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
