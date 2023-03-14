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
import { ResumeService } from './resume.service';

@ApiTags("Resume API")
@Controller('resume')
export class ResumeController {

    // Promise<> - функція є асинхронною і ми очікуємо, що вона поверне результат у майбутньому.
    // Partial<> - позначення того, що тип об'єкту може бути частково заповненим.
    constructor(private readonly resumeService: ResumeService) {}

    @ApiOperation({ summary: "Get resume" })
	@ApiResponse({ status: 200, type: [ResumeDto] })
	@Get(':id')
	getResumeById(@Param('id') id: number): Promise<ResumeDto> {
        return this.resumeService.getById(id);
	}

	@ApiOperation({ summary: "Create resume" })
	@ApiResponse({ status: 201, type: ResumeDto })
	@Post()
	async create(@Body() data: ResumeDto): Promise<ResumeDto> {
		return this.resumeService.create(data);
	}

	@ApiOperation({ summary: "Update resume by Id" })
	@ApiResponse({ status: 203, type: ResumeDto })
	@Put(':id')
	async update(@Param('id') id: number, @Body() data: Partial<ResumeDto>): Promise<ResumeDto> {
		return this.resumeService.update(id, data);
	}

	@ApiOperation({ summary: "Delete resume by Id" })
	@ApiResponse({ status: 204, type: ResumeDto })
	@Delete(':id')
	async delete(@Param('id') id: number): Promise<void> {
		this.resumeService.delete(id);
	}
}
