import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ResumeDto } from './dto/resume-dto';
import { UpdateResumeDto } from './dto/update-resume-dto';
import { Resume } from '../../libs/models/src/resume.model';
import axios from 'axios';

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
        const createdResume = await this.resumeRepository.create(data);

        // Вебхук URL, куди буде відправлено сповіщення.
        const webhookUrl = 'https://webhook.site/2b43658e-254a-4eea-bb5a-ce7780371763';

        // Дані, які будуть відправлені у тілі запиту.
        const webhookData = {
            resume_name: createdResume.name,
            resume_phone: createdResume.phone,
        };

        // Відправка POST-запиту на вебхук URL з даними резюме.
        await axios.post(webhookUrl, webhookData);

        return createdResume;
    }
}
