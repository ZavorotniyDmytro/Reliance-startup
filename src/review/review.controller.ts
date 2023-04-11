import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { HttpService } from '@nestjs/axios/dist';
import { ConfigService } from '@nestjs/config';

@Controller('reviews')
export class ReviewController {
  	constructor(
		private readonly reviewService: ReviewService,
		private readonly httpService: HttpService,
		private readonly configService: ConfigService,
		) {}

  	@Post()
  	async createReview(@Body() review: CreateReviewDto) {
    	const createdReview = await this.reviewService.create(review);

		// this.httpService.post(
		// 	this.configService.get<string>('WEBHOOKSITE_URL'),
		//		// must be data
		// 		)
		// 	.subscribe({
		// 		complete: () => { 
		// 			console.log('---------- WEBHOOK USED -----------'); 
		// 		}, 
		// 		error: (err) => { 
		// 			console.log(`error - ${err}`); 
		// 		},
		// 	})
		await this.reviewService.sendMailCreate(review.reviewer_id, review.user_id, review.text)

		return createdReview
  	}

	@Get()
	getAllReview(){
		return this.reviewService.findAll()
	}
}
