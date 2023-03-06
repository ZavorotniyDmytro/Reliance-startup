import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthenticationService {
	constructor(private readonly userService: UserService) { }

	public async register(registrationData: RegisterDto) {
		const hashedPassword = await bcrypt.hash(registrationData.password, 10);
		try {
			const createdUser = await this.userService.create({
				...registrationData,
				password: hashedPassword
			});
			createdUser.password = undefined;
			return createdUser;
		} catch (error) {
			if (error?.code === '23505') {
				throw new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST);
			}
			throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}