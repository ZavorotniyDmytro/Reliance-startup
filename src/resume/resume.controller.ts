import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { ResumeDto } from './dto/resume-dto';
import { UpdateResumeDto } from './dto/update-resume-dto';
import { Resume } from './resume.model';
import { ResumeService } from './resume.service';

@ApiTags("Resume API")
@Controller('resume')
export class ResumeController {

    // Promise<> - функція є асинхронною і ми очікуємо, що вона поверне результат у майбутньому.
    // Partial<> - позначення того, що тип об'єкту може бути частково заповненим.
    constructor(private readonly resumeService: ResumeService) {}

    @ApiOperation({ summary: "Get resume" })
	@ApiResponse({ status: 200, type: [Resume] })
	@Get(':id')
	getResumeById(@Param('id') id: number): Promise<Resume> {
        return this.resumeService.getById(id);
	}

	@ApiOperation({ summary: "Create resume" })
	@ApiResponse({ status: 201, type: Resume })
	@Post()
	async create(@Body() data: Resume): Promise<Resume> {
		return this.resumeService.create(data);
	}

	@ApiOperation({ summary: "Update resume by Id" })
	@ApiResponse({ status: 203, type: ResumeDto })
	@Put(':id')
	async update(@Param('id') id: number, @Body() data: Partial<Resume>): Promise<Resume> {
		return this.resumeService.update(id, data);
	}

	@ApiOperation({ summary: "Delete resume by Id" })
	@ApiResponse({ status: 204, type: Resume })
	@Delete(':id')
	async delete(@Param('id') id: number): Promise<void> {
		this.resumeService.delete(id);
	}
}
