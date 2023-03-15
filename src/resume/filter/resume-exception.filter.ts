import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ResumeException } from '../exception/resume.exception';

@Catch(ResumeException)
export class ResumeExceptionFilter implements ExceptionFilter {
	catch(exception: ResumeException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();

		response.status(500).json({
			timestamp: new Date().toISOString(),
			msg: exception.what()
		});
	}
}
