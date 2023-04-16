import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FollowerService } from './follower.service';
import { CreateFollowerDto } from './dto/create-follower.dto';
import { UpdateFollowerDto } from './dto/update-follower.dto';
import { HttpService } from '@nestjs/axios/dist';
import { ConfigService } from '@nestjs/config';
import { Follower } from 'src/models/follower.model';

@Controller('followers')
export class FollowerController {
  	constructor(
		private readonly followerService: FollowerService,
		private readonly httpService: HttpService,
		private readonly configService: ConfigService,
		) {}

  	@Post()
  	async createFollower(@Body() follower: CreateFollowerDto) {
    	const createdFollower = await this.followerService.create(follower);

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
		await this.followerService.sendMailCreate(follower.follow_announcement_id, follower.user_id)

		return createdFollower
  	}

	
	  @Get()
	  getAllReview(){
		  return this.followerService.findAll()
	  }
}