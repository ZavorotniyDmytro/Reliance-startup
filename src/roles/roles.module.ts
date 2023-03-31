import { Module } from '@nestjs/common';

import { RoleService } from './roles.service';
import { RolesController } from './roles.controller';

import { SequelizeModule } from '@nestjs/sequelize';

import { Role } from '../models/roles.model';

@Module({
	controllers: [RolesController],
	providers: [RoleService],
	imports: [SequelizeModule.forFeature([Role])]
})
export class RolesModule { }
