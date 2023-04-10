import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { Put } from '@nestjs/common/decorators';
import { ContractService } from './contract.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';

@Controller('contract')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

	@Post()
	create(@Body() createContractDto: CreateContractDto) {
		return this.contractService.create(createContractDto);
	}

	@Get()
	findAll() {
		return this.contractService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: number) {
		return this.contractService.findOne(+id);
	}

	@Put(':id')
	update(@Param('id') id: number, @Body() updateContractDto: UpdateContractDto) {
		return this.contractService.update(id, updateContractDto);
	}

	@Delete(':id')
	remove(@Param('id') id: number) {
		return this.contractService.delete(id);
	}
}
