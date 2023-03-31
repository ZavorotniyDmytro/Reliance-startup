import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller('review')
export class ReviewController {
  	constructor(private readonly reviewService: ReviewService) {}

  	@Post()
  	createReview(@Body() review: CreateReviewDto) {
    	// Створення нового відгуку
    	return this.reviewService.create(review);
  	}
}
