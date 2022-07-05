import { Trans, useAttributes, useTranslations } from '@nima-cms/react';
import Link from 'next/link';
import React from 'react';
import { AdminColumn, AdminPage, AdminSection, NimaTitle } from '../../components';
import { NIMA_ROUTES } from '../../lib/routes';
import { STRINGS } from '../../strings/strings';

interface AttributeListProps {

}

export default function AttributeList(props: AttributeListProps) {
	const { data: attributes } = useAttributes();
	const { getAdminTranslation } = useTranslations();


	return <>
		<NimaTitle title={ getAdminTranslation(STRINGS.ATTRIBUTES) }/>
		<AdminPage
			label={ getAdminTranslation(STRINGS.ATTRIBUTES) }
		>
			<AdminColumn>
				<AdminSection
					title={ getAdminTranslation(STRINGS.LIST) }
					subtitle={ (attributes?.length || 0) + ' ' + getAdminTranslation(STRINGS.ATTRIBUTES) }
					titleRightContainer={
						<Link href={ NIMA_ROUTES.attributes.add() }>
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
								<th><Trans caps>{ STRINGS.TYPE }</Trans></th>
								<th><Trans caps>{ STRINGS.PUBLIC }</Trans></th>
								<th><Trans caps>{ STRINGS.USED_IN_FILTERING }</Trans></th>
								<th><Trans caps>{ STRINGS.SLUG }</Trans></th>
								<th><Trans caps>{ STRINGS.ACTIONS }</Trans></th>
							</tr>
							</thead>
							<tbody>
							{ (attributes || []).map(attribute => <tr key={ attribute.id } className={ 'hover' }>
								<td><Trans>{ attribute.name }</Trans></td>
								<td><Trans>{ STRINGS[attribute.inputType] }</Trans></td>
								<td><Trans>{ attribute.filterableInStorefront ? STRINGS.YES : STRINGS.NO }</Trans></td>
								<td><Trans>{ attribute.filterableInStorefront ? STRINGS.YES : STRINGS.NO }</Trans></td>
								<td>{ attribute.slug }</td>
								<td>
									<Link href={ NIMA_ROUTES.attributes.edit(attribute.id) }>
										<button className={ 'btn btn-primary' }><Trans>{ STRINGS.EDIT }</Trans></button>
									</Link>
								</td>
							</tr>) }
							</tbody>
						</table>
					</div>
				</AdminSection>
			</AdminColumn>

		</AdminPage>
	</>;
}
