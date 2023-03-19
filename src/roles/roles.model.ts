import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface RolesCreationAttrs {
	value: string
	description: string
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RolesCreationAttrs>{

	@ApiProperty({ example: 1, description: "role ID" })
	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	public id: number;

	@ApiProperty({ example: 'ADMIN', description: "Role name" })
	@Column({ type: DataType.STRING, unique: true, allowNull: false })
	public value: string;

	@ApiProperty({ example: "It`s admin role", description: "Role discription" })
	@Column({ type: DataType.STRING, allowNull: false })
	public description: string;
}