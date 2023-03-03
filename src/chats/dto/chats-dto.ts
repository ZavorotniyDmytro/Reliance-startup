export class CreateChatDto {
	public chat_id: string
	public users_id: string[]
	public messages: string[]
}

export class UpdateChatDto {
	public chat_id: string
	public users_id: string[]
	public messages: string[]
}