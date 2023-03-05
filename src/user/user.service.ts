import { Injectable } from '@nestjs/common';
import { AnnouncementService } from 'src/announcement/announcement.service';
import { User } from './user.model';
import { InjectModel } from '@nestjs/sequelize';

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
		return await this.userRepository.findOne({ where: { email } })
	}

	async getById(user_id: number): Promise<User> {
		return await this.userRepository.findOne({ where: { user_id } });
	}

	async create(data: User): Promise<User> {
		return this.userRepository.create(data);
	}

	async update(id: number, data: Partial<User>): Promise<User> {
		const user = this.getById(id);
		return (await user).update(data);
	}

	async delete(user_id: number): Promise<void> {
		const user = await this.getById(user_id);
		await user.destroy();
	}

	public getAllAnnouncement(user_id: string) {
		return this.announcementService.getByOwnerId_MOCKS(user_id);
	}
}
