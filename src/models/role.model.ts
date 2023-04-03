import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface RolesCreationAttrs {
	name: string
	description: string
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RolesCreationAttrs>{

	@ApiProperty({ example: 1, description: "role ID" })
	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	public id: number;

	@ApiProperty({ example: 'ADMIN', description: "Role name" })
	@Column({ type: DataType.STRING(20), unique: true, allowNull: false })
	public name: string;

	@ApiProperty({ example: "It`s admin role", description: "Role discription" })
	@Column({ type: DataType.STRING(200), allowNull: false })
	public description: string;
}