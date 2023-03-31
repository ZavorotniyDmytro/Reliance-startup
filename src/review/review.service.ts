import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from '../models/review.model';

@Injectable()
export class ReviewService {
	constructor(
		@InjectModel(Review) private reviewRepository: typeof Review,
		){}

	create(createReviewDto: CreateReviewDto) {
		return this.reviewRepository.create(createReviewDto);
	}

}
