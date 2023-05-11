import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ContractService } from './contract.service';
import { ContractController } from './contract.controller';
import { Contract } from '@lib/models/contract.model';
import { Review } from '@lib/models/review.model';
import { User } from '@lib/models/user.model';
import { Material } from '@lib/models/material.model';
import { ContractMaterial } from '@lib/models/contract-material.model';
import { Worker } from '@lib/models/worker.model';
import { UserModule } from 'src/user/user.module';
import { Follower } from '@lib/models/follower.model';

@Module({
	imports: [forwardRef(() =>UserModule),
		SequelizeModule.forFeature([Contract, Review,Follower, User, Material, ContractMaterial, Worker])
	],
	controllers: [ContractController],
	providers: [ContractService],
	exports: [ContractService]
})
export class ContractModule {}
