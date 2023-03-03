import { Injectable } from '@nestjs/common';
import { Announcement } from './dto/announcement/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/announcement/update-announcement.dto';
import { AnnouncementExeption } from './exeption/announcement.exeption/announcement.exeption';
import { announcementMOCK } from 'src/mocks/announcement.mock';

@Injectable()
export class AnnouncementService {
	private announcement = [] // мало б бути announcements

	getAll() {
		return this.announcement
	}

	getById(id: number) {
		return this.announcement.find(a => a.id === id)
	}

	// метод для route
	getByOwnerId_MOCKS(user_id: string) {
		let announcementsMOCK = []
		for (const item of announcementMOCK)
			if (item.ownerId === user_id)
				announcementsMOCK.push(item)

		return announcementsMOCK
	}

	create(createannouncementDto: Announcement) {
		this.announcement.push({
			...createannouncementDto,
			id: Date.now().toString()
		})
	}

	deleteById(id: number) {
		const newAnnouncement = this.announcement.filter(a => a.id !== id)
		if (newAnnouncement.length === this.announcement.length) {
			throw new AnnouncementExeption('No announcement found!')
		}
		this.announcement = newAnnouncement
	}

	deleteAnnouncements() {
		this.announcement = []
	}

	updateAnnouncement(updateAnnouncement: Partial<UpdateAnnouncementDto>, id: number) {

		const index = this.announcement.findIndex(a => a.id === id)
		this.announcement[index] = {
			...this.announcement[index],
			...updateAnnouncement
		}
		//let newAnnouncement = this.announcement.filter(a => a.id !== id)
		//newAnnouncement.push({
		//	...updateAnnouncement,
		// 	id: id
		// })
		// this.announcement = newAnnouncement
	}

}
