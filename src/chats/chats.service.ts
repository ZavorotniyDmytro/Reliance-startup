import { Injectable } from '@nestjs/common';
import { CreateChatDto, UpdateChatDto } from './dto/chats-dto';
import { ChatsException } from './exception/chats.exception';

@Injectable()
export class ChatsService {
	private chats: CreateChatDto[] = [];

	getAllChats(): CreateChatDto[] {
		if (this.chats.length === 0)
			throw new ChatsException('There are no chats.');
		return this.chats;
	}

	// как я понял, поиск по ownerId
	// я переписал под поиск по chatId
	// также ниже будет поиск по chatMember
	getChatById(chat_id: string): CreateChatDto {
		for (const chat of this.chats)
			if (chat.chat_id === chat_id)
				return chat;
		throw new ChatsException('Such id does not exist.');
	}
	// не используется
	getChatsByMember(user_id: string): CreateChatDto[] {
		let chatsWhereMember: CreateChatDto[] = []
		// если нам нужно чат, где есть конкретный юзер нам нужно:
		// 1. перебрать все чаты
		for (let item of this.chats) {
			// 2. для каждого чата посмотреть среди членов чата user_id
			for (let i = 0; i < item.users_id.length; i++) {
				if (item.users_id[i] === user_id) {
					// если такой есть, мы его закидываем в массив
					chatsWhereMember.push(item)
					break
				}
			}
		}

		return chatsWhereMember
	}

	createChat(chatsDto: CreateChatDto): CreateChatDto {
		// это скорее всего лишнее, хз тебе решать

		//if (chatsDto.title.length == 0) {
		//	throw new ChatsException('Message is empty!');
		//}

		chatsDto.chat_id = this.generateId().toString();
		this.chats.push(chatsDto)
		return chatsDto;
	}

	removeChatById(chat_id: string) {
		const resultingArray: CreateChatDto[] = this.chats.filter(c => c.chat_id !== chat_id);

		if (resultingArray.length === this.chats.length) {
			throw new ChatsException('Such id does not exist.');
		}

		this.chats = resultingArray;
	}

	updateChat(chatsDto: UpdateChatDto, chat_id: string): void {
		let newChats: UpdateChatDto[] = this.chats.filter(
			(c) => c.chat_id !== chat_id,
		);

		newChats.push({
			chat_id: chat_id,
			...chatsDto
		});

		this.chats = newChats;
	}

	private generateId(): number {
		const currentSize = this.chats.length;
		if (!currentSize) {
			return 0;
		}

		return Number(this.chats[currentSize - 1].chat_id) + 1;
	}
}
