import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ContractService } from './contract.service';
import { ContractController } from './contract.controller';
import { Contract } from 'src/models/contract.model';
import { Review } from 'src/models/review.model';
import { User } from 'src/models/user.model';
import { Material } from 'src/models/material.model';
import { ContractMaterial } from 'src/models/contract-material.model';
import { Worker } from 'src/models/worker.model';
import { UserModule } from 'src/user/user.module';
import { Follower } from 'src/models/follower.model';

@Module({
	imports: [forwardRef(() =>UserModule),
		SequelizeModule.forFeature([Contract, Review,Follower, User, Material, ContractMaterial, Worker])
	],
	controllers: [ContractController],
	providers: [ContractService],
	exports: [ContractService]
})
export class ContractModule {}
