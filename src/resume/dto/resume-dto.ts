import { ApiProperty } from "@nestjs/swagger";

export class ResumeDto {
    @ApiProperty({ example: 1, description: "ResumeID" })
    resume_id: number;

    @ApiProperty({ example: 1, description: "UserID" })
    user_id: number;

    @ApiProperty({ example: "Ivan Vanilla", description: "Nickname of the user" })
    name: string;

    @ApiProperty({ example: "ivanvanilla@example.com", description: "The email of the user" })
    email: string;

    @ApiProperty({ example: "+380999999999", description: "The phone number of the user" })
    phone: string;

    @ApiProperty({ example: "1 year of programming in Nodejs.", description: "Experiance of the user" })
    experience: string;
  }