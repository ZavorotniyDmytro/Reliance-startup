import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Chat } from "src/models/chat.model";
import { Message } from "src/models/message.model";
import { UserChat } from "src/models/user-chat.model";
import { User } from "src/models/user.model";
import { ChatsController } from "./chats.controller";
import { ChatsService } from "./chats.service";

@Module({
	imports: [SequelizeModule.forFeature([Chat, Message, User, UserChat])],
	providers: [ChatsService],
	controllers: [ChatsController],
	exports: [ChatsService]
})

export class ChatsModule { }