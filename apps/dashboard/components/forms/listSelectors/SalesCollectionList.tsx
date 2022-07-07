import { Trans, useTranslations } from '@nima-cms/react';
import { CollectionDto } from '@nima-cms/sdk';
import React, { useState } from 'react';
import { STRINGS } from '../../../strings/strings';
import { AdminSection } from '../../AdminLayout';
import { SalesAddCollections } from './SalesAddCollections';

interface SalesCollectionProps {
	collections: CollectionDto[];
	onSave: (selectedIds: number[]) => void;
	onRemove: (id: number) => void;
}

export function SalesCollectionList(props: SalesCollectionProps) {
	const [modalOpen, setModalOpen] = useState(false);
	const { getAdminTranslation } = useTranslations();


	return (
		<>
			<AdminSection title={ getAdminTranslation(STRINGS.COLLECTIONS) }
						  titleRightContainer={ <button onClick={ () => setModalOpen(true) }
														className={ 'btn btn-primary' }><Trans>{ STRINGS.ADD }</Trans>
						  </button> }>
				<div className="overflow-x-auto">
					<table className="table w-full">
						<thead>
						<tr>
							<th><Trans caps>{ STRINGS.NAME }</Trans></th>
							<th><Trans caps>{ STRINGS.ACTIONS }</Trans></th>
						</tr>
						</thead>
						<tbody>
						{ (props.collections || []).map(collection => <tr className={ 'hover' } key={ collection.id }>
								<td><Trans>{ collection.name }</Trans></td>
								<td>
									<button className={ 'btn btn-error' }
											onClick={ () => props.onRemove(collection.id) }>
										<Trans>{ STRINGS.REMOVE }</Trans>
									</button>
								</td>
							</tr>,
						) }
						</tbody>
					</table>
				</div>
			</AdminSection>
			{ modalOpen && <SalesAddCollections
				onClose={ () => setModalOpen(false) }
				existingCollections={ props.collections || [] }
				onSave={ props.onSave }
			/> }
		</>
	);
}
