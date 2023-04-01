import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ContractService } from './contract.service';
import { ContractController } from './contract.controller';
import { Contract } from 'src/models/contract.model';

@Module({
	imports: [
		SequelizeModule.forFeature([Contract])
	],
	controllers: [ContractController],
	providers: [ContractService]
})
export class ContractModule {}
