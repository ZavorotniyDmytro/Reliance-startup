import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserService } from 'src/user/user.service';
import { ResumeDto } from './dto/resume-dto';
import { Resume } from './resume.model';

@Injectable()
export class ResumeService {

    constructor(
		@InjectModel(Resume) private resumeRepository: typeof Resume,
		private readonly userService: UserService,
	) { }

    async getById(resume_id: number): Promise<Resume> {
        const resume = await this.resumeRepository.findOne({ where: { resume_id } })
		if (resume) {
			return resume;
		}
		throw new HttpException('Resume with this ID was not found', HttpStatus.NOT_FOUND);
    }

    async delete(resume_id: number): Promise<void> {
        const resume = await this.getById(resume_id);
        await resume.destroy();
    }
    
    async update(resume_id: number, data: Partial<Resume>): Promise<Resume> {
        const resume = await this.getById(resume_id);
		return await resume.update(data);
    }

    async create(data: Resume): Promise<Resume> {
        return await this.resumeRepository.create(data);
    }
}
