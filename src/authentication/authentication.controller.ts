import { Body, Controller, Get, HttpCode, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { User } from 'src/user/user.model';
import { AuthenticationService } from './authentication.service';
import { RegisterDto } from './dto/register.dto';
import JwtAuthenticationGuard from './jwt-authentication.guard';
import { LocalAuthenticationGuard } from './localAuthentication.guard';
import RequestWithUser from './requestWithUser.interface';

@ApiTags('Auth API')
@Controller('authentication')
export class AuthenticationController {
	constructor(
		private readonly authenticationService: AuthenticationService
	) { }

	@ApiOperation({ summary: "User register" })
	@ApiResponse({ status: 200, type: User })
	@HttpCode(200)
	@Post('register')
	async register(@Body() registrationData: RegisterDto) {
		return this.authenticationService.register(registrationData);
	}

	@ApiOperation({ summary: "User log-in" })
	@ApiResponse({ status: 200, type: Response })
	@UseGuards(LocalAuthenticationGuard)
	@HttpCode(200)
	@Post('log-in')
	async logIn(@Req() request: RequestWithUser, @Res() response: Response) {
		//console.log(request)
		const { user } = request;
		const cookie = this.authenticationService.getCookieWithJwtToken(user['_previousDataValues']);
		response.setHeader('Set-Cookie', cookie);
		user.password = undefined;
		return response.send(user);
	}

	@ApiOperation({ summary: "User log-out" })
	@ApiResponse({ status: 200, type: Response })
	@UseGuards(JwtAuthenticationGuard)
	@HttpCode(200)
	@Post('log-out')
	async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
		response.setHeader('Set-Cookie', this.authenticationService.getCookieForLogOut());
		return response.sendStatus(200);
	}
}