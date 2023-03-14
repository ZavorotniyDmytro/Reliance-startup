import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface UserCreationAttrs {
	email: string
	password: string
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs>{

	@ApiProperty({ example: 1, description: "ID" })
	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	public user_id: number;

	@ApiProperty({ example: 'John', description: "Name" })
	@Column({ type: DataType.STRING})
	public name: string;

	@ApiProperty({ example: 25, description: "Age" })
	@Column({ type: DataType.INTEGER })
	public age: number;

	@ApiProperty({ example: 'example@mail.ua', description: "Email" })
	@Column({ type: DataType.STRING, unique: true, allowNull: true })
	public email: string;

	@ApiProperty({ example: '12345678', description: "Password" })
	@Column({ type: DataType.STRING, allowNull: true })
	public password: string;

	//@Column({ type: [Announcement], defaultValue: })
	//public announcement_list: Announcement[];
	//
	//public chat_list: CreateChatDto[];
}