import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport/dist';
import { LocalStrategy } from './local.strategy';
import { AuthenticationController } from './authentication.controller';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
	imports: [
		UserModule,
		PassportModule,
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get('JWT_SECRET'),
				signOptions: {
					expiresIn: "84600s",
				},
			}),
		}),
	],
	providers: [AuthenticationService, LocalStrategy, JwtStrategy],
	controllers: [AuthenticationController]
})
export class AuthenticationModule { }
