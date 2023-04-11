import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import { UserService } from 'src/user/user.service';
import { Contract } from '../models/contract.model';
import { ContractStatus } from './contrartStatus.enum';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';

@Injectable()
export class ContractService {
	constructor(
		@InjectModel(Contract) private contractRepository: typeof Contract,
		private readonly userService: UserService,
		){}

	async create(createContractDto: CreateContractDto):Promise<Contract> {
		//const employer: User = await this.userService.getById(createContractDto.employer_id)
		
		const workers = await this.userService.getUsersByIDs(createContractDto.worker_id)		

		const contract = await this.contractRepository.create({
			discription: createContractDto.discription,
			price: createContractDto.price,
			validity_period: createContractDto.validity_period,
			status: ContractStatus.ACTIVE,
			employer_id: createContractDto.employer_id,
		})	
		
		await contract.$set('workers', workers)

		// const contract_material = this.contractMatrialRepository.findAll({where:{id:id, }});
		// contract_material.$set('contract_materials', )
		return contract

	}

	async findAll():Promise<Contract[]> {
		return await this.contractRepository.findAll({include:{all:true}});
	}

	async findOne(id: number):Promise<Contract> {
		return await this.contractRepository.findOne({where:{id:id}, include:{all:true}});
	}

	async findByEmployerId(employer_id: number):Promise<Contract[]> {
		return await this.contractRepository.findAll({where:{employer_id:employer_id}, include:{all:true}});
	}

	async findByWorkerId(worker_id: number):Promise<Contract[]> {		
		return await this.contractRepository.findAll({
			include: [
				{all:true},
				{
					model: User,
					as: 'workers',
					attributes: ['name']
				}
			],
			where: {
				// САМЕ ТАК МОЖНА ЗВЕРНУТИСЬ ДО ТАБЛИЦІ ПРИ ВІДНОШЕННІ MTM
				'$workers.user_id$': worker_id
			}
	  });
	}

	async update(id: number, updateContractDto: UpdateContractDto) {
		const contract = await this.findOne(id);
		return await contract.update(updateContractDto);
	}

	async delete(id: number):Promise<void> {
		const contract = await this.findOne(id);
		await contract.destroy();
	}
}
