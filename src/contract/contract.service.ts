import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Contract } from '../models/contract.model';
import { ContractStatus } from './contrartStatus.enum';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';

@Injectable()
export class ContractService {
	constructor(
		@InjectModel(Contract) private contractRepository: typeof Contract,
		){}

	create(createContractDto: CreateContractDto):Promise<Contract> {
		const contract = this.contractRepository.create({
			...createContractDto, 
			status:ContractStatus.ACTIVE
		})

		// const contract_material = this.contractMatrialRepository.findAll({where:{id:id, }});
		// contract_material.$set('contract_materials', )
		return contract

	}

	findAll():Promise<Contract[]> {
		return this.contractRepository.findAll({where:{}});
	}

	findOne(id: number):Promise<Contract> {
		return this.contractRepository.findOne({where:{id:id}});
	}

	findByEmployerId(employer_id: number):Promise<Contract[]> {
		return this.contractRepository.findAll({where:{employer_id:employer_id}});
	}

	update(id: number, updateContractDto: UpdateContractDto) {
		return `This action updates a #${id} contract`;
	}

	remove(id: number) {
		return `This action removes a #${id} contract`;
	}
}
