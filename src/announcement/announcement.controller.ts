import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AnnouncementService } from './announcement.service';
import { CreateAnnouncementDto } from './dto/announcement/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/announcement/update-announcement.dto';

@ApiTags("Announsement API")
@Controller('announcements')
export class AnnouncementController {

	constructor(private readonly announcementService: AnnouncementService) {
	}
	@Get()
	getAll() {
		return this.announcementService.findAll()
	}


	@Get(":id")
	getOne(@Param('id') id: number) {
		return this.announcementService.findOne(id)
	}

	@Post()
	create(@Body() createAnnouncementDto: CreateAnnouncementDto) {
		return this.announcementService.create(createAnnouncementDto)
	}

	@Delete(':id')
	remove(@Param('id') id: number) {
		this.announcementService.delete(id)
	}

	@Put(':id')
	update(@Body() updateAnnouncementDto: UpdateAnnouncementDto, @Param('id') id: number) {
		return this.announcementService.update(id, updateAnnouncementDto)
	}
}
