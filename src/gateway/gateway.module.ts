import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { MyGateway } from './gateway';

@Module({
	imports:[UserModule],
	providers: [MyGateway],
})
export class GatewayModule {}
