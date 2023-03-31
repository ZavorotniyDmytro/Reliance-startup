import { Module } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { Sequelize } from 'sequelize';
import { SequelizeModule } from '@nestjs/sequelize';
import { Resume } from '../models/resume.model';

@Module({
  providers: [ResumeService],
  imports: [ 
    SequelizeModule.forFeature([Resume])
  ],
  exports: [ResumeService]
})

export class ResumeModule {}
