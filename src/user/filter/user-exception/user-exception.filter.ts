import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { UserException } from 'src/user/exception/user.exception/user.exception';

@Catch(UserException)
export class UserExceptionFilter implements ExceptionFilter {
	catch(exception: UserException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();

		response.status(500).json({
			timestamp: new Date().toISOString(),
			msg: exception.what()
		});
	}
}
