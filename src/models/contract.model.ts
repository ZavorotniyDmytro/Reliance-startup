import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";
import { ContractStatus } from "../contract/contrartStatus.enum";

interface ContractCreationAttrs {
    price:number;
	 discription: string;
	 employer_id: number;
	 worker_id: number;
	 status: ContractStatus;
}

@Table({ tableName: 'contracts' })
export class Contract extends Model<Contract, ContractCreationAttrs>{

	@ApiProperty({example: 1, description: "Contact ID"})
   @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
   public id: number;

   @ApiProperty({example: "Some contract. Rules: ...", description: "Contact discription", })
   @Column({type: DataType.STRING, allowNull: false})
   public discription: string;
    
   @ApiProperty({example: 400, description: "Contract price"})
   @Column({type: DataType.INTEGER })
   public price: number;

   @ApiProperty({example: 15, description: "Employer user ID"})
   @Column({type: DataType.INTEGER })
   public employer_id: number;

	@ApiProperty({example: 11, description: "Worker user ID"})
   @Column({type: DataType.INTEGER })
   public worker_id: number;

   @ApiProperty({example: Date.now(), description: "Contract validity period"})
   @Column({type: DataType.DATE})
   public validity_period: Date;

   @ApiProperty({example: "active", description: "Contract status"})
   @Column({type: DataType.STRING, allowNull: false})
   public status: ContractStatus;
}

