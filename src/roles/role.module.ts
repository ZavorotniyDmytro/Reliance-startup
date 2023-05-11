import { Module } from '@nestjs/common';

import { RoleService } from './role.service';
import { RolesController } from './role.controller';

import { SequelizeModule } from '@nestjs/sequelize';

import { Role } from '../../libs/models/src/role.model';
import { User } from '../../libs/models/src/user.model';
import { UserRole } from '../../libs/models/src/user-role.model';

@Module({
	controllers: [RolesController],
	providers: [RoleService],
	imports: [SequelizeModule.forFeature([Role, User, UserRole])],
	exports: [
		RoleService
	]
})
export class RolesModule { }
