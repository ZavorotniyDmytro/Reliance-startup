//import { IsString, IsNotEmpty, IsNumber } from "class-validator";

import { ApiProperty } from "@nestjs/swagger/dist";

export class CreateUserDto {

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

	@ApiProperty({ example: 'some/url/to_avatar.png', description: "Avatar url" })
	public avatar_url: string;

	// @ApiProperty({ example: announcementMOCK, description: "Announcement list" })
	// public announcement_list: Announcement[] = [];

	// @ApiProperty({ example: ChatMocks.chats, description: "Announcement list" })
	// public chat_list: CreateChatDto[] = [];
	// 
}
