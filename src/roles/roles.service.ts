import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './roles.model';

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
		const user = await this.roleRepository.findOne({ where: { id: id } })
		if (user) {
			return user;
		}
		throw new HttpException("Role not found", HttpStatus.NOT_FOUND)
	}

	async findByValue(value: string): Promise<Role> {
		const user = await this.roleRepository.findOne({ where: { value: value } })
		if (user) {
			return user;
		}
		throw new HttpException("Role not found", HttpStatus.NOT_FOUND)
	}

	async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
		const user = await this.getById(id);
		return await user.update(updateRoleDto);
	}

	async remove(id: number): Promise<void> {
		const user = await this.getById(id);
		await user.destroy();
	}
}
