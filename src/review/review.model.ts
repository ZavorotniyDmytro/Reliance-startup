import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ReviewCreationAttrs {
    
}

@Table({ tableName: 'reviews' })
export class Review extends Model<Review, ReviewCreationAttrs>{

	// @ApiProperty({example: 1, description: "Contact ID"})
   // @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
   // public id: number;

   // @ApiProperty({example: "Some contract. Rules: ...", description: "Contact discription", })
   // @Column({type: DataType.STRING, allowNull: false})
   // public discription: string;
    
   
}

