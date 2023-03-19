import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './roles.model';
import { RoleService } from './roles.service';

@Controller('roles')
export class RolesController {
	constructor(private readonly roleService: RoleService) { }

	@Get()
	getAll(): Promise<Role[]> {
		return this.roleService.getAll()
	}

	@Get(':id')
	getById(@Param('id') id: number): Promise<Role> {
		return this.roleService.getById(id)
	}

	@Post()
	create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
		return this.roleService.create(createRoleDto)
	}

	@Put(':id')
	update(@Param('id') id: number, @Body() updateRoleDto: UpdateRoleDto) {
		return this.roleService.update(id, updateRoleDto)
	}

	@Delete(':id')
	delete(@Param('id') id: number) {
		this.delete(id)
	}
}
