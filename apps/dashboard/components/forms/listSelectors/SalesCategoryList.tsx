import { Trans } from '@nima-cms/react';
import { CategoryDto } from '@nima-cms/sdk';
import React, { useState } from 'react';
import { AdminSection } from '../../AdminLayout';
import { SalesAddCategories } from './SalesAddCategories';

interface SalesCategoryListProps {
	categories: CategoryDto[];
	onSave: (selectedIds: number[]) => void;
	onRemove: (id: number) => void;
}

export function SalesCategoryList(props: SalesCategoryListProps) {
	const [modalOpen, setModalOpen] = useState(false);

	return (
		<>
			<AdminSection title={ 'Categories' }
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
						{ (props.categories || []).map(collection => <tr className={ 'hover' } key={ collection.id }>
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
			{ modalOpen && <SalesAddCategories
				onClose={ () => setModalOpen(false) }
				existingCategories={ props.categories || [] }
				onSave={ props.onSave }
			/> }
		</>
	);
}
