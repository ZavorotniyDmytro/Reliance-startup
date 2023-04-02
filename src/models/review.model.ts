import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Contract } from "./contract.model";
import { User } from "./user.model";

interface ReviewCreationAttrs {
   rating: number;
	user_id: number;
	contract_id: number;
	text: string;
}

@Table({ tableName: 'reviews' })
export class Review extends Model<Review, ReviewCreationAttrs>{

	@ApiProperty({example: 1, description: "Review ID"})
   @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
   public review_id: number;

	@ApiProperty({example:2 , description: "User ID"})
	@ForeignKey(()=>User)
	@Column({type: DataType.INTEGER, allowNull: false})
	public user_id: number

	@BelongsTo(()=>User, 'user_id')
	public user: User

	@ApiProperty({example:14 , description: "Contract ID"})
	@ForeignKey(()=>Contract)
	@Column({type: DataType.INTEGER, allowNull: false, unique: true})
	public contract_id: number

	@BelongsTo(()=>Contract, 'contract_id')
	public contract: Contract

	@ApiProperty({example: 47, description: "Review rating 1 to 50"})
   @Column({type: DataType.INTEGER, allowNull: true })
   public rating: number;

	@ApiProperty({example: "Good work", description: "Review text"})
   @Column({type: DataType.STRING, allowNull: true })
   public text: string;
}

