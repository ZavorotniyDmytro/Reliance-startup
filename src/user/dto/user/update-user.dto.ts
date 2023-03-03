//import { IsString, IsNotEmpty, IsNumber } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";

import { Announcement } from "src/announcement/dto/announcement/create-announcement.dto";
import { CreateChatDto } from "src/chats/dto/chats-dto";
import { announcementMOCK } from "src/mocks/announcement.mock";
import { ChatMocks } from "src/mocks/chat.mock";

export class UpdateUserDto {
	@ApiProperty({ example: 1, description: "ID" })
	//@IsNumber()
	public user_id: number;

	@ApiProperty({ example: 'John', description: "Name" })
	//@IsString()
	//@IsNotEmpty()
	public name: string;

	@ApiProperty({ example: 25, description: "Age" })
	//@IsNumber()
	public age: number;

	@ApiProperty({ example: 'example@mail.ua', description: "Email" })
	//@IsString()
	//@IsNotEmpty()
	public email: string;

	@ApiProperty({ example: '12345678', description: "Password" })
	//@IsString()
	//@IsNotEmpty()
	public password: string;

	@ApiProperty({ example: announcementMOCK, description: "Announcement list" })
	public announcement_list: Announcement[] = [];

	@ApiProperty({ example: ChatMocks.chats, description: "Announcement list" })
	public chat_list: CreateChatDto[] = [];
}
