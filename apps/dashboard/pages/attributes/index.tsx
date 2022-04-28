import { AttributeDto } from '@nima/sdk';
import Link from 'next/link';
import React from 'react';
import { AdminColumn, AdminPage, AdminSection, NimaTitle } from '../../components';
import { NIMA_ROUTES } from '../../lib/routes';

interface AttributeListProps {

}

export default function AttributeList(props: AttributeListProps) {
	const attributes: AttributeDto[] = [];

	return <>
		<NimaTitle title={ 'Attributes' }/>
		<AdminPage
			label={ 'Attributes' }
		>
			<AdminColumn>
				<AdminSection
					title={ 'List' }
					subtitle={ (attributes?.length || 0) + ' attributes' }
					titleRightContainer={
						<Link href={ NIMA_ROUTES.attributes.add() }>
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
								<th>Type</th>
								<th>Public</th>
								<th>Used in Filtering</th>
								<th>Slug</th>
								<th>Actions</th>
							</tr>
							</thead>
							<tbody>
							{ attributes.map(attribute => <tr key={ attribute.id }>
								<td>{ attribute.name['en'] }</td>
								<td>{ attribute.inputType }</td>
								<td>{ attribute.filterableInStorefront }</td>
								<td>{ attribute.filterableInStorefront }</td>
								<td>{ attribute.slug }</td>
								<td>
									<button className={ 'btn btn-primary' }>Edit</button>
								</td>
							</tr>) }
							</tbody>
						</table>
					</div>
					{/*{ attributes && <LoomTable header={ attributesTableHeaders } rows={ tableRows } /> }*/ }
				</AdminSection>
			</AdminColumn>

		</AdminPage>
	</>;
}
