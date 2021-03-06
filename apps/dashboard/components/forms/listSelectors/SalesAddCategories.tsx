import { Trans, useFlatCategories } from '@nima-cms/react';
import { CategoryDto } from '@nima-cms/sdk';
import React, { useMemo, useState } from 'react';
import { STRINGS } from '../../../strings/strings';

interface SalesAddCategoriesProps {
	existingCategories: CategoryDto[];
	onSave: (ids: number[]) => void;
	onClose: () => void;
}

export function SalesAddCategories(props: SalesAddCategoriesProps) {
	const { data: categories } = useFlatCategories();
	const [selectedIds, setSelectedIds] = useState<number[]>([]);
	const existingIds = useMemo(() => {
		return props.existingCategories.map(e => e.id);
	}, [props.existingCategories]);

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
					<h3 className="font-bold text-lg"><Trans>{ STRINGS.ADD_CATEGORIES }</Trans></h3>
					<div className="py-4">
						<div className={ 'flex gap-4' }>
							<table className="table w-full scroll-auto h-20">
								<thead>
								<tr>
									<th></th>
									<th><Trans caps>{ STRINGS.NAME }</Trans></th>
								</tr>
								</thead>
								<tbody>
								{ (categories || [])
									.filter(category => !existingIds.includes(category.id))
									.map(category => <SalesAddCategoryListItem
										key={ category.id }
										selected={ selectedIds.includes(category.id) }
										onToggle={ onToggle }
										category={ category }/>) }
								</tbody>
							</table>

						</div>
					</div>
					<div className="modal-action">
						<label className="btn btn-success" onClick={ onSave }>
							<Trans>{ STRINGS.ADD_CATEGORIES }</Trans>
						</label>
					</div>
				</div>
			</div>
		</>
	);
}

function SalesAddCategoryListItem(props: {
	category: CategoryDto,
	selected: boolean,
	onToggle: (id: number) => void
}) {
	const { category } = props;
	return <tr className={ 'hover' }>
		<td><input
			type="checkbox"
			className={ 'checkbox' }
			checked={ props.selected }
			onChange={ () => props.onToggle(props.category.id) }
		/></td>
		<td><Trans>{ category.name }</Trans></td>
	</tr>;
}
