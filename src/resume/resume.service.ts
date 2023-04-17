import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ResumeDto } from './dto/resume-dto';
import { UpdateResumeDto } from './dto/update-resume-dto';
import { Resume } from '../models/resume.model';

@Injectable()
export class ResumeService {

    constructor(
		@InjectModel(Resume) private resumeRepository: typeof Resume
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
    
    async update(resume_id: number, data: UpdateResumeDto): Promise<Resume> {
        const resume = await this.getById(resume_id);
		return await resume.update(data);
    }

    async create(data: ResumeDto): Promise<Resume> {
        return await this.resumeRepository.create(data);
    }
}
