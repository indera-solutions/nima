import { Trans, useCategoryId, useProducts, useProductTypeId } from '@nima-cms/react';
import { ProductDto } from '@nima-cms/sdk';
import { getEuroValue } from '@nima-cms/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { AdminColumn, AdminPage, AdminSection, NimaTitle } from '../../components';
import { ProductImage } from '../../components/products/ProductImage';
import { Pagination } from '../../components/utils/Pagination';
import { NIMA_ROUTES } from '../../lib/routes';

const queryString = require('query-string');

interface ProductListProps {

}

const ITEMS_PER_PAGE = 20;
export default function ProductList(props: ProductListProps) {
	const router = useRouter();
	const page = (+router.query['page'] || 1) as number;
	const { data: productsResponse } = useProducts({
		page: page,
		itemsPerPage: ITEMS_PER_PAGE,
	});

	async function onPageSelect(page: number) {
		const q: string = queryString.stringify({
			page: page,
		}, {
			skipNull: true,
		});
		await router.push(router.pathname + '?' + q, undefined, {});
	}

	return <>
		<NimaTitle title={ 'Products' }/>
		<AdminPage
			label={ 'Products' }
		>
			<AdminColumn>
				<AdminSection
					title={ 'List' }
					subtitle={ (productsResponse?.totalCount || 0) + ' products' }
					titleRightContainer={
						<Link href={ NIMA_ROUTES.products.add() }>
							<a
								className={ 'btn btn-primary' }>Add new</a>
						</Link>
					}
				>
					<div className="overflow-x-auto">
						<table className="table w-full">
							<thead>
							<tr>
								<th></th>
								<th>Name</th>
								<th>Category</th>
								<th>Product Type</th>
								<th>Price</th>
								<th>Actions</th>
							</tr>
							</thead>
							<tbody>
							{ (productsResponse?.items || []).map(product => <ProductRow key={ product.id }
																						 product={ product }/>) }
							</tbody>
						</table>
						{ productsResponse && ITEMS_PER_PAGE < productsResponse.totalCount && <Pagination
							onPageSelect={ onPageSelect }
							page={ page }
							itemsPerPage={ ITEMS_PER_PAGE }
							totalItems={ productsResponse?.totalCount || 0 }
						/> }
					</div>
				</AdminSection>
			</AdminColumn>

		</AdminPage>
	</>;
};

function ProductRow(props: { product: ProductDto }) {
	const { product } = props;

	const { data: category } = useCategoryId(product.categoryId);
	const { data: productType } = useProductTypeId(product.productTypeId);

	return <tr
		className={ 'hover' }>
		<td><ProductImage product={ props.product }/></td>
		<td><Trans>{ product.name }</Trans></td>
		<td><Trans>{ category?.name }</Trans></td>
		<td><Trans>{ productType?.name }</Trans></td>
		<td>{ getEuroValue(product.minPrice) }</td>
		<td>
			<Link href={ NIMA_ROUTES.products.edit(product.id) }>
				<button className={ 'btn btn-primary' }>Edit</button>
			</Link>
		</td>
	</tr>;
}
