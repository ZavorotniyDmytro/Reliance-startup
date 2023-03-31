import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface UserCreationAttrs {
	email: string
	password: string
}

@Table({ tableName: 'users' })
export class User 
						extends Model<User, UserCreationAttrs> 
						implements UserCreationAttrs{

	@ApiProperty({ example: 1, description: "ID" })
	@Column({ type: DataType.INTEGER.UNSIGNED, unique: true, autoIncrement: true, primaryKey: true })
	public user_id: number;

	@ApiProperty({ example: 'John', description: "Name" })
	@Column({ type: DataType.STRING(20), allowNull: false})
	public name: string;

	@ApiProperty({ example: 25, description: "Age" })
	@Column({ type: DataType.INTEGER.UNSIGNED, allowNull: false })
	public age: number;

	@ApiProperty({ example: 'example@mail.ua', description: "Email" })
	@Column({ type: DataType.STRING(40), unique: true, allowNull: false })
	public email: string;

	@ApiProperty({ example: '12345678', description: "Password" })
	@Column({ type: DataType.STRING(32), allowNull: false })
	public password: string;

	//@Column({ type: [Announcement], defaultValue: })
	//public announcement_list: Announcement[];
	//
	//public chat_list: CreateChatDto[];
}