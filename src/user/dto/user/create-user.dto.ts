//import { IsString, IsNotEmpty, IsNumber } from "class-validator";

import { ApiProperty } from "@nestjs/swagger/dist";

export class CreateUserDto {

	@ApiProperty({ example: 'John', description: "Name" })
	public name: string;

	@ApiProperty({ example: 25, description: "Age" })
	public age: number;

	@ApiProperty({ example: 'example@mail.ua', description: "Email" })
	public email: string;

	@ApiProperty({ example: '12345678', description: "Password" })
	public password: string;

	public phone: string;
	
	public avatar_url: string;
}
