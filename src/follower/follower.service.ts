import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateFollowerDto } from './dto/create-follower.dto';
import { Follower } from 'src/models/follower.model';
import { ContractService } from 'src/contract/contract.service';
import { Contract } from 'src/models/contract.model';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { ContractStatus } from 'src/contract/contrartStatus.enum';
import { MailerService } from '@nestjs-modules/mailer/dist';
import { UserService } from 'src/user/user.service';
import { SendGridService } from '@anchan828/nest-sendgrid';
import { Announcement } from 'src/models/announcement.model';
import { announcementMOCK } from 'src/mocks/announcement.mock';

@Injectable()
export class FollowerService {
	constructor(
		@InjectModel(Follower) private followerRepository: typeof Follower,
		private readonly contractService: ContractService,
		//private readonly sendGridService: SendGridService,
		private readonly mailerService: MailerService,
		private readonly userService: UserService
		){}

	async create(createReviewDto: CreateFollowerDto):Promise<Follower> {
		const contract = await this.contractService.findOne(createReviewDto.follow_announcement_id)
			return await this.followerRepository.create(CreateFollowerDto);		
	}

	async findAll(){
		return await this.followerRepository.findAll({include:{all:true}})
	}
	
	
	async sendMailCreate(from_user_id, to_user_id): Promise<void> {
		const follower = await this.userService.getById(from_user_id)
		const user = await this.userService.getById(to_user_id)

		await this.mailerService
		  .sendMail
		// await this.sendGridService
		//   .send
		({
			 to: user.email,//user.email, // list of receivers
			 from: 'reliace.manager@gmail.com', // sender address
			 subject: `${follower.name} subscribed to your announcement✔`, // Subject line
		  })
		  .then(() => { 
			console.log(`MAIL SENDED from: reliace.manager@gmail.com to ${user.email}`)
		})
		  .catch((err) => { 
			console.log(`${err}`)
			// throw new HttpException(`MailSendException: ${err},HttpStatus.`)
		});
	 }
}

