import { Trans, useCategoryId, useProducts, useProductTypeId, useTranslations } from '@nima-cms/react';
import { ProductDto, ProductsApiProductsFindAllRequest } from '@nima-cms/sdk';
import { getEuroValue } from '@nima-cms/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { AdminColumn, AdminPage, AdminSection, NimaTitle, StockBadge } from '../../components';
import { CategoriesSelect } from '../../components/forms/CategoriesSelect';
import { CollectionSelect } from '../../components/forms/CollectionSelect';
import { ProductImage } from '../../components/products/ProductImage';
import { Pagination } from '../../components/utils/Pagination';
import { NIMA_ROUTES } from '../../lib/routes';
import { STRINGS } from '../../strings/strings';

const queryString = require('query-string');


interface ProductListProps {

}

const ITEMS_PER_PAGE = 20;
export default function ProductList(props: ProductListProps) {
	const router = useRouter();
	const { getAdminTranslation } = useTranslations();

	const query: ProductsApiProductsFindAllRequest = useMemo(() => ({
		page: (+router.query['page'] || 1) as number,
		itemsPerPage: ITEMS_PER_PAGE,
		search: router.query['search'] as string,
		categoryId: router.query['categoryId'] ? +router.query['categoryId'] as number : undefined,
		collectionId: router.query['collectionId'] ? +router.query['collectionId'] as number : undefined,
	}), [router.query]);


	const [searchStr, setSearchStr] = useState<string | undefined>(router.query['search'] as string);
	const [debouncedSearch] = useDebounce(searchStr, 1000);
	const { data: productsResponse } = useProducts(query);

	useEffect(() => {
		onFiltering('search', debouncedSearch || undefined);
	}, [debouncedSearch]);

	useEffect(() => {
		if ( !productsResponse ) return;
		if ( query.page * query.itemsPerPage > productsResponse.totalCount ) {
			onFiltering('page', 1);
		}
	}, [productsResponse, query.page, query.itemsPerPage]);

	async function onFiltering(key: keyof ProductsApiProductsFindAllRequest, value) {
		const q: string = queryString.stringify({
			...router.query,
			...query,
			[key]: value,
		}, {
			skipNull: true,
		});
		await router.push(router.pathname + '?' + q, undefined, {});
	}

	return <>
		<NimaTitle title={ 'Products' }/>
		<AdminPage
			label={ getAdminTranslation(STRINGS.PRODUCTS) }
		>
			<AdminColumn>
				<AdminSection
					title={ getAdminTranslation(STRINGS.LIST) }
					subtitle={ (productsResponse?.totalCount || 0) + ' ' + getAdminTranslation(STRINGS.PRODUCTS) }
					titleRightContainer={
						<Link href={ NIMA_ROUTES.products.add() }>
							<a
								className={ 'btn btn-primary' }><Trans>{ STRINGS.ADD_NEW }</Trans></a>
						</Link>
					}
				>
					<div className={ 'flex gap-4 align-middle' }>
						<div className="form-control w-full max-w-xs">
							<label className="label">
								<span className="label-text"><Trans>{ STRINGS.SEARCH }</Trans></span>
							</label>
							<input className={ 'input w-full max-w-xs input-bordered' }
								   type="text"
								   value={ searchStr || '' }
								   onChange={ (e) => setSearchStr(e.target.value) }
							/>
						</div>
						<div className="form-control w-full max-w-xs">

							<label className="label">
								<span className="label-text"><Trans>{ STRINGS.CATEGORIES }</Trans></span>
							</label>
							<CategoriesSelect
								selectedId={ query.categoryId }
								onChange={ (id) => {
									onFiltering('categoryId', id);
								} }
								isClearable
							/>

						</div>
						<div className="form-control w-full max-w-xs">

							<label className="label">
								<span className="label-text"><Trans>{ STRINGS.COLLECTIONS }</Trans></span>
							</label>

							<CollectionSelect
								selectedIds={ query.collectionId ? [query.collectionId] : [] }
								onChange={ (id) => {
									onFiltering('collectionId', id[id.length - 1]);
								} }
								isClearable={ false }
							/>
						</div>
					</div>
				</AdminSection>
				<AdminSection title={ '' }>
					<div className="overflow-x-auto">
						<table className="table w-full">
							<thead>
							<tr>
								<th></th>
								<th><Trans caps>{ STRINGS.NAME }</Trans></th>
								<th><Trans caps>{ STRINGS.CATEGORY }</Trans></th>
								<th><Trans caps>{ STRINGS.PRODUCT_TYPE }</Trans></th>
								<th><Trans caps>{ STRINGS.PRICE }</Trans></th>
								<th><Trans caps>{ STRINGS.STOCK }</Trans></th>
								<th><Trans caps>{ STRINGS.PUBLISHED }</Trans></th>
								<th><Trans caps>{ STRINGS.ACTIONS }</Trans></th>
							</tr>
							</thead>
							<tbody>
							{ (productsResponse?.items || []).map(product => <ProductRow key={ product.id }
																						 product={ product }/>) }
							</tbody>
						</table>
						{ productsResponse && ITEMS_PER_PAGE < productsResponse.totalCount && <Pagination
							onPageSelect={ (page) => {
								onFiltering('page', page);
							} }
							page={ query.page }
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
		{/*<td>{ product.defaultVariant?.stock === 0 ? <div className="badge badge-error gap-2">*/ }
		{/*	0*/ }
		{/*</div> : product.defaultVariant?.stock }</td>*/ }
		<td><StockBadge productVariant={ product.defaultVariant }/></td>
		<td>{ product.isPublished ?
			<div className="badge badge-success gap-2">
				<Trans>{ STRINGS.PUBLISHED }</Trans>
			</div>
			: <div className="badge badge-warning  gap-2">
				<Trans>{ STRINGS.DRAFT }</Trans>
			</div> }</td>
		<td>
			<Link href={ NIMA_ROUTES.products.edit(product.id) }>
				<a className={ 'btn btn-primary' }>
					<Trans>{ STRINGS.EDIT }</Trans>
				</a>
			</Link>
		</td>
	</tr>;
}
