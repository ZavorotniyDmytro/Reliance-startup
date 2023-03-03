import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ChatsException } from '../exception/chats.exception';

@Catch(ChatsException)
export class ChatsExceptionFilter implements ExceptionFilter {
  catch(exception: ChatsException, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response
      .status(500)
      .json({
        timestamp: new Date().toISOString(),
        msg: exception.what()
      });
  }
}
