import { Trans, useCollections } from '@nima-cms/react';
import { CollectionDto } from '@nima-cms/sdk';
import React, { useMemo, useState } from 'react';

interface SalesAddCollectionsProps {
	existingCollections: CollectionDto[];
	onClose: () => void;
	onSave: (ids: number[]) => void;
}

export function SalesAddCollections(props: SalesAddCollectionsProps) {
	const { data: collections } = useCollections();
	const [selectedIds, setSelectedIds] = useState<number[]>([]);
	const existingIds = useMemo(() => {
		return props.existingCollections.map(e => e.id);
	}, [props.existingCollections]);

	function onToggle(id: number) {
		setSelectedIds(state => {
			const temp = Array.from(state);
			if ( state.includes(id) ) {
				temp.splice(temp.indexOf(id), 1);
			} else {
				temp.push(id);
			}
			return temp;
		});
	}

	async function onSave() {
		props.onSave(selectedIds);
		props.onClose();
	}

	return (
		<>
			<div className="modal modal-open">
				<div className="modal-box">
					<label onClick={ props.onClose } className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
					<h3 className="font-bold text-lg">Add Collections</h3>
					<div className="py-4">
						<div className={ 'flex gap-4' }>
							<table className="table w-full">
								<thead>
								<tr>
									<th></th>
									<th>Name</th>
								</tr>
								</thead>
								<tbody>
								{ (collections || [])
									.filter(collection => !existingIds.includes(collection.id))
									.map(collection => <SalesAddCollectionListItem
										key={ collection.id }
										selected={ selectedIds.includes(collection.id) }
										onToggle={ onToggle }
										collection={ collection }/>) }
								</tbody>
							</table>

						</div>
					</div>
					<div className="modal-action">
						<label className="btn btn-success" onClick={ onSave }>
							Add Products
						</label>
					</div>
				</div>
			</div>
		</>
	);
}

function SalesAddCollectionListItem(props: {
	collection: CollectionDto,
	selected: boolean,
	onToggle: (id: number) => void
}) {
	const { collection } = props;
	return <tr className={ 'hover' }>
		<td><input
			type="checkbox"
			className={ 'checkbox' }
			checked={ props.selected }
			onChange={ () => props.onToggle(props.collection.id) }
		/></td>
		<td><Trans>{ collection.name }</Trans></td>
	</tr>;
}
