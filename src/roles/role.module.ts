import { Module } from '@nestjs/common';

import { RoleService } from './role.service';
import { RolesController } from './role.controller';

import { SequelizeModule } from '@nestjs/sequelize';

import { Role } from '../models/role.model';
import { User } from '../models/user.model';
import { UserRole } from '../models/user-role.model';

@Module({
	controllers: [RolesController],
	providers: [RoleService],
	imports: [SequelizeModule.forFeature([Role, User, UserRole])]
})
export class RolesModule { }
