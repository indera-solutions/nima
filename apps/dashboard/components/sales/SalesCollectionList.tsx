import { Trans, useRemoveCollectionsFromSaleMutation } from '@nima-cms/react';
import { CollectionDto } from '@nima-cms/sdk';
import React, { useState } from 'react';
import { AdminSection } from '../AdminLayout';
import { SalesAddCollections } from './SalesAddCollections';

interface SalesCollectionProps {
	id: number;
	collections: CollectionDto[];
}

export function SalesCollectionList(props: SalesCollectionProps) {
	const [modalOpen, setModalOpen] = useState(false);
	const removeCollectionsFromSaleMutation = useRemoveCollectionsFromSaleMutation();

	async function removeProduct(id: number) {
		await removeCollectionsFromSaleMutation.mutateAsync({
			id: props.id,
			collectionId: id,
		});
	}

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
											onClick={ () => removeProduct(collection.id) }>Remove
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
				saleId={ props.id }
			/> }
		</>
	);
}
