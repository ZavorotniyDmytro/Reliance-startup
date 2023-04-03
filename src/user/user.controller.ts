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
import { Announcement } from 'src/announcement/dto/announcement/create-announcement.dto';
import { ResumeDto } from 'src/resume/dto/resume-dto';
import { Resume } from 'src/models/resume.model';
import { ResumeService } from 'src/resume/resume.service';
import { User } from '../models/user.model';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly resumeService: ResumeService
	) { }

	@ApiTags("User API")
	@ApiOperation({ summary: "Get all users" })
	@ApiResponse({ status: 200, type: [User] })
	@Get()
	getAllUsers(): Promise<User[]> {
		return this.userService.getAll();
	}

	@ApiTags("User API")
	@ApiOperation({ summary: "Get user by ID" })
	@ApiResponse({ status: 200, type: User })
	@Get(':id')
	getUserById(@Param('id') id: number): Promise<User> {
		return this.userService.getById(id);
	}

	@ApiTags("User API")
	@ApiOperation({ summary: "Create user" })
	@ApiResponse({ status: 201, type: User })
	@Post()
	async create(@Body() data: User): Promise<User> {
		return this.userService.create(data);
	}

	@ApiTags("User API")
	@ApiOperation({ summary: "Update user by ID" })
	@ApiResponse({ status: 200, type: Promise<User> })
	@Put(':id')
	async update(@Param('id') id: number, @Body() data: Partial<User>): Promise<User> {
		return this.userService.update(id, data);
	}

	@ApiTags("User API")
	@ApiOperation({ summary: "Delete user by ID" })
	@ApiResponse({ status: 200, type: Promise<void> })
	@Delete(':id')
	async delete(@Param('id') id: number): Promise<void> {
		this.userService.delete(id);
	}

	@ApiTags("User API")
	@ApiOperation({ summary: "Get all announcement by user ID" })
	@ApiResponse({ status: 200, type: Announcement })
	@Get(':user_id/announcements')
	getAllAnnouncement(@Param('user_id') user_id: string) {
		return this.userService.getAllAnnouncement(user_id);
	}

	@ApiTags("Resume API")
	@ApiOperation({ summary: "Create resume by user ID" })
	@ApiResponse({ status: 200, type: Resume })
	@Post(':user_id/resume')
	async createResume(@Param('user_id') user_id: number, @Body() data: ResumeDto) {
		const user_data = await this.userService.getDataForResume(user_id);
		const resume_data = ({ ...data, user_id, ...user_data });
		return this.resumeService.create(resume_data);
	}

	@ApiTags("Resume API")
	@ApiOperation({ summary: "Get resume" })
	@ApiResponse({ status: 200, type: [Resume] })
	@Get(':user_id/resume/:id')
	getResumeById(@Param('id') id: number): Promise<Resume> {
		return this.resumeService.getById(id);
	}

	@ApiTags("Resume API")
	@ApiOperation({ summary: "Update resume by Id" })
	@ApiResponse({ status: 203, type: ResumeDto })
	@Put(':user_id/resume/:id')
	async updateResume(@Param('id') id: number, @Body() data: Partial<Resume>): Promise<Resume> {
		return this.resumeService.update(id, data);
	}

	@ApiTags("Resume API")
	@ApiOperation({ summary: "Delete resume by Id" })
	@ApiResponse({ status: 204, type: Resume })
	@Delete(':user_id/resume/:id')
	async deleteResume(@Param('id') id: number): Promise<void> {
		this.resumeService.delete(id);
	}

	// get :user_id/chats
}

