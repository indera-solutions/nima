import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAddressDto } from '../dto/address.dto';
import { AddressEntity } from '../entities/address.entity';

@Injectable()
export class AddressService {
	constructor(@InjectRepository(AddressEntity) private addressRepository: Repository<AddressEntity>) {
	}

	async create(params: { dto: CreateAddressDto }): Promise<AddressEntity> {
		return this.addressRepository.save(params.dto);
	}

	async findById(params: { id: number }): Promise<AddressEntity> {
		return this.addressRepository.findOneOrFail({
			where: {
				id: params.id,
			},
		});
	}
}
