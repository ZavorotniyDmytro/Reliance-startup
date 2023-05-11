import { SequelizeModule } from '@lib/providers/sequelize/sequelize.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [SequelizeModule]
})
export class ProvidersModule {}
