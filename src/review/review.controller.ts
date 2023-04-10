import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { HttpService } from '@nestjs/axios/dist';

@Controller('reviews')
export class ReviewController {
  	constructor(
		private readonly reviewService: ReviewService,
		private readonly httpService: HttpService
		) {}

  	@Post()
  	async createReview(@Body() review: CreateReviewDto) {
    	const createdReview = await this.reviewService.create(review);

		// this.httpService.post('https://webhook.site/dacccec6-6017-4dce-b464-dbaf28d7f980')
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
