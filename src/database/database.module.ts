import { Module } from "@nestjs/common";
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../user/user.model';

@Module({
	imports: [SequelizeModule.forRoot({
		dialect: 'postgres',
		host: "localhost",
		port: 5432,
		username: 'postgres',
		password: '87654321',
		database: 'user-database',
		models: [User],
		autoLoadModels: true,
	}),]
})
export class DatabaseModule { }