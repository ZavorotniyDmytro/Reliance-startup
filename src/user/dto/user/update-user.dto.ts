//import { IsString, IsNotEmpty, IsNumber } from "class-validator";

import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateUserDto } from "./create-user.dto";

export class UpdateUserDto extends PartialType(CreateUserDto) {

}
