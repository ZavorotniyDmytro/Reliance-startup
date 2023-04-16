import { Module } from '@nestjs/common';
import { FollowerService } from './follower.service';
import { FollowerController } from './follower.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Follower } from 'src/models/follower.model';
import { User } from 'src/models/user.model';
import { Contract } from 'src/models/contract.model';
import { HttpModule } from '@nestjs/axios'; 
import { ContractModule } from 'src/contract/contract.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UserModule } from 'src/user/user.module';
import { SendGridModule } from '@anchan828/nest-sendgrid';

@Module({
	imports:[
		ContractModule,
		HttpModule,
		UserModule,
		ConfigModule,
		SequelizeModule.forFeature([
			Follower, User, Contract
		]),
		// SendGridModule.forRoot({			
		// 	apikey: process.env.MAIL_PASSWORD,					  
		// }),
		MailerModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
			  transport: {
				 host: configService.get<string>('MAIL_HOST'), //smtp.gmail.com
				 //secure: false,
				 //port: 587,//25, 587	(for unencrypted/TLS connections)  465	(for SSL connections)
				 auth: {
					user: configService.get<string>('MAIL_USER'),
					pass: configService.get<string>('MAIL_PASSWORD'),
				 },
			  },			  
			}),			
		 }),
	],
	controllers: [FollowerController],
	providers: [FollowerService],
	exports:	[FollowerService]
})
export class FollowerModule {}

