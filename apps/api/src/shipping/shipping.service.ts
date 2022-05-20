import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { continents, countries, ICountry, states } from '@nima-cms/utils';
import { AddressService } from '../core/address/address.service';
import { AddressDto } from '../core/dto/address.dto';
import { CreateShippingMethodDto, UpdateShippingMethodDto } from './dto/shipping-method.dto';
import { CreateShippingRateDto, UpdateShippingRateDto } from './dto/shipping-rate.dto';
import { CreateShippingZoneDto, ShippingZoneDto, UpdateShippingZoneDto } from './dto/shipping-zone.dto';
import { ShippingMethodEntity } from './entities/shipping-method.entity';
import { ShippingRateEntity } from './entities/shipping-rate.entity';
import { ShippingZoneEntity, ShippingZoneLocationType } from './entities/shipping-zone.entity';
import { ShippingMethodRepository } from './repositories/shipping-method.repository';
import { ShippingRateRepository } from './repositories/shipping-rate.repository';
import { ShippingZoneRepository } from './repositories/shipping-zone.repository';

@Injectable()
export class ShippingService {
	constructor(
		private methodRepository: ShippingMethodRepository,
		private zoneRepository: ShippingZoneRepository,
		private rateRepository: ShippingRateRepository,
		private addressService: AddressService,
	) {
	}

	static shippingZoneLocationTypePredicate(a: ShippingZoneDto, b: ShippingZoneDto): number {
		const map = {};
		map[ShippingZoneLocationType.POSTAL] = 1;
		map[ShippingZoneLocationType.STATE] = 2;
		map[ShippingZoneLocationType.COUNTRY] = 3;
		map[ShippingZoneLocationType.CONTINENT] = 3;

		if ( map[a.locationType] < map[b.locationType] ) {
			return -1;
		}

		if ( map[a.locationType] > map[b.locationType] ) {
			return 1;
		}

		return 0;
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
			if ( !address.zip || address.zip === '' ) return false;
			return zone.locationCodes.includes(address.zip); //TODO ADD ZIP RANGES
		} else if ( zone.locationType === ShippingZoneLocationType.STATE ) {
			if ( !address.state || address.state === '' ) return false;
			return zone.locationCodes.includes(address.state);
		} else if ( zone.locationType === ShippingZoneLocationType.COUNTRY ) {
			if ( !address.country || address.country === '' ) return false;
			return zone.locationCodes.includes(address.country);
		} else if ( zone.locationType === ShippingZoneLocationType.CONTINENT ) {
			if ( !address.country || address.country === '' ) return false;
			const country = countries[address.country] as ICountry;
			for ( const key of Object.keys(continents) ) {
				if ( continents[key].countries.includes(country.alpha2) ) {
					return zone.locationCodes.includes(continents[key].continentCode);
				}
			}
		}
		return false;
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
		const { shippingZones, ...rest } = dto;
		await this.methodRepository.update(id, rest);
		return await this.methodRepository.getFullObject(id);
	}

	async updateZone(params: { id: number, dto: UpdateShippingZoneDto }): Promise<ShippingZoneEntity> {
		const { id, dto } = params;
		await this.zoneRepository.update(id, dto);
		return await this.zoneRepository.getFullObject(id);
	}

	async getValidMethodsOfAddress(address: Partial<AddressDto>, weight?: number, subTotal?: number): Promise<ShippingMethodEntity[]> {
		const options = await this.getAll();
		const availableMethods = options.filter(option => {
			const zones: ShippingZoneEntity[] = [];
			for ( const location of option.shippingZones ) {
				if ( ShippingService.isAddressInZone(location, address) ) {
					zones.push(location);
				}
			}
			if ( zones.length === 0 ) return false;
			const sortedZones = zones.sort(ShippingService.shippingZoneLocationTypePredicate);
			const zone = sortedZones[0];
			const rates: ShippingRateEntity[] = [];
			for ( const rate of zone.shippingRates ) {
				const minPrice = rate.minimumPrice || Number.MIN_SAFE_INTEGER;
				const maxPrice = rate.maximumPrice || Number.MAX_SAFE_INTEGER;
				const tempSubTotal = subTotal || 0;

				const inPriceRange = tempSubTotal >= minPrice && tempSubTotal <= maxPrice;

				const minWeight = rate.minimumOrderWeight || Number.MIN_SAFE_INTEGER;
				const maxWeight = rate.maximumOrderWeight || Number.MAX_SAFE_INTEGER;
				const tempWeight = weight || 0;
				const inWeightRange = tempWeight >= minWeight && tempWeight <= maxWeight;
				if ( inPriceRange && inWeightRange ) {
					rates.push(rate);
				}
			}
			if ( rates.length === 0 ) return false;
			const lowestRate = rates.sort((a, b) => a.rate - b.rate)[0];
			zone.shippingRates = [lowestRate];
			return true;
		});

		return availableMethods;
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

	async getZoneById(params: { id: number }): Promise<ShippingZoneEntity> {
		const zone = await this.zoneRepository.findOne(params.id);
		if ( !zone ) throw new NotFoundException('SHIPPING_ZONE_NOT_FOUND');
		return zone;
	}

	async createRate(params: { methodId: number, zoneId: number, dto: CreateShippingRateDto }): Promise<ShippingRateEntity> {
		const { zoneId, dto } = params;
		const zone = await this.getZoneById({ id: zoneId });
		return await this.rateRepository.save({
			...dto,
			shippingZone: zone,
		});
	}

	async getRateById(params: { id: number }): Promise<ShippingRateEntity> {
		const rate = await this.rateRepository.findOne(params.id);
		if ( !rate ) throw new NotFoundException('SHIPPING_RATE_NOT_FOUND');
		return rate;
	}

	async updateRate(params: { methodId: number, zoneId: number, id: number, dto: UpdateShippingRateDto, }): Promise<ShippingRateEntity> {
		const { id, dto } = params;
		await this.rateRepository.update(id, dto);
		return await this.getRateById({ id });
	}

	async deleteRate(params: { methodId: number, zoneId: number, id: number }): Promise<ShippingRateEntity> {
		const { id } = params;
		const res = await this.getRateById({ id });
		await this.rateRepository.delete(id);
		return res;
	}

}
