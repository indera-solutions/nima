import { useCategories } from '@nima/react';
import Link from 'next/link';
import React from 'react';
import { AdminColumn, AdminPage, AdminSection, NimaTitle } from '../../components';
import { CategoriesTable } from '../../components/categories/categoriesTable';
import { NIMA_ROUTES } from '../../lib/routes';

interface CategoriesListProps {

}

export default function CategoriesList(props: CategoriesListProps) {
	const { data: categories } = useCategories();

	return <>
		<NimaTitle title={ 'Categories' }/>
		<AdminPage
			label={ 'Categories' }
		>
			<AdminColumn>
				<AdminSection
					title={ 'List' }
					subtitle={ (categories?.length || 0) + ' categories' }
					titleRightContainer={
						<Link href={ NIMA_ROUTES.categories.add() }>
							<a
								className={ 'btn btn-primary' }>Add new</a>
						</Link>
					}
				>
					<CategoriesTable categories={ categories || [] }/>
				</AdminSection>
			</AdminColumn>

		</AdminPage>
	</>;
}
