import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AnnouncementService } from './announcement.service';
import { Announcement } from './dto/announcement/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/announcement/update-announcement.dto';

@ApiTags("Announsement API")
@Controller('announcements')
export class AnnouncementController {

	constructor(private readonly announcementService: AnnouncementService) {
	}
	@Get()
	getAll() {
		return this.announcementService.getAll()
	}


	@Get(":id")
	getOne(@Param('id') id: number) {
		return this.announcementService.getById(id)
	}

	@Post()
	create(@Body() createAnnouncementDto: Announcement) {
		this.announcementService.create(createAnnouncementDto)
	}

	@Delete(':id')
	remove(@Param('id') id: number) {
		this.announcementService.deleteById(id)
	}
	@Delete()
	removeAll() {
		this.announcementService.deleteAnnouncements()
	}

	@Put(':id')
	update(@Body() updateAnnouncementDto: UpdateAnnouncementDto, @Param('id') id: number) {
		this.announcementService.updateAnnouncement(updateAnnouncementDto, id)
	}
}
