import { Trans, useCategories, useTranslations } from '@nima-cms/react';
import Link from 'next/link';
import React from 'react';
import { AdminColumn, AdminPage, AdminSection, NimaTitle } from '../../components';
import { CategoriesTable } from '../../components/categories/categoriesTable';
import { NIMA_ROUTES } from '../../lib/routes';
import { STRINGS } from '../../strings/strings';

interface CategoriesListProps {

}

export default function CategoriesList(props: CategoriesListProps) {
	const { data: categories } = useCategories();
	const { getAdminTranslation } = useTranslations();

	return <>
		<NimaTitle title={ getAdminTranslation(STRINGS.CATEGORIES) }/>
		<AdminPage
			label={ getAdminTranslation(STRINGS.CATEGORIES) }
		>
			<AdminColumn>
				<AdminSection
					title={ getAdminTranslation(STRINGS.LIST) }
					subtitle={ (categories?.length || 0) + ' ' + getAdminTranslation(STRINGS.CATEGORIES).toLowerCase() }
					titleRightContainer={
						<Link href={ NIMA_ROUTES.categories.add() }>
							<a
								className={ 'btn btn-primary' }><Trans>{ STRINGS.ADD_NEW }</Trans></a>
						</Link>
					}
				>
					<CategoriesTable categories={ categories || [] }/>
				</AdminSection>
			</AdminColumn>

		</AdminPage>
	</>;
}
