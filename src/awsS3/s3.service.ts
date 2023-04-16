import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Injectable()
export class S3Service {
  	private readonly s3: AWS.S3;

	constructor(
		private readonly configService: ConfigService
	) {
		this.s3 = new AWS.S3({
			accessKeyId: 'your-access-key-id',
			secretAccessKey: 'your-secret-access-key',
		});
	}

	
}