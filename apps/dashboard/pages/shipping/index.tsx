import { Trans, useShippingMethods } from '@nima-cms/react';
import { toTitleCase } from '@nima-cms/utils';
import Link from 'next/link';
import React from 'react';
import { AdminColumn, AdminPage, AdminSection, NimaTitle } from '../../components';
import { NIMA_ROUTES } from '../../lib/routes';

interface SettingsProps {

}

export default function SettingsPage(props: SettingsProps) {

	const { data: methods } = useShippingMethods();

	return (
		<>
			<NimaTitle title={ 'Shipping Methods' }/>
			<AdminPage label={ 'Shipping Methods' }>
				<AdminColumn>
					<AdminSection
						title={ 'List' }
						subtitle={ (methods?.length || 0) + ' methods' }
						titleRightContainer={
							<Link href={ NIMA_ROUTES.shipping.add() }>
								<a
									className={ 'btn btn-primary' }>Add new</a>
							</Link>
						}
					>
						<div className="overflow-x-auto">
							<table className="table w-full">
								<thead>
								<tr>
									<th>Name</th>
									<th>Shipping Type</th>
									<th>Threshold</th>
									<th>Rate</th>
									<th>Zones</th>
									<th>Actions</th>
								</tr>
								</thead>
								<tbody>
								{ (methods || []).map(attribute => <tr key={ attribute.id } className={ 'hover' }>
									<td><Trans useEditingLanguage>{ attribute.name }</Trans></td>
									<td>{ toTitleCase(attribute.shippingType) }</td>
									<td>{ attribute.threshold }</td>
									<td>{ attribute.rate }</td>
									<td>{ attribute.shippingZones.length }</td>
									<td>
										<Link href={ NIMA_ROUTES.shipping.edit(attribute.id) }>
											<button className={ 'btn btn-primary' }>Edit</button>
										</Link>
									</td>
								</tr>) }
								</tbody>
							</table>
						</div>
					</AdminSection>

				</AdminColumn>

			</AdminPage>
		</>
	);
}
