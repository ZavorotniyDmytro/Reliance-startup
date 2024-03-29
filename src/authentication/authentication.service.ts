import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/register.dto';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt/dist';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './tokenPayload.interface';
import { User } from '@lib/models/user.model';

@Injectable()
export class AuthenticationService {
	constructor(private readonly userService: UserService,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService) { }


	public async register(registrationData: RegisterDto): Promise<User> {
		const hashedPassword = await bcrypt.hash(registrationData.password, 10);
		try {
			const createdUser = await this.userService.create({
				...registrationData,
				password: hashedPassword,
				phone: '',
				avatar_url: ''
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

	public async getAuthenticatedUser(email: string, hashedPassword: string): Promise<User> {
		try {
			const user = await this.userService.getByEmail(email);
			const isPasswordMatching = await bcrypt.compare(hashedPassword, user.password)
			if (!isPasswordMatching) {
				throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST)
			}
			user.password = undefined;
			return user
		} catch (error) {
			throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
		}
	}

	public getCookieWithJwtToken(userId: number): string {
		const payload: TokenPayload = { userId };
		const token = this.jwtService.sign(payload);
		return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`;
	}



	public getCookieForLogOut(): string {
		return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
	}

}
