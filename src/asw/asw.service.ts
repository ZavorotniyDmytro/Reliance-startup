import { Injectable } from '@nestjs/common';

@Injectable()
export class AswService {
	create() {
		return 'This action adds a new asw';
	}

	findAll() {
		return `This action returns all asw`;
	}

	findOne(id: number) {
		return `This action returns a #${id} asw`;
	}

	update(id: number) {
		return `This action updates a #${id} asw`;
	}

	remove(id: number) {
		return `This action removes a #${id} asw`;
	}
}
