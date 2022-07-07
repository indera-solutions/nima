import { Trans, useShippingMethods, useTranslations } from '@nima-cms/react';
import Link from 'next/link';
import React from 'react';
import { AdminColumn, AdminPage, AdminSection, NimaTitle } from '../../components';
import { NIMA_ROUTES } from '../../lib/routes';
import { STRINGS } from '../../strings/strings';

interface ShippingPageProps {

}

export default function ShippingPage(props: ShippingPageProps) {
	const { getAdminTranslation } = useTranslations();

	const { data: methods } = useShippingMethods();

	return (
		<>
			<NimaTitle title={ getAdminTranslation(STRINGS.SHIPPING) }/>
			<AdminPage label={ getAdminTranslation(STRINGS.SHIPPING) }>
				<AdminColumn>
					<AdminSection
						title={ getAdminTranslation(STRINGS.LIST) }
						subtitle={ (methods?.length || 0) + ' ' + getAdminTranslation(STRINGS.METHODS).toLowerCase() }
						titleRightContainer={
							<Link href={ NIMA_ROUTES.shipping.add() }>
								<a
									className={ 'btn btn-primary' }><Trans>{ STRINGS.ADD_NEW }</Trans></a>
							</Link>
						}
					>
						<div className="overflow-x-auto">
							<table className="table w-full">
								<thead>
								<tr>
									<th><Trans caps>{ STRINGS.NAME }</Trans></th>
									<th><Trans caps>{ STRINGS.ZONES }</Trans></th>
									<th><Trans caps>{ STRINGS.ACTIONS }</Trans></th>
								</tr>
								</thead>
								<tbody>
								{ (methods || []).map(attribute => <tr key={ attribute.id } className={ 'hover' }>
									<td><Trans useEditingLanguage>{ attribute.name }</Trans></td>
									<td>{ attribute.shippingZones.length }</td>
									<td>
										<Link href={ NIMA_ROUTES.shipping.edit(attribute.id) }>
											<button className={ 'btn btn-primary' }><Trans>{ STRINGS.EDIT }</Trans>
											</button>
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
