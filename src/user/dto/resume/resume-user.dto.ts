//import { IsString, IsNotEmpty, IsNumber } from "class-validator";

import { PartialType } from "@nestjs/swagger";
import { CreateUserDto } from "../user/create-user.dto";

export class ResumeUserDto extends PartialType(CreateUserDto) {

}
