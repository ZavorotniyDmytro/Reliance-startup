import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from '../../libs/models/src/role.model';

@Injectable()
export class RoleService {
	constructor(@InjectModel(Role) private roleRepository: typeof Role) { }

	async create(createRoleDto: CreateRoleDto): Promise<Role> {
		return this.roleRepository.create(createRoleDto)
	}

	async getAll(): Promise<Role[]> {
		return await this.roleRepository.findAll();
	}

	async getById(id: number): Promise<Role> {
		const role = await this.roleRepository.findOne({ where: { id: id } })
		if (role) {
			return role;
		}
		throw new HttpException("Role not found", HttpStatus.NOT_FOUND)
	}

	async getByName(name: string): Promise<Role> {
		const role = await this.roleRepository.findOne({ where: { name: name } })
		if (role) {
			return role;
		}
		throw new HttpException("Role not found", HttpStatus.NOT_FOUND)
	}

	async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
		const role = await this.getById(id);
		return await role.update(updateRoleDto);
	}

	async remove(id: number): Promise<void> {
		const role = await this.getById(id);
		await role.destroy();
	}
}
