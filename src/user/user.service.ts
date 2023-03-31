import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AnnouncementService } from 'src/announcement/announcement.service';
import { User } from '../models/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/user/create-user.dto';
import { UpdateUserDto } from './dto/user/update-user.dto';
import { ResumeUserDto } from './dto/resume/resume-user.dto';

@Injectable()
export class UserService {
	constructor(
		@InjectModel(User) private userRepository: typeof User,
		private readonly announcementService: AnnouncementService,
	) { }

	public async getAll(): Promise<User[]> {
		return this.userRepository.findAll();
	}

	public async getByEmail(email: string): Promise<User> {
		const user = await this.userRepository.findOne({ where: { email } })
		if (user) {
			return user;
		}
		throw new HttpException('User with this email was not found', HttpStatus.NOT_FOUND);
	}

	async getById(user_id: number): Promise<User> {
		const user = await this.userRepository.findOne({ where: { user_id } })
		if (user) {
			return user;
		}
		throw new HttpException('User with this ID was not found', HttpStatus.NOT_FOUND);
	}

	async create(data: CreateUserDto): Promise<User> {
		return await this.userRepository.create(data);
	}

	async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
		const user = await this.getById(id);
		return await user.update(updateUserDto);
	}

	async delete(user_id: number): Promise<void> {
		const user = await this.getById(user_id);
		await user.destroy();
	}

	public getAllAnnouncement(user_id: string) {
		return this.announcementService.getByOwnerId_MOCKS(user_id);
	}

	async getDataForResume(user_id: number): Promise<ResumeUserDto> {
		let user = (await this.getById(user_id))["dataValues"];
		const user_data = { email: user.email, name: user.name };
		return user_data;
	}
}
