import {
	getTranslation,
	Trans,
	useAddCategoryToSaleMutation,
	useAddCollectionsToSaleMutation,
	useAddProductToSaleMutation,
	useCreateSaleMutation,
	useDeleteSaleMutation,
	useLanguages,
	useRemoveCategoryFromSaleMutation,
	useRemoveCollectionsFromSaleMutation,
	useRemoveProductFromSaleMutation,
	useSaleById,
	useTranslations,
	useUpdateSaleMutation,
} from '@nima-cms/react';
import { CreateDiscountSaleDto, DiscountType } from '@nima-cms/sdk';
import { Metadata, parseIdStr } from '@nima-cms/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
	AdminColumn,
	AdminFooter,
	AdminPage,
	AdminSection,
	MetadataEditor,
	NimaTitle,
	SalesCategoryList,
	SalesCollectionList,
	SalesProductList,
	SelectEditingLanguage,
	TranslatableInput,
} from '../../components';
import { NIMA_ROUTES } from '../../lib/routes';
import { STRINGS } from '../../strings/strings';

interface AddSaleProps {

}


export default function AddSale(props: AddSaleProps) {
	const router = useRouter();
	const languages = useLanguages();
	const { getAdminTranslation } = useTranslations();

	const id: number | undefined = router.query['id'] ? parseIdStr(router.query['id']) : undefined;
	const isEditing = !!id;

	const createSaleMutation = useCreateSaleMutation();
	const updateSaleMutation = useUpdateSaleMutation();
	const deleteSaleMutation = useDeleteSaleMutation();

	const addCategoryToSaleMutation = useAddCategoryToSaleMutation();
	const removeCategoryFromSaleMutation = useRemoveCategoryFromSaleMutation();
	const addCollectionsToSaleMutation = useAddCollectionsToSaleMutation();
	const removeCollectionsFromSaleMutation = useRemoveCollectionsFromSaleMutation();
	const addProductToSaleMutation = useAddProductToSaleMutation();
	const removeProductFromSaleMutation = useRemoveProductFromSaleMutation();


	const { data: existingSale } = useSaleById(id, { refetchInterval: false });

	const title = getAdminTranslation(existingSale ? STRINGS.SALE_UPDATE_TITLE(getAdminTranslation(existingSale.name)) : STRINGS.SALE_CREATE_TITLE);


	useEffect(() => {
		if ( !existingSale ) return;
		const { id, products, collections, categories, variants, created, updatedAt, ...rest } = existingSale;
		setCreateSaleDto({
			...rest,
		});
	}, [existingSale]);


	const [createSaleDto, setCreateSaleDto] = useState<CreateDiscountSaleDto>({
		name: {},
		discountType: DiscountType.FLAT,
		discountValue: 0,
		metadata: {},
		privateMetadata: {},
	});


	function onValueEdit(name: keyof CreateDiscountSaleDto, value: any) {
		setCreateSaleDto(state => ({
			...state,
			[name]: value,
		}));
	}

	async function onCreateSale() {

		if ( !isEditing ) {
			try {
				const createdSale = await createSaleMutation.mutateAsync({ createDiscountSaleDto: createSaleDto });
				toast.success('Sale Created!');
				await router.push(NIMA_ROUTES.sales.edit(createdSale.id));
			} catch ( e: any ) {
				console.log(e);
			}
		} else {
			const updatedSale = await updateSaleMutation.mutateAsync({
				id,
				updateDiscountDto: createSaleDto,
			});
			toast.success('Sale Updated!');
			await router.push(NIMA_ROUTES.sales.list);
		}


	}

	async function onSaveCategories(selectedIds) {
		await addCategoryToSaleMutation.mutateAsync({
			id: id,
			discountAddCategoriesDto: {
				categoryIds: selectedIds,
			},
		});
	}

	async function removeCategory(categoryId: number) {
		await removeCategoryFromSaleMutation.mutateAsync({
			id: id,
			categoryId: categoryId,
		});
	}

	async function onSaveCollections(selectedIds) {
		console.log(selectedIds);
		await addCollectionsToSaleMutation.mutateAsync({
			id: id,
			discountAddCollectionsDto: {
				collectionIds: selectedIds,
			},
		});
	}


	async function removeCollection(collectionId: number) {
		await removeCollectionsFromSaleMutation.mutateAsync({
			id: id,
			collectionId: collectionId,
		});
	}

	async function onSaveProduct(selectedIds) {
		await addProductToSaleMutation.mutateAsync({
			id: id,
			discountAddProductsDto: {
				productIds: selectedIds,
			},
		});
	}

	async function removeProduct(productId) {
		await removeProductFromSaleMutation.mutateAsync({
			id: id,
			productId: productId,
		});
	}

	async function onDeleteSale() {
		if ( !id || !existingSale ) return;
		const confirm = window.confirm(`Are you sure you want to delete ${ getTranslation(existingSale.name, languages.adminLanguage) }? It will be removed from all products.`);
		if ( confirm ) {
			await deleteSaleMutation.mutateAsync({
				id: id,
			});
			toast.success('Sale Deleted');
			router.push(NIMA_ROUTES.sales.list);
		}
	}

	return (
		<>
			<NimaTitle
				title={ title }/>
			<AdminPage
				label={ title }
				footerContainer={ <AdminFooter>

					<Link href={ NIMA_ROUTES.sales.list }>
						<button className={ 'btn btn-secondary' }><Trans>{ STRINGS.BACK }</Trans></button>
					</Link>
					{ existingSale && <button className="btn btn-error"
											  onClick={ onDeleteSale }>
						<Trans>{ STRINGS.DELETE }</Trans>
					</button> }
					<button className="btn btn-success"
							onClick={ onCreateSale }><Trans>{ isEditing ? STRINGS.SAVE : STRINGS.CREATE }</Trans>
					</button>
				</AdminFooter> }
			>
				<AdminColumn>
					<AdminSection title={ getAdminTranslation(STRINGS.GENERAL_INFO) }
								  titleRightContainer={ <SelectEditingLanguage/> }>
						<label className="label">
							<span className="label-text"><Trans>{ STRINGS.NAME }</Trans></span>
						</label>
						<TranslatableInput className={ 'input w-full max-w-xs input-bordered' }
										   name="name"
										   value={ createSaleDto.name }
										   onChange={ (value) => onValueEdit('name', value) }
						/>

						<div className={ 'flex flex-col items-start gap-1' }>
							<label className="label cursor-pointer">
								<span className="label-text"><Trans>{ STRINGS.TYPE }</Trans></span>
							</label>
							<label className="label cursor-pointer">
								<input type="radio" className="radio mr-2"
									   checked={ createSaleDto.discountType === DiscountType.FLAT }
									   onChange={ () => onValueEdit('discountType', DiscountType.FLAT) }

								/>
								<span className="label-text"><Trans>{ STRINGS.FLAT }</Trans></span>
							</label>
							<label className="label cursor-pointer">
								<input type="radio" className="radio mr-2"
									   checked={ createSaleDto.discountType === DiscountType.PERCENTAGE }
									   onChange={ () => onValueEdit('discountType', DiscountType.PERCENTAGE) }

								/>
								<span className="label-text"><Trans>{ STRINGS.PERCENTAGE }</Trans></span>
							</label>
						</div>

						<div className="form-control">
							<label className="label">
								<span className="label-text"><Trans>{ STRINGS.VALUE }</Trans></span>
							</label>
							<label className="input-group">
								<input
									className={ 'input input-bordered ' }
									type={ 'number' }
									value={ createSaleDto.discountValue }
									onChange={ (e) => onValueEdit('discountValue', e.target.value ? +e.target.value : 0) }/>
								<span>{ createSaleDto.discountType === DiscountType.PERCENTAGE ? '%' : '€' }</span>
							</label>
						</div>
					</AdminSection>

					{ id && existingSale && <SalesCollectionList
						collections={ existingSale.collections }
						onSave={ onSaveCollections }
						onRemove={ removeCollection }
					/> }
					{ id && existingSale && <SalesCategoryList
						categories={ existingSale.categories }
						onSave={ onSaveCategories }
						onRemove={ removeCategory }
					/> }
					{ id && existingSale && <SalesProductList
						products={ existingSale.products }
						onSave={ onSaveProduct }
						onRemove={ removeProduct }
					/> }


					<MetadataEditor values={ createSaleDto.metadata as Metadata }
									onChange={ (v => onValueEdit('metadata', v)) }/>
					<MetadataEditor isPrivate values={ createSaleDto.privateMetadata as Metadata }
									onChange={ (v => onValueEdit('privateMetadata', v)) }/>
				</AdminColumn>
			</AdminPage>
		</>
	);
}


