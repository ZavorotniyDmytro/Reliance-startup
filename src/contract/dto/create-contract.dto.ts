import { ContractStatus } from "../contrartStatus.enum";

export class CreateContractDto {
	discription: string;
	price: number;
	employer_id: number;
	worker_id: number;
	validity_period: Date
}
