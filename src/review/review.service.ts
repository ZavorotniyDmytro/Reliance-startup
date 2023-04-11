import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from '../models/review.model';
import { ContractService } from 'src/contract/contract.service';
import { Contract } from 'src/models/contract.model';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { ContractStatus } from 'src/contract/contrartStatus.enum';
import { MailerService } from '@nestjs-modules/mailer/dist';
import { UserService } from 'src/user/user.service';
import { SendGridService } from '@anchan828/nest-sendgrid';

@Injectable()
export class ReviewService {
	constructor(
		@InjectModel(Review) private reviewRepository: typeof Review,
		private readonly contractService: ContractService,
		//private readonly sendGridService: SendGridService,
		private readonly mailerService: MailerService,
		private readonly userService: UserService
		){}

	async create(createReviewDto: CreateReviewDto):Promise<Review> {
		const contract = await this.contractService.findOne(createReviewDto.contract_id)

		if (this.checkContract(contract))
			return await this.reviewRepository.create(createReviewDto);

		throw new HttpException('The contract is not completed', HttpStatus.BAD_REQUEST)		
	}

	async findAll(){
		return await this.reviewRepository.findAll({include:{all:true}})
	}

	private checkContract(contract: Contract): boolean{
		if (contract.status === ContractStatus.CANCELED ||
			 contract.status === ContractStatus.COMPLETE) return true
		else return false		
	}

	async sendMailCreate(from_user_id, to_user_id, text: string): Promise<void> {
		const reviewer = await this.userService.getById(from_user_id)
		const user = await this.userService.getById(to_user_id)

		await this.mailerService
		  .sendMail
		// await this.sendGridService
		//   .send
		({
			 to: user.email,//user.email, // list of receivers
			 from: 'reliace.manager@gmail.com', // sender address
			 subject: `${reviewer.name} left a feedback about you✔`, // Subject line
			 text: `Hello, ${user.name}.\n${reviewer.name} left a review about you related to the contract - "${text}"`, // plaintext body
			 html: `<strong>Hello, ${user.name}.\n${reviewer.name} left a review about you related to the contract - "${text}"</strong>`, // HTML body content
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
