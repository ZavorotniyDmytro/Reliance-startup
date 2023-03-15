import { Module } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { ResumeController } from './resume.controller';
import { ResumeDatabaseModule } from 'src/database/resume-database.module';
import { UserModule } from 'src/user/user.module';
import { Sequelize } from 'sequelize';
import { SequelizeModule } from '@nestjs/sequelize';
import { Resume } from './resume.model';

@Module({
  providers: [ResumeService],
  controllers: [ResumeController],
  imports: [
    ResumeDatabaseModule, 
    UserModule,
    SequelizeModule.forFeature([Resume])
  ]
})

export class ResumeModule {}
