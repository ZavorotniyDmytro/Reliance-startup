import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Review } from '@lib/models/review.model';
import { User } from '@lib/models/user.model';
import { Contract } from '@lib/models/contract.model';
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
			Review, User, Contract
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
	controllers: [ReviewController],
	providers: [ReviewService],
	exports:	[ReviewService]
})
export class ReviewModule {}
