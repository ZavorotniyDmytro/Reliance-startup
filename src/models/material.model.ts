import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";
import { Sequelize } from "sequelize";

interface MaterialCreationAttrs {
	price: number
}

@Table({ tableName: 'materials' })
export class Material extends Model<Material, MaterialCreationAttrs> {

	@ApiProperty({ example: 3, description: "Material ID" })
	@Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
	public material_id: number;

	@ApiProperty({example: 102.99, description: "Material price"})
   @Column({type: DataType.DECIMAL(12, 2), allowNull: false})
   public price: number;

	@ApiProperty({example: "Lorem ipsum dolor sit amet", description: "Announcement content"})
   @Column({type: DataType.STRING, allowNull: false})
   public discription: string;

	// where_used: Contract[] ( m t m )
}