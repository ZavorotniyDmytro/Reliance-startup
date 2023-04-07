import { Controller, Get, Post, Body, Patch, Param, Delete, Put, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from '../models/role.model';
import { RoleService } from './role.service';

@ApiTags('Role API')
@Controller('roles')
export class RolesController {
	constructor(private readonly roleService: RoleService) { }

	@ApiOperation({ summary: "Get all roles" })
	@ApiResponse({ status: 200, type: [Role] })
	@Get()
	getAll(): Promise<Role[]> {
		return this.roleService.getAll()
	}

	@ApiOperation({ summary: "Get role by id" })
	@ApiResponse({ status: 200, type: Role })
	@Get(':id')
	getById(@Param('id') id: number): Promise<Role> {
		return this.roleService.getById(id)
	}

	@ApiOperation({ summary: "Create role" })
	@ApiResponse({ status: 200, type: Role })
	@HttpCode(HttpStatus.OK)
	@Post()
	create(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
		return this.roleService.create(createRoleDto)
	}

	@ApiOperation({ summary: "Update role" })
	@ApiResponse({ status: 200, type: Role })
	@Put(':id')
	update(@Param('id') id: number, @Body() updateRoleDto: UpdateRoleDto) {
		return this.roleService.update(id, updateRoleDto)
	}

	@ApiOperation({ summary: "Create role" })
	@ApiResponse({ status: 200, type: Promise<void> })
	@Delete(':id')
	delete(@Param('id') id: number) {
		this.delete(id)
	}
}
