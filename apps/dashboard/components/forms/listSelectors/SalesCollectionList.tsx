import { Trans } from '@nima-cms/react';
import { CollectionDto } from '@nima-cms/sdk';
import React, { useState } from 'react';
import { AdminSection } from '../../AdminLayout';
import { SalesAddCollections } from './SalesAddCollections';

interface SalesCollectionProps {
	collections: CollectionDto[];
	onSave: (selectedIds: number[]) => void;
	onRemove: (id: number) => void;
}

export function SalesCollectionList(props: SalesCollectionProps) {
	const [modalOpen, setModalOpen] = useState(false);

	return (
		<>
			<AdminSection title={ 'Collections' }
						  titleRightContainer={ <button onClick={ () => setModalOpen(true) }
														className={ 'btn btn-primary' }>Add</button> }>
				<div className="overflow-x-auto">
					<table className="table w-full">
						<thead>
						<tr>
							<th>Name</th>
							<th>Actions</th>
						</tr>
						</thead>
						<tbody>
						{ (props.collections || []).map(collection => <tr className={ 'hover' } key={ collection.id }>
								<td><Trans>{ collection.name }</Trans></td>
								<td>
									<button className={ 'btn btn-error' }
											onClick={ () => props.onRemove(collection.id) }>Remove
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
