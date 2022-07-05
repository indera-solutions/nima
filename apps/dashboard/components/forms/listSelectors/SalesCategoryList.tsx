import { Trans, useTranslations } from '@nima-cms/react';
import { CategoryDto } from '@nima-cms/sdk';
import React, { useState } from 'react';
import { STRINGS } from '../../../strings/strings';
import { AdminSection } from '../../AdminLayout';
import { SalesAddCategories } from './SalesAddCategories';

interface SalesCategoryListProps {
	categories: CategoryDto[];
	onSave: (selectedIds: number[]) => void;
	onRemove: (id: number) => void;
}

export function SalesCategoryList(props: SalesCategoryListProps) {
	const [modalOpen, setModalOpen] = useState(false);
	const { getAdminTranslation } = useTranslations();


	return (
		<>
			<AdminSection title={ getAdminTranslation(STRINGS.CATEGORIES) }
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
						{ (props.categories || []).map(collection => <tr className={ 'hover' } key={ collection.id }>
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
			{ modalOpen && <SalesAddCategories
				onClose={ () => setModalOpen(false) }
				existingCategories={ props.categories || [] }
				onSave={ props.onSave }
			/> }
		</>
	);
}
