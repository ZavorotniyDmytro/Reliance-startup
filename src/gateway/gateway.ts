
import { OnModuleInit, ValidationPipe } from "@nestjs/common";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";
import { CreateUserDto } from "src/user/dto/user/create-user.dto";
import { UserService } from "src/user/user.service";

export class UserID{
	id: number
}

@WebSocketGateway()
export class MyGateway implements OnModuleInit{

	constructor(private readonly userService: UserService){}

	@WebSocketServer()
	server: Server

	onModuleInit() {
		this.server.on('connection', (socket) => 
			console.log(`Connected \'${socket.id}\'	 id`)
		)
	}

	@SubscribeMessage("create_user")
	async createUser(@MessageBody(new ValidationPipe({expectedType: CreateUserDto})) body: CreateUserDto){
		const user = await this.userService.create(body)
		this.server.emit('created', {
			msg: "User created successfully",
			content: user,
		})
	}

	@SubscribeMessage("delete_user")
	deleteUser(@MessageBody() body: string){
		this.userService.delete(+body)
		this.server.emit('deleted', {	
			msg: "User deleted successfully"
		})
	}
}