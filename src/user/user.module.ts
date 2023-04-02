import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AnnouncementModule } from 'src/announcement/announcement.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../models/user.model';
import { ResumeModule } from 'src/resume/resume.module';
import { Resume } from 'src/models/resume.model';
import { Message } from 'src/models/message.model';
import { Review } from 'src/models/review.model';

@Module({
	imports: [
		AnnouncementModule,
		ResumeModule,
		SequelizeModule.forFeature([User, Resume, Message, Review])],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService]

})
export class UserModule { }
