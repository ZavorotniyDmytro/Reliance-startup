import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('reviews')
export class ReviewController {
  	constructor(
		private readonly reviewService: ReviewService,
		) {}

  	@Post()
  	async createReview(@Body() review: CreateReviewDto) {
    	const createdReview = await this.reviewService.create(review);
		await this.reviewService.sendMailCreate(review.reviewer_id, review.user_id, review.text)
		return createdReview
  	}

	@Get()
	getAllReview(){
		return this.reviewService.findAll()
	}
}
