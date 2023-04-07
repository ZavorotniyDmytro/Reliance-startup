import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Review } from 'src/models/review.model';
import { User } from 'src/models/user.model';
import { Contract } from 'src/models/contract.model';

@Module({
	imports:[
		SequelizeModule.forFeature([Review, User, Contract])
	],
	controllers: [ReviewController],
	providers: [ReviewService]
})
export class ReviewModule {}
