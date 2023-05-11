import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AnnouncementModule } from 'src/announcement/announcement.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../../libs/models/src/user.model';
import { ResumeModule } from 'src/resume/resume.module';
import { Resume } from '@lib/models/resume.model';
import { Message } from '@lib/models/message.model';
import { Review } from '@lib/models/review.model';
import { Announcement } from '@lib/models/announcement.model';
import { Chat } from '@lib/models/chat.model';
import { Contract } from '@lib/models/contract.model';
import { Role } from '@lib/models/role.model';
import { UserRole } from '@lib/models/user-role.model';
import { UserChat } from '@lib/models/user-chat.model';
import { RolesModule } from 'src/roles/role.module';
import { Worker } from '@lib/models/worker.model';
import { ContractModule } from 'src/contract/contract.module';
import { S3Module } from 'src/awsS3/s3.module';

@Module({
	imports: [
		AnnouncementModule,
		S3Module,
		forwardRef(() =>ContractModule),
		ResumeModule,
		RolesModule,
		SequelizeModule.forFeature([
			User, Resume, Announcement, Chat, Review, Message, Contract, Role, UserRole, UserChat, Worker])],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService]

})
export class UserModule { }
