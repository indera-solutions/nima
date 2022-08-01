import { Trans, useProductTypes, useTranslations } from '@nima-cms/react';
import Link from 'next/link';
import React from 'react';
import { AdminColumn, AdminPage, AdminSection, NimaTitle } from '../../components';
import { NIMA_ROUTES } from '../../lib/routes';
import { STRINGS } from '../../strings/strings';

interface ProductTypesListProps {

}

export default function ProductTypesList(props: ProductTypesListProps) {
	const { data: productTypes } = useProductTypes();
	const { getAdminTranslation } = useTranslations();


	return (
		<React.Fragment>
		<NimaTitle title={ getAdminTranslation(STRINGS.PRODUCT_TYPES) }/>
		<AdminPage
			label={ getAdminTranslation(STRINGS.PRODUCT_TYPES) }
		>
			<AdminColumn>
				<AdminSection
					title={ getAdminTranslation(STRINGS.LIST) }
					subtitle={ [productTypes?.length || 0, getAdminTranslation(STRINGS.PRODUCT_TYPES)].join(' ') }
					titleRightContainer={
						<Link href={ NIMA_ROUTES.productTypes.add() }>
							<a className={ 'btn btn-primary' }><Trans>{STRINGS.ADD_NEW}</Trans></a>
						</Link>
					}
				>
					<div className="overflow-x-auto">
						<table className="table w-full">
							<thead>
							<tr>
								<th><Trans caps>{ STRINGS.NAME }</Trans></th>
								<th><Trans caps>{ STRINGS.SLUG }</Trans></th>
								<th><Trans caps>{ STRINGS.VARIANTS }</Trans></th>
								<th><Trans caps>{ STRINGS.ACTIONS }</Trans></th>
							</tr>
							</thead>
							<tbody>
							{ (productTypes || [])
								.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
								.map(attribute => <tr key={ attribute.id } className={ 'hover' }>
									<td>{ attribute.name }</td>
									<td>{ attribute.slug }</td>
									<td>{ attribute.hasVariants ? getAdminTranslation(STRINGS.YES) : getAdminTranslation(STRINGS.NO) }</td>
									<td>
										<Link href={ NIMA_ROUTES.productTypes.edit(attribute.id) }>
											<a className={ 'btn btn-primary' }><Trans>{ STRINGS.EDIT }</Trans></a>
										</Link>
									</td>
								</tr>) }
							</tbody>
						</table>
					</div>
				</AdminSection>
			</AdminColumn>

			</AdminPage>
		</React.Fragment>
	);
}
