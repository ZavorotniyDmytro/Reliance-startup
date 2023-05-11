import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateFollowerDto } from './dto/create-follower.dto';
import { Follower } from '@lib/models/follower.model';
import { MailerService } from '@nestjs-modules/mailer/dist';
import { UserService } from 'src/user/user.service';
import { AnnouncementService } from 'src/announcement/announcement.service';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

@Injectable()
export class FollowerService {
	constructor(
		@InjectModel(Follower) private followerRepository: typeof Follower,
		private readonly announcementService: AnnouncementService,
		private readonly mailerService: MailerService,
		private readonly userService: UserService
		){}

	async create(createFollowerDto: CreateFollowerDto):Promise<Follower> {
		console.log(createFollowerDto)
		const announcement = await this.announcementService.findOne(createFollowerDto.announcement_id)
		if (announcement){
			const follower = await this.followerRepository.create({...createFollowerDto});
			return follower
		}
		else throw new HttpException('Wrong dto.', HttpStatus.BAD_REQUEST)
	}

	async findAll(){
		return await this.followerRepository.findAll({include:{all:true}})
	}
	
	
	async sendMailCreate(announcement_id, follower_id): Promise<void> {
		const follower = await this.userService.getById(follower_id)
		const announcement = await this.announcementService.findOne(announcement_id)
		const announcement_owner = await this.userService.getById(announcement.user_id)

		await this.mailerService
		  .sendMail
		({
			 to: announcement_owner.email,
			 from: 'reliace.manager@gmail.com',
			 subject: `${follower.name} subscribed to your announcement✔`, 
		  })
		  .then(() => { 
			console.log(`MAIL SENDED from: reliace.manager@gmail.com to ${announcement_owner.email}`)
		})
		  .catch((err) => { 
			console.log(`${err}`)
			// throw new HttpException(`MailSendException: ${err},HttpStatus.`)
		});
	 }
}

