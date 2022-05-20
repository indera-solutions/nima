import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { AddressDto, CreateAddressDto } from '../dto/address.dto';
import { AddressService } from './address.service';

@Controller('address')
@ApiTags('Address')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AddressController {
	constructor(private readonly addressService: AddressService) {
	}


	@Get(':id')
	@ApiOkResponse({ type: AddressDto })
	async getById(@Param('id') id: number): Promise<AddressDto> {
		return await this.addressService.findById({ id: id });
	}

	@Put(':id')
	@ApiParam({ type: Number, name: 'id' })
	@ApiBody({ type: CreateAddressDto })
	@ApiOkResponse({ type: AddressDto })
	async updateById(@Param('id') id: number, @Body() dto: CreateAddressDto): Promise<AddressDto> {
		return await this.addressService.updateById({ id, dto });
	}
}
