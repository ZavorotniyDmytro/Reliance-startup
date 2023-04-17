import { Module } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { Sequelize } from 'sequelize';
import { SequelizeModule } from '@nestjs/sequelize';
import { Resume } from '../models/resume.model';
import { User } from 'src/models/user.model';

@Module({
  providers: [ResumeService],
  imports: [ 
    SequelizeModule.forFeature([Resume, User])
  ],
  exports: [ResumeService]
})

export class ResumeModule {}
