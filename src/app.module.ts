import { Module } from '@nestjs/common';
import { AnnouncementModule } from './announcement/announcement.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatsModule } from './chats/chats.module';
import { UserModule } from './user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user/user.model';

@Module({
	imports: [
		UserModule,
		ChatsModule,
		AnnouncementModule,
		SequelizeModule.forRoot({
			dialect: 'postgres',
			host: "localhost",
			port: 5432,
			username: 'postgres',
			password: '87654321',
			database: 'user-database',
			models: [User],
			autoLoadModels: true,
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
