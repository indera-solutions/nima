import { Trans, useTranslations } from '@nima-cms/react';
import { ShippingMethodType, ShippingZoneDto, ShippingZoneLocationType } from '@nima-cms/sdk';
import {
	getContinentByCode,
	getCountryByCode,
	getCountryName,
	getEuroValue,
	getStateByCode,
	toTitleCase,
} from '@nima-cms/utils';
import React, { useEffect, useState } from 'react';
import { STRINGS } from '../../strings/strings';
import { AdminSection } from '../AdminLayout';
import { NewShippingZoneModal } from './newShippingZoneModal';
import { ShippingRatesModal } from './ShippingRatesModal';

interface ZoneTableProps {
	methodId: number;
	shippingZones: ShippingZoneDto[];
}


export function ZoneTable(props: ZoneTableProps) {
	const { getAdminTranslation } = useTranslations();
	const [editingZone, setEditingZone] = useState<ShippingZoneDto | undefined>();
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [isRateModalOpen, setRateIsModalOpen] = useState<boolean>(false);

	useEffect(() => {
		if ( !editingZone ) return;
		setEditingZone(state => props.shippingZones.find(zone => zone.id === state.id));
	}, [props.shippingZones]);

	function getCodeName(codes: string[], type: ShippingZoneLocationType): string {
		let res: string[] = codes;
		if ( type === ShippingZoneLocationType.COUNTRY ) {
			res = codes.map(code => getCountryName(getCountryByCode(code)));
		} else if ( type === ShippingZoneLocationType.CONTINENT ) {
			res = codes.map(code => getContinentByCode(code)?.name || '');
		} else if ( type === ShippingZoneLocationType.STATE ) {
			res = codes.map(code => getStateByCode(code)?.name || '');
		}
		return res.join((', '));
	}

	return (
		<>
			<AdminSection title={ getAdminTranslation(STRINGS.ZONES) }
						  titleRightContainer={ <button
							  className={ 'btn btn-primary' }
							  onClick={ (() => {
								  setIsModalOpen(true);
							  }) }>
							  <Trans>{ STRINGS.NEW_ZONE }</Trans>
						  </button> }
			>

				<div className="overflow-x-auto">
					<table className="table w-full">
						<thead>
						<tr>
							<th><Trans caps>{ STRINGS.NAME }</Trans></th>
							<th><Trans caps>{ STRINGS.TYPE }</Trans></th>
							<th><Trans caps>{ STRINGS.LOCATION_CODES }</Trans></th>
							<th><Trans caps>{ STRINGS.RATES }</Trans></th>
							<th><Trans caps>{ STRINGS.ACTIONS }</Trans></th>
						</tr>
						</thead>
						<tbody>
						{ (props.shippingZones || []).map((zone) => <tr key={ zone.id } className={ 'hover' }>
							<td><Trans useEditingLanguage>{ zone.name }</Trans></td>
							<td>{ toTitleCase(zone.locationType) }</td>
							<td>{ getCodeName(zone.locationCodes, zone.locationType) }</td>
							<td>
								<table className="table w-full">
									<thead>
									<th><Trans caps>{ STRINGS.TYPE }</Trans></th>
									<th><Trans caps>{ STRINGS.MIN }</Trans></th>
									<th><Trans caps>{ STRINGS.MAX }</Trans></th>
									<th><Trans caps>{ STRINGS.RATES }</Trans></th>
									</thead>
									<tbody>
									{ zone.shippingRates.map(rate => <tr key={ rate.id }>

										{ rate.shippingType !== ShippingMethodType.BY_WEIGHT &&
											<>
												<td>{ toTitleCase(rate.shippingType) }</td>
												<td>{ getEuroValue(rate.minimumPrice) || '-∞' }</td>
												<td>{ getEuroValue(rate.maximumPrice) || '∞' }</td>
												<td>{ getEuroValue(rate.rate) }</td>
												</>
											}
											{ rate.shippingType === ShippingMethodType.BY_WEIGHT &&
												<>
													<td>{ toTitleCase(rate.shippingType) }</td>
													<td>{ (rate.minimumOrderWeight + 'kg') || '-∞' }</td>
													<td>{ (rate.maximumOrderWeight + 'kg') || '∞' }</td>
													<td>{ getEuroValue(rate.rate) }</td>
												</>
											}
										</tr>,
									) }
									</tbody>
								</table>
							</td>
							<td>
								<div className="flex gap-4">
									<button
										className={ 'btn btn-primary' }
										onClick={ (() => {
											setEditingZone(zone);
											setIsModalOpen(true);
										}) }>
										<Trans>{ STRINGS.EDIT }</Trans>
									</button>
									<button
										className={ 'btn btn-primary' }
										onClick={ (() => {
											setEditingZone(zone);
											setRateIsModalOpen(true);
										}) }>
										<Trans>{ STRINGS.EDIT_RATES }</Trans>
									</button>
								</div>
							</td>
						</tr>) }
						</tbody>
					</table>
				</div>

				{ isModalOpen && <NewShippingZoneModal
					methodId={ props.methodId }
					init={ editingZone }
					onClose={ () => {
						setIsModalOpen(false);
						setEditingZone(undefined);
					} }/> }

				{ isRateModalOpen && editingZone && <ShippingRatesModal
					methodId={ props.methodId }
					init={ editingZone }
					onClose={ () => {
						setRateIsModalOpen(false);
						setEditingZone(undefined);
					} }/> }
			</AdminSection>

		</>);
}


