import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ContractService } from './contract.service';
import { ContractController } from './contract.controller';
import { Contract } from 'src/models/contract.model';
import { Review } from 'src/models/review.model';
import { User } from 'src/models/user.model';
import { Material } from 'src/models/material.model';
import { ContractMaterial } from 'src/models/contract-material.model';

@Module({
	imports: [
		SequelizeModule.forFeature([Contract, Review, User, Material, ContractMaterial])
	],
	controllers: [ContractController],
	providers: [ContractService]
})
export class ContractModule {}
