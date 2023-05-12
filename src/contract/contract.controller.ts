import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { Inject, Put } from '@nestjs/common/decorators';
import { ClientProxy } from '@nestjs/microservices/client';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';

@Controller('contracts')
export class ContractController {
  	constructor(@Inject("CONTRACT_SERVICE") private readonly contractService: ClientProxy) {}

	@Post()
	create(@Body() createContractDto: CreateContractDto) {
		return this.contractService.send({
			cmd: 'create-contract'
		}, createContractDto)
	}


	@Get()
	findAll() {
		return this.contractService.send({
			cmd: 'find-all-contract'
		}, '')
	}

	@Get('/:id')
	findOne(@Param('id') id: number) {
		return this.contractService.send({
			cmd: 'find-one-contract'
		}, id)
	}

	@Get('/worker/:id')
	findAllByWorker(@Param('id') id: number) {
		return this.contractService.send({
			cmd:'find-all-by-worker-contract'
		}, id)
	}

	@Get('/employer/:id')
	findAllByEmployer(@Param('id') id: number) {
		return this.contractService.send({
			cmd:'find-all-by-employer-contract'
		}, id)
	}

	@Put()
	update(@Body() updateContractDto: UpdateContractDto) {
		return this.contractService.send({
				cmd:'update-contract'
			}, updateContractDto)
	}

	@Delete('/:id')
	delete(@Param('id') id: number) {
		return this.contractService.send({
			cmd:'remove-contract'
		}, id)
	}
}
