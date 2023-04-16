import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AswService } from './asw.service';

@Controller('asw')
export class AswController {
  	constructor(private readonly aswService: AswService) {}

	@Post()
	create(@Body() createAswDto) {
		return this.aswService.create();
	}

	@Get()
	findAll() {
		return this.aswService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.aswService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateAswDto) {
		return this.aswService.update(+id);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.aswService.remove(+id);
	}
}
