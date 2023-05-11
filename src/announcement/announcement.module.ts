import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Announcement } from '@lib/models/announcement.model';
import { Follower } from '@lib/models/follower.model';
import { User } from '@lib/models/user.model';
import { AnnouncementController } from './announcement.controller';
import { AnnouncementService } from './announcement.service';

@Module({
	imports: [SequelizeModule.forFeature([Announcement, User, Follower])],
	controllers: [AnnouncementController],
	providers: [AnnouncementService],
	exports: [AnnouncementService]
})
export class AnnouncementModule { }
