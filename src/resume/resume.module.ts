import { Module } from '@nestjs/common';
import { ResumeService } from './resume.service';
import { ResumeController } from './resume.controller';
import { ResumeDatabaseModule } from 'src/database/resume-database.module';
import { UserModule } from 'src/user/user.module';

@Module({
  providers: [ResumeService],
  controllers: [ResumeController],
  imports: [ResumeDatabaseModule, UserModule]
})
export class ResumeModule {}
