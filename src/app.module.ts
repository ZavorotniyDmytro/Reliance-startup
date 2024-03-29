
import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { ChatsModule } from './chats/chats.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { AnnouncementModule } from './announcement/announcement.module';
import { ResumeModule } from './resume/resume.module';
import { RolesModule } from './roles/role.module';
import { ContractModule } from './contract/contract.module';
import { ReviewModule } from './review/review.module';
import { S3Module } from './awsS3/s3.module';
import { ConfigModule } from './config/config.module';
import { FollowerModule } from './follower/follower.module';
import { ProvidersModule } from 'libs/providers/src';
import { GatewayModule } from './gateway/gateway.module';


@Module({
	imports: [
		ProvidersModule,
		ConfigModule,
		UserModule,
		ChatsModule,
		AnnouncementModule,
		AuthenticationModule,
		ResumeModule,
		RolesModule,
		ContractModule,
		ReviewModule,
		S3Module,
		ConfigModule,
		FollowerModule,
		GatewayModule,
	],
})
export class AppModule { }
