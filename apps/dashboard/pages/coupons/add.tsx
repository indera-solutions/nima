import {
	getTranslation,
	Trans,
	useAddCategoryToVoucherMutation,
	useAddCollectionsToVoucherMutation,
	useAddProductToVoucherMutation,
	useCreateVoucherMutation,
	useDeleteVoucherMutation,
	useLanguages,
	useRemoveCategoryFromVoucherMutation,
	useRemoveCollectionsFromVoucherMutation,
	useRemoveProductFromVoucherMutation,
	useTranslations,
	useUpdateVoucherMutation,
	useVoucherById,
} from '@nima-cms/react';
import { CreateDiscountVoucherDto, DiscountType, DiscountVoucherType } from '@nima-cms/sdk';
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

interface AddVoucherProps {

}


export default function AddVoucher(props: AddVoucherProps) {
	const router = useRouter();
	const { getAdminTranslation } = useTranslations();

	const languages = useLanguages();
	const id: number | undefined = router.query['id'] ? parseIdStr(router.query['id']) : undefined;
	const isEditing = !!id;

	const createVoucherMutation = useCreateVoucherMutation();
	const updateVoucherMutation = useUpdateVoucherMutation();
	const deleteVoucherMutation = useDeleteVoucherMutation();

	const addCategoryToVoucherMutation = useAddCategoryToVoucherMutation();
	const removeCategoryFromVoucherMutation = useRemoveCategoryFromVoucherMutation();
	const addCollectionsToVoucherMutation = useAddCollectionsToVoucherMutation();
	const removeCollectionsFromVoucherMutation = useRemoveCollectionsFromVoucherMutation();
	const addProductToVoucherMutation = useAddProductToVoucherMutation();
	const removeProductFromVoucherMutation = useRemoveProductFromVoucherMutation();


	const { data: existingVoucher } = useVoucherById(id, { refetchInterval: false });

	const title = getAdminTranslation(existingVoucher ? STRINGS.COUPONS_UPDATE_TITLE(getAdminTranslation(existingVoucher.name)) : STRINGS.COUPONS_CREATE_TITLE);


	useEffect(() => {
		if ( !existingVoucher ) return;
		const { id, products, collections, categories, variants, created, used, updatedAt, ...rest } = existingVoucher;
		setCreateVoucherDto({
			...rest,
		});
	}, [existingVoucher]);


	const [createVoucherDto, setCreateVoucherDto] = useState<CreateDiscountVoucherDto>({
		name: {},
		applyOncePerCustomer: false,
		discountValue: 0,
		code: '',
		applyOncePerOrder: false,
		discountValueType: DiscountType.FLAT,
		minCheckoutItemsQuantity: 0,
		minSpentAmount: 0,
		onlyForStaff: false,
		voucherType: DiscountVoucherType.ENTIRE_ORDER,
		startDate: new Date().toISOString(),
		usageLimit: 0,
		metadata: {},
		privateMetadata: {},
	});


	function onValueEdit(name: keyof CreateDiscountVoucherDto, value: any) {
		setCreateVoucherDto(state => ({
			...state,
			[name]: value,
		}));
	}

	async function onCreateVoucher() {

		if ( !isEditing ) {
			try {
				const createdVoucher = await createVoucherMutation.mutateAsync({ createDiscountVoucherDto: createVoucherDto });
				toast.success('Voucher Created!');
				await router.push(NIMA_ROUTES.vouchers.edit(createdVoucher.id));
			} catch ( e: any ) {
				console.log(e);
			}
		} else {
			const updatedVoucher = await updateVoucherMutation.mutateAsync({
				id,
				updateDiscountVoucherDto: createVoucherDto,
			});
			toast.success('Voucher Updated!');
			await router.push(NIMA_ROUTES.vouchers.list);
		}


	}

	async function onSaveCategories(selectedIds) {
		await addCategoryToVoucherMutation.mutateAsync({
			id: id,
			discountAddCategoriesDto: {
				categoryIds: selectedIds,
			},
		});
	}

	async function removeCategory(categoryId: number) {
		await removeCategoryFromVoucherMutation.mutateAsync({
			id: id,
			categoryId: categoryId,
		});
	}

	async function onSaveCollections(selectedIds) {
		await addCollectionsToVoucherMutation.mutateAsync({
			id: id,
			discountAddCollectionsDto: {
				collectionIds: selectedIds,
			},
		});
	}


	async function removeCollection(collectionId: number) {
		await removeCollectionsFromVoucherMutation.mutateAsync({
			id: id,
			collectionId: collectionId,
		});
	}

	async function onSaveProduct(selectedIds) {
		await addProductToVoucherMutation.mutateAsync({
			id: id,
			discountAddProductsDto: {
				productIds: selectedIds,
			},
		});
	}

	async function removeProduct(productId) {
		await removeProductFromVoucherMutation.mutateAsync({
			id: id,
			productId: productId,
		});
	}

	async function onDeleteVoucher() {
		if ( !id || !existingVoucher ) return;
		const confirm = window.confirm(`Are you sure you want to delete ${ getTranslation(existingVoucher.name, languages.adminLanguage) }? It will be removed from all products.`);
		if ( confirm ) {
			await deleteVoucherMutation.mutateAsync({
				id: id,
			});
			toast.success('Voucher Deleted');
			router.push(NIMA_ROUTES.vouchers.list);
		}
	}


	return (
		<>
			<NimaTitle
				title={ title }/>
			<AdminPage
				label={ title }
				footerContainer={ <AdminFooter>

					<Link href={ NIMA_ROUTES.vouchers.list }>
						<button className={ 'btn btn-secondary' }><Trans>{ STRINGS.BACK }</Trans></button>
					</Link>

					{ existingVoucher && <button className="btn btn-error"
												 onClick={ onDeleteVoucher }>
						<Trans>{ STRINGS.DELETE }</Trans>
					</button> }

					<button className="btn btn-success"
							onClick={ onCreateVoucher }>
						<Trans>{ isEditing ? STRINGS.SAVE : STRINGS.CREATE }</Trans>
					</button>
				</AdminFooter> }
			>
				<AdminColumn>
					<AdminSection title={ getAdminTranslation(STRINGS.GENERAL_INFO) }
								  titleRightContainer={ <SelectEditingLanguage/> }>
						<label className="label">
							<span className="label-text">	<Trans>{ STRINGS.NAME }</Trans></span>
						</label>
						<TranslatableInput className={ 'input w-full max-w-xs input-bordered' }
										   name="name"
										   value={ createVoucherDto.name }
										   onChange={ (value) => onValueEdit('name', value) }
						/>

						<div className="form-control w-full max-w-xs">
							<label className="label">
								<span className="label-text">	<Trans>{ STRINGS.CODE }</Trans></span>
							</label>
							<input className={ 'input w-full max-w-xs input-bordered' }
								   type="text"
								   name="name"
								   value={ createVoucherDto.code || '' }
								   onChange={ (e) => onValueEdit('code', e.target.value) }
							/>
						</div>

						<div className={ 'flex flex-col items-start gap-1' }>
							<label className="label cursor-pointer">
								<span className="label-text">	<Trans>{ STRINGS.TYPE }</Trans></span>
							</label>
							<label className="label cursor-pointer">
								<input type="radio" className="radio mr-2"
									   checked={ createVoucherDto.discountValueType === DiscountType.FLAT }
									   onChange={ () => onValueEdit('discountValueType', DiscountType.FLAT) }

								/>
								<span className="label-text">	<Trans>{ STRINGS.FLAT }</Trans></span>
							</label>
							<label className="label cursor-pointer">
								<input type="radio" className="radio mr-2"
									   checked={ createVoucherDto.discountValueType === DiscountType.PERCENTAGE }
									   onChange={ () => onValueEdit('discountValueType', DiscountType.PERCENTAGE) }

								/>
								<span className="label-text">	<Trans>{ STRINGS.PERCENTAGE }</Trans></span>
							</label>
							<label className="label cursor-pointer">
								<input type="radio" className="radio mr-2"
									   checked={ createVoucherDto.discountValueType === DiscountType.FREE_SHIPPING }
									   onChange={ () => onValueEdit('discountValueType', DiscountType.FREE_SHIPPING) }

								/>
								<span className="label-text">	<Trans>{ STRINGS.FREE_SHIPPING }</Trans></span>
							</label>
						</div>

						{ createVoucherDto.discountValueType !== DiscountType.FREE_SHIPPING &&
							<div className="form-control">
								<label className="label">
									<span className="label-text">	<Trans>{ STRINGS.VALUE }</Trans></span>
								</label>
								<label className="input-group">
									<input
										className={ 'input input-bordered ' }
										type={ 'number' }
										value={ createVoucherDto.discountValue }
										onChange={ (e) => onValueEdit('discountValue', e.target.value ? +e.target.value : 0) }/>
									<span>{ createVoucherDto.discountValueType === DiscountType.PERCENTAGE ? '%' : '???' }</span>
								</label>
							</div> }
					</AdminSection>

					{ id && existingVoucher && <SalesCollectionList
						collections={ existingVoucher.collections }
						onSave={ onSaveCollections }
						onRemove={ removeCollection }
					/> }
					{ id && existingVoucher && <SalesCategoryList
						categories={ existingVoucher.categories }
						onSave={ onSaveCategories }
						onRemove={ removeCategory }
					/> }
					{ id && existingVoucher && <SalesProductList
						products={ existingVoucher.products }
						onSave={ onSaveProduct }
						onRemove={ removeProduct }
					/> }


					<MetadataEditor values={ createVoucherDto.metadata as Metadata }
									onChange={ (v => onValueEdit('metadata', v)) }/>
					<MetadataEditor isPrivate values={ createVoucherDto.privateMetadata as Metadata }
									onChange={ (v => onValueEdit('privateMetadata', v)) }/>
				</AdminColumn>
				<AdminColumn>
					{ existingVoucher && <AdminSection title={ getAdminTranslation(STRINGS.INFO) }>
						<h2><Trans>{ STRINGS.USED }</Trans>: <strong>{ existingVoucher.used }</strong></h2>
					</AdminSection> }
					<AdminSection title={ getAdminTranslation(STRINGS.USAGE) }>
						<div className="form-control w-full max-w-xs">
							<label className="label">
								<span className="label-text"><Trans>{ STRINGS.LIMIT_USAGE }</Trans></span>
								<span
									className="label-text-alt"><Trans>{ STRINGS.LEAVE_ZERO_FOR_UNLIMITED }</Trans></span>

							</label>
							<input className={ 'input w-full max-w-xs input-bordered' }
								   type="number"
								   name="name"
								   value={ createVoucherDto.usageLimit || 0 }
								   onChange={ (e) => onValueEdit('usageLimit', +e.target.value) }
							/>
						</div>
					</AdminSection>
				</AdminColumn>
			</AdminPage>
		</>
	);
}


