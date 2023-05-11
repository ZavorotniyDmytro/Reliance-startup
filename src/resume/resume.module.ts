import { Module } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { Sequelize } from 'sequelize';
import { SequelizeModule } from '@nestjs/sequelize';
import { Resume } from '../../libs/models/src/resume.model';
import { User } from '@lib/models/user.model';

@Module({
  providers: [ResumeService],
  imports: [ 
    SequelizeModule.forFeature([Resume, User])
  ],
  exports: [ResumeService]
})

export class ResumeModule {}
