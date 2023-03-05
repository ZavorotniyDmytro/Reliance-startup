import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AnnouncementModule } from 'src/announcement/announcement.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';

@Module({
	imports: [AnnouncementModule,
		SequelizeModule.forFeature([User])],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService]

})
export class UserModule { }
