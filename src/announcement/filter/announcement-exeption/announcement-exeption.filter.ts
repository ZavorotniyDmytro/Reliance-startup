import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { AnnouncementExeption } from 'src/announcement/exeption/announcement.exeption/announcement.exeption';

@Catch(AnnouncementExeption)
export class AnnouncementExeptionFilter implements ExceptionFilter {
  catch(exception: AnnouncementExeption, host: ArgumentsHost) {
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
