import { Trans } from '@nima-cms/react';
import { ShippingZoneDto } from '@nima-cms/sdk';
import { toTitleCase } from '@nima-cms/utils';
import React, { useState } from 'react';
import { AdminSection } from '../AdminLayout';
import { NewShippingZoneModal } from './newShippingZoneModal';

interface ZoneTableProps {
	methodId: number;
	shippingZones: ShippingZoneDto[];
}


export function ZoneTable(props: ZoneTableProps) {

	const [editingZone, setEditingZone] = useState<ShippingZoneDto | undefined>();
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	return (
		<>
			<AdminSection title={ 'Shipping Zones' }
						  titleRightContainer={ <button
							  className={ 'btn btn-primary' }
							  onClick={ (() => {
								  setIsModalOpen(true);
							  }) }>New Zone
						  </button> }
			>

				<div className="overflow-x-auto">
					<table className="table w-full">
						<thead>
						<tr>
							<th>Name</th>
							<th>description</th>
							<th>Type</th>
							<th>Location Codes</th>
							<th>Actions</th>
						</tr>
						</thead>
						<tbody>
						{ (props.shippingZones || []).map((zone) => <tr key={ zone.id } className={ 'hover' }>
							<td><Trans useEditingLanguage>{ zone.name }</Trans></td>
							<td><Trans useEditingLanguage>{ zone.description }</Trans></td>
							<td>{ toTitleCase(zone.locationType) }</td>
							<td>{ zone.locationCodes.join(', ') }</td>
							<td>
								<button
									className={ 'btn btn-primary' }
									onClick={ (() => {
										setEditingZone(zone);
										setIsModalOpen(true);
									}) }>Edit
								</button>
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
			</AdminSection>

		</>);
}


