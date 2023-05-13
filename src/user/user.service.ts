import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AnnouncementService } from 'src/announcement/announcement.service';
import { User } from '../../libs/models/src/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/user/create-user.dto';
import { UpdateUserDto } from './dto/user/update-user.dto';
import { ResumeUserDto } from './dto/resume/resume-user.dto';
import { RoleService } from 'src/roles/role.service';

@Injectable()
export class UserService {
	constructor(
		@InjectModel(User) private userRepository: typeof User,
		private readonly roleService: RoleService,
	) { }

	public async getAll(): Promise<User[]> {
		return await this.userRepository.findAll({include:{all:true}});
	}

	public async getUsersByIDs(ids: number[]): Promise<User[]> {
		const workers = await this.userRepository.findAll({where:{user_id:[...ids]}, include:{all:true}});		
		return workers
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
		const user = await this.userRepository.create(data);
		const role = await this.roleService.getByName("USER")
		await user.$set('roles', [role.id])
		return user;
	}

	async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
		const user = await this.getById(id);
		return await user.update(updateUserDto);
	}

	async delete(user_id: number): Promise<void> {
		const user = await this.getById(user_id);
		await user.destroy();
	}

	// public getAllAnnouncements(user_id: string) {
	// 	return this.announcementService.getByOwnerId_MOCKS(user_id);
	// }

	async getDataForResume(user_id: number): Promise<ResumeUserDto> {
		let user = (await this.getById(user_id))["dataValues"];
		const user_data = { email: user.email, name: user.name };
		return user_data;
	}
}
