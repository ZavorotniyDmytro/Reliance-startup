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
import { Announcement } from 'src/models/announcement.model';
import { Chat } from 'src/models/chat.model';
import { Contract } from 'src/models/contract.model';
import { Role } from 'src/models/role.model';
import { UserRole } from 'src/models/user-role.model';
import { UserChat } from 'src/models/user-chat.model';
import { RolesModule } from 'src/roles/role.module';
import { Worker } from 'src/models/worker.model';

@Module({
	imports: [
		AnnouncementModule,
		ResumeModule,
		RolesModule,
		SequelizeModule.forFeature([
			User, Resume, Announcement, Chat, Review, Message, Contract, Role, UserRole, UserChat, Worker])],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService]

})
export class UserModule { }
