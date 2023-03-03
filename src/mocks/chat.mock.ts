import { CreateChatDto } from "src/chats/dto/chats-dto";

export class ChatMocks {
	static chats: CreateChatDto[] = [
		{
			chat_id: "1",
			users_id: ["2", "1"],
			messages: ["dasf", "dhdsfhsdf", "dgdfgsdad"]
		},
		{
			chat_id: "2",
			users_id: ["1", "3"],
			messages: ["dsssdag", "dsgagsd", "dsgadgsdgadsga"]
		},
		{
			chat_id: "3",
			users_id: ["2", "3"],
			messages: ["vbnvbncv", "dfg", "qwrqwer"]
		},
		{
			chat_id: "4",
			users_id: ["1", "4"],
			messages: ["fsadgd", "sgasdgasdg", "sadgsdgsdg"]
		},
	]


}