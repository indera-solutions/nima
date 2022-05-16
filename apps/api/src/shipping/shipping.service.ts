import { Injectable } from '@nestjs/common';
import { continents, countries, ICountry } from '@nima-cms/utils';
import { AddressDto } from '../core/dto/address.dto';
import { ShippingMethodEntity, ShippingMethodType } from './entities/shipping-method.entity';
import { ShippingZoneEntity, ShippingZoneLocationType } from './entities/shipping-zone.entity';
import { ShippingMethodRepository } from './repositories/shipping-method.repository';

@Injectable()
export class ShippingService {
	constructor(
		private methodRepository: ShippingMethodRepository,
	) {
	}

	private static isAddressInZone(zone: ShippingZoneEntity, address: Partial<AddressDto>): boolean {
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

		const validZones = await this.getValidZonesOfAddress(params.shippingAddress);
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

	private async getValidZonesOfAddress(address: Partial<AddressDto>): Promise<ShippingMethodEntity[]> {
		const options = await this.methodRepository.find();
		return options.filter(option => {
			for ( const location of option.shippingZones ) {
				if ( ShippingService.isAddressInZone(location, address) ) return true;
			}
			return false;
		});
	}

}
