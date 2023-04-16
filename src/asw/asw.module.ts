import { Module } from '@nestjs/common';
import { AswService } from './asw.service';
import { AswController } from './asw.controller';

@Module({
  controllers: [AswController],
  providers: [AswService]
})
export class AswModule {}
