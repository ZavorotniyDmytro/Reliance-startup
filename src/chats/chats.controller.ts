import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChatsService } from './chats.service';
import { CreateChatDto} from './dto/chats-dto';
import { UpdateChatDto} from './dto/chats-dto';

@Controller('chats')
export class ChatsController {

    constructor(private readonly chatsService: ChatsService) {}

    @ApiTags("Chat API")
	@ApiOperation({ summary: "Get all chats" })
	@ApiResponse({ status: 200, type: CreateChatDto })
    @Get()
    getAllChats() {
        return this.chatsService.getAllChats();
    }

    @ApiTags("Chat API")
	@ApiOperation({ summary: "Get chat by Id" })
	@ApiResponse({ status: 200, type: CreateChatDto })
    @Get(':id')
    getChat(@Param('id') id: string) {
        return this.chatsService.getChatById(id);
    }

    @ApiTags("Chat API")
	@ApiOperation({ summary: "Create chat" })
	@ApiResponse({ status: 200, type: CreateChatDto })
    @Post()
    createChat(@Body() chatDto: CreateChatDto) {
        return this.chatsService.createChat(chatDto);
    }

    @ApiTags("Chat API")
	@ApiOperation({ summary: "Delete chat by Id" })
	@ApiResponse({ status: 200, type: CreateChatDto })
    @Delete(':id')
    removeChat(@Param('id') id: string) {
        this.chatsService.removeChatById(id);
    }

    @ApiTags("Chat API")
	@ApiOperation({ summary: "Update chat by Id" })
	@ApiResponse({ status: 200, type: CreateChatDto })
    @Put(':id')
    updateChat(@Body() updateChatDto: UpdateChatDto, @Param('id') id: string) {
        this.chatsService.updateChat(updateChatDto ,id);
    }

    @ApiTags("Chat API")
    @ApiOperation({ summary: "Handle chat webhook" })
    @Post('webhook')
    handleWebhook(@Body() webhookData: any) {
    // Обробка отриманого вебхуку
    // Тут ви можете виконати необхідні дії залежно від отриманих даних вебхуку
}

}
