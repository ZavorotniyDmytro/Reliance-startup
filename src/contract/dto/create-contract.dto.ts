import { ContractStatus } from "../contrartStatus.enum";

export class CreateContractDto {
	//id: number;
	title: string;
	discription: string;
	price: number;

	//date_of_conclusion: Date;
	employer_id: number;
	//employer_signatures: Signatures
	worker_id: number;
	//worker_signatures: Signatures
	//conditions: ContractCondition[];	
	//changes: ContractChange[] // історія
	validity_period: Date
	status: ContractStatus
}
