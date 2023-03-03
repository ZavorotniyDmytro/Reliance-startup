import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { CreateChatDto} from './dto/chats-dto';
import { UpdateChatDto} from './dto/chats-dto';

@Controller('chats')
export class ChatsController {

    constructor(private readonly chatsService: ChatsService) {}

    @Get()
    getAllChats() {
        return this.chatsService.getAllChats();
    }

    @Get(':id') 
    getChat(@Param('id') id: string) {
        return this.chatsService.getChatById(id);
    }

    @Post()
    createChat(@Body() chatDto: CreateChatDto) {
        return this.chatsService.createChat(chatDto);
    }
    
    @Delete(':id')
    removeChat(@Param('id') id: string) {
        this.chatsService.removeChatById(id);
    }

    @Put(':id')
    updateChat(@Body() updateChatDto: UpdateChatDto, @Param('id') id: string) {
        this.chatsService.updateChat(updateChatDto ,id);
    }
}
