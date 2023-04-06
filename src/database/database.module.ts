import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { SequelizeModule } from '@nestjs/sequelize';
import { Announcement } from "src/models/announcement.model";
import { Chat } from "src/models/chat.model";
import { Follower } from "src/models/follower.model";
import { Material } from "src/models/material.model";
import { Review } from "src/models/review.model";
import { UserRole } from "src/models/user-role.model";

import { Contract } from "../models/contract.model";
import { Message } from "../models/message.model";
import { Resume } from "../models/resume.model";
import { Role } from "../models/role.model";
import { User } from '../models/user.model';

@Module({
	imports: [SequelizeModule.forRootAsync({
		imports: [ConfigModule],
		inject: [ConfigService],
		useFactory: (configService: ConfigService) => ({
			dialect: 'postgres',
			host: configService.get('POSTGRES_HOST'),
			port: configService.get('POSTGRES_PORT'),
			username: configService.get('POSTGRES_USER'),
			password: configService.get('POSTGRES_PASSWORD'),
			database: configService.get('POSTGRES_DB'),
			models: [
				Announcement, 
				Chat, 
				Contract, 
				Follower, 
				Material, 
				Message, 
				Resume, 
				Review, 
				Role, 
				UserRole, 
				User
			],
			//autoLoadModels: true,
		})
	}),]
})
export class DatabaseModule { }