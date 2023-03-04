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
import { User } from './user.model';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) { }

	@ApiTags("User API")
	@ApiOperation({ summary: "Get all users" })
	@ApiResponse({ status: 200, type: [User] })
	@Get()
	getAllUsers(): Promise<User[]> {
		console.log("1")
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
	@ApiResponse({ status: 200, type: User })
	@Put(':id')
	async update(@Param('id') id: number, @Body() data: Partial<User>): Promise<User> {
		return this.userService.update(id, data);
	}

	@ApiTags("User API")
	@ApiOperation({ summary: "Delete user by ID" })
	@ApiResponse({ status: 200, type: User })
	@Delete(':id')
	async delete(@Param('id') id: number): Promise<void> {
		this.userService.delete(id);
	}




	@ApiTags("User API")
	@ApiOperation({ summary: "Get all announcement by user ID" })
	@ApiResponse({ status: 200, type: Announcement })
	@Get(':user_id/announcements')
	getAllAnnouncement(@Param('user_id') user_id: string) {
		console.log(user_id)
		return this.userService.getAllAnnouncement(user_id);
	}

	// get :user_id/chats
}

