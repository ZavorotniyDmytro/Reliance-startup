import { Injectable } from '@nestjs/common';
import { UpdateAnnouncementDto } from './dto/announcement/update-announcement.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Announcement } from '@lib/models/announcement.model';
import { CreateAnnouncementDto } from './dto/announcement/create-announcement.dto';

@Injectable()
export class AnnouncementService {
	constructor(
		@InjectModel(Announcement) private announcementRepository: typeof Announcement,
		){}

	async create(createAnnouncementDto: CreateAnnouncementDto):Promise<Announcement> {
		
		const announcement = await this.announcementRepository.create({
			...createAnnouncementDto
		})	
		return announcement
	}

	async findAll():Promise<Announcement[]> {
		return await this.announcementRepository.findAll({include:{all:true}});
	}

	async findOne(id: number):Promise<Announcement> {
		return await this.announcementRepository.findOne({where:{announcement_id:id}, include:{all:true}});
	}

	
	async update(id: number, updateContractDto: UpdateAnnouncementDto) {
		const announcement = await this.findOne(id);
		return await announcement.update(updateContractDto);
	}

	async delete(id: number):Promise<void> {
		const announcement = await this.findOne(id);
		await announcement.destroy();
	}
}
