import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ClientProxy } from '@nestjs/microservices/client';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from '../../libs/models/src/review.model';
import { Contract } from '@lib/models/contract.model';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { ContractStatus } from 'src/contract/contractStatus.enum';
import { MailerService } from '@nestjs-modules/mailer/dist';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ReviewService {
	constructor(
		@InjectModel(Review) private reviewRepository: typeof Review,
		@Inject("CONTRACT_SERVICE") private readonly contractService: ClientProxy,
		private readonly mailerService: MailerService,
		private readonly userService: UserService
		){}

	async create(createReviewDto: CreateReviewDto):Promise<Review> {
		const contract = this.contractService
			.send({cmd:'find-one-contract'}, createReviewDto.contract_id)
			.subscribe((c)=>{return c})

		if (this.checkContract(contract.unsubscribe()))
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
