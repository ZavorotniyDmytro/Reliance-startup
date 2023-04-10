export class CreateReviewDto {
	user_id:number
	reviewer_id: number // TODO must be transmitted through an authorized user
	contract_id:number
	rating:number
	text:string
}
