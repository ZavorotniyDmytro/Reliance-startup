import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ContractController } from './contract.controller';
import { Contract } from '@lib/models/contract.model';
import { Review } from '@lib/models/review.model';
import { User } from '@lib/models/user.model';
import { Material } from '@lib/models/material.model';
import { ContractMaterial } from '@lib/models/contract-material.model';
import { Worker } from '@lib/models/worker.model';
import { UserModule } from 'src/user/user.module';
import { Follower } from '@lib/models/follower.model';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

const ContractService = {
   provide: 'CONTRACT_SERVICE',
   useFactory: (configService: ConfigService) => (
		ClientProxyFactory.create({
			transport: Transport.TCP,
			options: {
				host: configService.get('CONTRACT_SERVICE_HOST'),
				port: configService.get('CONTRACT_SERVICE_PORT'),
			}
		})
   ),
   inject: [ConfigService],
	imports: [ConfigModule]   
}

@Module({
	imports: [ConfigModule, forwardRef(() =>UserModule),
		SequelizeModule.forFeature([Contract, Review,Follower, User, Material, ContractMaterial, Worker])
	],
	controllers: [ContractController],
	providers: [ContractService],
	exports: [ContractService]
})
export class ContractModule {}
