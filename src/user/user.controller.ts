import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ApiResponse, ApiTags } from '@nestjs/swagger/dist';
//import { Announcement } from 'src/announcement/dto/announcement/create-announcement.dto';
import { ResumeDto } from 'src/resume/dto/resume-dto';
import { Resume } from 'src/models/resume.model';
import { ResumeService } from 'src/resume/resume.service';
import { User } from '../models/user.model';
import { UserService } from './user.service';
import { ContractService } from 'src/contract/contract.service';
import { Contract } from 'src/models/contract.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from 'src/awsS3/s3.service';

@Controller('users')
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly resumeService: ResumeService,
		private readonly contractService: ContractService,
		private readonly s3Service: S3Service
	) { }
	
	// GET /users - повертає список всіх користувачів
	@ApiTags("User API")
	@ApiOperation({ summary: "Get all users" })
	@ApiResponse({ status: 200, type: [User] })
	@Get()
	getAllUsers(): Promise<User[]> {
		return this.userService.getAll();
	}

	// GET /users/{id} - повертає конкретного користувача за його ідентифікатором
	@ApiTags("User API")
	@ApiOperation({ summary: "Get user by ID" })
	@ApiResponse({ status: 200, type: User })
	@Get(':id')
	getUserById(@Param('id') id: number): Promise<User> {
		return this.userService.getById(id);
	}

	// POST /users - створює нового користувача
	@ApiTags("User API")
	@ApiOperation({ summary: "Create user" })
	@ApiResponse({ status: 201, type: User })
	@Post()
	async create(@Body() data: User): Promise<User> {
		return this.userService.create(data);
	}

	@ApiTags("User API")
	@ApiOperation({ summary: "Upload user avatar" })
	@ApiResponse({ status: 200, type: User })
	@UseInterceptors(FileInterceptor('file'))
	@Post(':user_id/upload')
	async uploadFile(@Param('user_id') user_id: number, @UploadedFile() file: Express.Multer.File):Promise<string> {
		const avatar_url = await this.s3Service.uploadFileToS3(file);
		await this.userService.update(user_id, { avatar_url });
    	return avatar_url;
	}

	// PUT /users/{id} - оновлює конкретного користувача за його ідентифікатором
	@ApiTags("User API")
	@ApiOperation({ summary: "Update user by ID" })
	@ApiResponse({ status: 200, type: Promise<User> })
	@Put(':id')
	async update(@Param('id') id: number, @Body() data: Partial<User>): Promise<User> {
		return this.userService.update(id, data);
	}

	// DELETE /users/{id} - видаляє конкретного користувача за його ідентифікатором
	@ApiTags("User API")
	@ApiOperation({ summary: "Delete user by ID" })
	@ApiResponse({ status: 200, type: Promise<void> })
	@Delete(':id')
	async delete(@Param('id') id: number): Promise<void> {
		this.userService.delete(id);
	}

	// // GET /users/{user_id}/announcements - повертає список всіх оголошень, створених конкретним користувачем
	// @ApiTags("User API")
	// @ApiOperation({ summary: "Get all announcement by user ID" })
	// @ApiResponse({ status: 200, type: Announcement })
	// @Get(':user_id/announcements')
	// getAllAnnouncement(@Param('user_id') user_id: number) {
	// 	// TODO update this code. Rewrite getAllAnnouncements in userService
	// 	return this.userService.getAllAnnouncements(''+user_id);
	// }

	// POST /users/{user_id}/resumes - створює нове резюме для конкретного користувача
	@ApiTags("Resume API")
	@ApiOperation({ summary: "Create resume by user ID" })
	@ApiResponse({ status: 200, type: Resume })
	@Post(':user_id/resumes')
	async createResume(@Param('user_id') user_id: number, @Body() data: ResumeDto) {
		// TODO update this code
		const user_data = await this.userService.getDataForResume(user_id);
		const resume_data = ({ ...data, user_id, ...user_data });
		return this.resumeService.create(resume_data);
	}

	// GET /users/{user_id}/resumes/{id} - повертає конкретне резюме конкретного користувача за його ідентифікатором
	@ApiTags("Resume API")
	@ApiOperation({ summary: "Get resume" })
	@ApiResponse({ status: 200, type: [Resume] })
	@Get(':user_id/resumes/:id') // TODO must be two params in function
	getResumeById(@Param('id') id: number): Promise<Resume> {
		// TODO check resumeService
		return this.resumeService.getById(id);
	}

	// PUT /users/{user_id}/resumes/{id} - оновлює конкретне резюме конкретного користувача за його ідентифікатором
	@ApiTags("Resume API")
	@ApiOperation({ summary: "Update resume by Id" })
	@ApiResponse({ status: 203, type: ResumeDto })
	@Put(':user_id/resumes/:id') // TODO must be two params in function
	async updateResume(@Param('id') id: number, @Body() data: Partial<Resume>): Promise<Resume> {
		// TODO check resumeService
		return this.resumeService.update(id, data);
	}

	// DELETE /users/{user_id}/resumes/{id} - видаляє конкретне резюме конкретного користувача за його ідентифікатором
	@ApiTags("Resume API")
	@ApiOperation({ summary: "Delete resume by Id" })
	@ApiResponse({ status: 204, type: Resume })
	@Delete(':user_id/resumes/:id') // TODO must be two params in function
	async deleteResume(@Param('id') id: number): Promise<void> {
		// TODO check resumeService
		this.resumeService.delete(id);
	}

	// GET /users/{user_id}/contracts/employer - повертає список всіх контрактів, пов'язаних з конкретним користувачем (роботодавцем)
	@ApiTags("Contract API")
	@ApiOperation({ summary: "Get contracts by employerId" })
	@ApiResponse({ status: 200, type: [Contract] })
	@Get(':user_id/contracts/employer')
	async getEmployerById(@Param('user_id') user_id: number): Promise<Contract[]> {
		return this.contractService.findByEmployerId(user_id)
	}

	// GET /users/{user_id}/contracts/worker - повертає список всіх контрактів, пов'язаних з конкретним користувачем (Робітником)
	@ApiTags("Contract API")
	@ApiOperation({ summary: "Get contracts by workerId" })
	@ApiResponse({ status: 200, type: [Contract] })
	@Get(':user_id/contracts/worker')
	async getWorkerById(@Param('user_id') user_id: number): Promise<Contract[]> {
		return this.contractService.findByWorkerId(user_id)
	}


	// GET /users/{user_id}/chats - повертає список всіх чатів, пов'язаних з конкретним користувачем
	// GET /users/{user_id}/messages - повертає список всіх повідомлень, пов'язаних з конкретним користувачем
	// GET /users/{user_id}/reviews - повертає список всіх відгуків, пов'язаних з конкретним користувачем
	
	// TODO the announcement must not have a controller, only module and service
	// GET /users/{user_id}/announcements - повертає список всіх оголошень, створених конкретним користувачем
	// POST /users/{user_id}/announcements - створює нове оголошення для конкретного користувача
	// GET /users/{user_id}/announcements/{id} - повертає конкретне оголошення конкретного користувача за його ідентифікатором
	// PUT /users/{user_id}/announcements/{id} - оновлює конкретне оголошення конкретного користувача за його ідентифікатором
	// DELETE /users/{user_id}/announcements/{id} - видаляє конкретне оголошення конкретного користувача за його ідентифікаторо
	
	// GET /users/{user_id}/announcements/{id}/followers - повертає список всіх підписників конкретного оголошення
	// POST /users/{user_id}/announcements/{id}/followers - додає нового підписника до списку підписників конкретного оголошення
	// GET /users/{user_id}/announcements/{id}/followers/{id} - повертає конкретного підписника конкретного оголошення за його ідентифікатором
	// PUT /users/{user_id}/announcements/{id}/followers/{id} - оновлює конкретного підписника конкретного оголошення за його ідентифікатором
	// DELETE /users/{user_id}/announcements/{id}/followers/{id} - видаляє конкретного підписника конкретного оголошення за його ідентифікатором


	// 
}

