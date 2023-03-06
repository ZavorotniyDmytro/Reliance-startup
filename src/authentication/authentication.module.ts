import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport/dist';
import { LocalStrategy } from './local.strategy';
import { AuthenticationController } from './authentication.controller';

@Module({
	imports: [UserModule, PassportModule],
	providers: [AuthenticationService, LocalStrategy],
	controllers: [AuthenticationController]
})
export class AuthenticationModule { }
