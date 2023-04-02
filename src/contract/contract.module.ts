import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ContractService } from './contract.service';
import { ContractController } from './contract.controller';
import { Contract } from 'src/models/contract.model';
import { Review } from 'src/models/review.model';

@Module({
	imports: [
		SequelizeModule.forFeature([Contract, Review])
	],
	controllers: [ContractController],
	providers: [ContractService]
})
export class ContractModule {}
