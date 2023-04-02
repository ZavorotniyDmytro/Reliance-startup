import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, HasOne, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Resume } from "./resume.model";

interface UserCreationAttrs {
	email: string
	password: string
}

@Table({ tableName: 'users' })
export class User 
						extends Model<User, UserCreationAttrs> 
						implements UserCreationAttrs{

	@ApiProperty({ example: 1, description: "ID" })
	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	public user_id: number;

	@ApiProperty({ example: 'John', description: "Name" })
	@Column({ type: DataType.STRING(20), allowNull: false})
	public name: string;

	@ApiProperty({ example: 25, description: "Age" })
	@Column({ type: DataType.INTEGER, allowNull: false })
	public age: number;

	@ApiProperty({ example: "+380789991122", description: "Phone" })
	@Column({ type: DataType.STRING(17), unique:true, allowNull: false })
	public phone: string;

	@ApiProperty({ example: 'example@mail.ua', description: "Email" })
	@Column({ type: DataType.STRING(40), unique: true, allowNull: false })
	public email: string;

	@ApiProperty({ example: '12345678', description: "Password" })
	@Column({ type: DataType.STRING(32), allowNull: false })
	public password: string;


	@HasOne(()=>Resume, 'user_id')
	resume: Resume //(o t o)

	// announcements [] (o t m)

	// chats [] (m t m)

	// reviews [] (o t m)

	// messages [] ( o t m)

	// roles [] (m t m)
}