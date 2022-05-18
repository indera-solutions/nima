import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { continents, countries, ICountry, states } from '@nima-cms/utils';
import { AddressService } from '../core/address/address.service';
import { AddressDto } from '../core/dto/address.dto';
import { CreateShippingMethodDto, UpdateShippingMethodDto } from './dto/shipping-method.dto';
import { CreateShippingZoneDto, ShippingZoneDto, UpdateShippingZoneDto } from './dto/shipping-zone.dto';
import { ShippingMethodEntity, ShippingMethodType } from './entities/shipping-method.entity';
import { ShippingZoneEntity, ShippingZoneLocationType } from './entities/shipping-zone.entity';
import { ShippingMethodRepository } from './repositories/shipping-method.repository';
import { ShippingZoneRepository } from './repositories/shipping-zone.repository';

@Injectable()
export class ShippingService {
	constructor(
		private methodRepository: ShippingMethodRepository,
		private zoneRepository: ShippingZoneRepository,
		private addressService: AddressService,
	) {
	}

	private static validateOptions(option: CreateShippingMethodDto): void {
		for ( const location of option.shippingZones ) {
			ShippingService.validateZone(location);
		}
		return;
	}

	private static validateZone(zone: CreateShippingZoneDto): void {
		if ( zone.locationType === ShippingZoneLocationType.POSTAL ) {
			//Maybe validate that the zip code is correct ?
		} else if ( zone.locationType === ShippingZoneLocationType.STATE ) {
			for ( const stateCode of zone.locationCodes ) {
				let flag = false;
				for ( const statesKey in states ) {
					if ( Object.keys(states[statesKey]).includes(stateCode) ) {
						flag = true;
					}
				}
				if ( !flag ) throw new BadRequestException('INVALID_STATE_CODE');
			}
		} else if ( zone.locationType === ShippingZoneLocationType.COUNTRY ) {
			for ( const countryCode of zone.locationCodes ) {
				if ( !Object.keys(countries).includes(countryCode) ) throw new BadRequestException('INVALID_COUNTRY_CODE');
			}
		} else if ( zone.locationType === ShippingZoneLocationType.CONTINENT ) {
			for ( const continentCode of zone.locationCodes ) {
				if ( !Object.keys(continents).includes(continentCode) ) throw new BadRequestException('INVALID_CONTINENT_CODE');
			}
		}
		return;
	}

	private static isAddressInZone(zone: ShippingZoneDto, address: Partial<AddressDto>): boolean {
		if ( zone.locationType === ShippingZoneLocationType.POSTAL ) {
			if ( !address.zip || address.zip === '' ) throw new Error('ADDRESS_REQUIRED');
			return zone.locationCodes.includes(address.zip);
		} else if ( zone.locationType === ShippingZoneLocationType.STATE ) {
			if ( !address.state || address.state === '' ) throw new Error('ADDRESS_REQUIRED');
			return zone.locationCodes.includes(address.state);
		} else if ( zone.locationType === ShippingZoneLocationType.COUNTRY ) {
			if ( !address.country || address.country === '' ) throw new Error('ADDRESS_REQUIRED');
			return zone.locationCodes.includes(address.country);
		} else if ( zone.locationType === ShippingZoneLocationType.CONTINENT ) {
			if ( !address.country || address.country === '' ) throw new Error('ADDRESS_REQUIRED');
			const country = countries[address.country] as ICountry;
			for ( const key of Object.keys(continents) ) {
				if ( continents[key].countries.includes(country.alpha2) ) {
					return zone.locationCodes.includes(continents[key].continentCode);
				}
			}
		}
		return false;
	}

	async calculateCost(params: { totalCost: number, shippingAddress: Partial<AddressDto> }): Promise<number> {
		const validZones = await this.getValidMethodsOfAddress(params.shippingAddress);
		for ( const zone of validZones ) {
			if ( zone.shippingType === ShippingMethodType.FREE_SHIPPING ) {
				if ( zone.threshold && zone.threshold <= params.totalCost ) {
					return 0;
				}
			} else if ( zone.shippingType === ShippingMethodType.FLAT_RATE ) {
				if ( !zone.rate ) {
					console.error('Flat Rate Shipping Type has no rate.');
					continue;
				}
				return zone.rate;
			}
		}
		throw new Error('SHIPPING_UNAVAILABLE_FOR_THAT_LOCATION');
	}

	async createMethod(params: { dto: CreateShippingMethodDto }): Promise<ShippingMethodEntity> {
		const { dto } = params;

		ShippingService.validateOptions(dto);

		const method = await this.methodRepository.save(dto);
		const zones = [];
		for ( const shippingZone of dto.shippingZones ) {
			const res = await this.zoneRepository.save({ ...shippingZone, shippingMethod: method });
			zones.push(res);
		}
		return this.getById({ id: method.id });
	}

	async getAll(): Promise<ShippingMethodEntity[]> {
		return this.methodRepository.getFullObjects();
	}

	async createZone(params: { methodId: number, dto: CreateShippingZoneDto }): Promise<ShippingZoneEntity> {
		const { methodId, dto } = params;
		ShippingService.validateZone(dto);
		const method = await this.getById({ id: methodId });
		return this.zoneRepository.save({ ...dto, shippingMethod: method });
	}

	async getOfAddress(params: { addressId: number }) {
		const { addressId } = params;

		const address = await this.addressService.findById({ id: addressId });

		return this.getValidMethodsOfAddress(address);
	}

	async updateMethod(params: { id: number, dto: UpdateShippingMethodDto }): Promise<ShippingMethodEntity> {
		const { id, dto } = params;
		await this.methodRepository.update(id, dto);
		return await this.methodRepository.getFullObject(id);
	}

	async updateZone(params: { id: number, dto: UpdateShippingZoneDto }): Promise<ShippingZoneEntity> {
		const { id, dto } = params;
		await this.zoneRepository.update(id, dto);
		return await this.zoneRepository.getFullObject(id);
	}

	async getValidMethodsOfAddress(address: Partial<AddressDto>, weight?: number, subTotal?: number): Promise<ShippingMethodEntity[]> {
		const options = await this.getAll();


		return options.filter(option => {
			const isInWeightLimits = option.minimumOrderWeight < weight && (option.maximumOrderWeight !== undefined ? option.maximumOrderWeight < weight : true);
			const weightFlag = weight !== undefined && !isInWeightLimits;
			const isAboveThreshold = (option.threshold !== undefined ? option.threshold <= subTotal : true);
			const totalFlag = subTotal !== undefined && !isAboveThreshold;
			if ( weightFlag && totalFlag ) return false;
			for ( const location of option.shippingZones ) {
				if ( ShippingService.isAddressInZone(location, address) ) return true;
			}
			return false;
		});
	}

	async deleteById(params: { id: number }): Promise<ShippingMethodEntity> {
		const { id } = params;
		const res = await this.getById({ id: id });
		await this.methodRepository.deleteById(id);
		return res;
	}

	async getById(params: { id: number }): Promise<ShippingMethodEntity> {
		const res = this.methodRepository.getFullObject(params.id);
		if ( !res ) throw new NotFoundException('SHIPPING_METHOD_NOT_FOUND');
		return res;
	}
}
