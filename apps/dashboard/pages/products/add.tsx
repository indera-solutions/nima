import {
	getTranslation,
	Trans,
	useCreateProductMutation,
	useCreateProductVariationMutation,
	useDeleteProductMutation,
	useLanguages,
	useProductById,
	useProductTypeId,
	useProductTypes,
	useProductVariantsByProductId,
	useTranslations,
	useUpdateProductMutation,
	useUpdateProductVariationMutation,
} from '@nima-cms/react';
import { CreateAssignedProductAttributeDto, CreateProductDto, CreateProductVariantDto } from '@nima-cms/sdk';
import { getEuroValue, getSlug, Metadata, parseIdStr } from '@nima-cms/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import {
	AdminColumn,
	AdminFooter,
	AdminPage,
	AdminSection,
	EditProductAttribute,
	EditVariantInformation,
	MediaSelectorSection,
	MetadataEditor,
	NimaTitle,
	RichTextInput,
	SelectEditingLanguage,
	StockBadge,
	TranslatableInput,
} from '../../components';
import { CategoriesSelect } from '../../components/forms/CategoriesSelect';
import { CollectionSelect } from '../../components/forms/CollectionSelect';
import { NIMA_ROUTES } from '../../lib/routes';
import { STRINGS } from '../../strings/strings';


interface AddProps {

}

export default function Add(props: AddProps) {

	const router = useRouter();
	const languages = useLanguages();
	const { getAdminTranslation } = useTranslations();
	const id: number | undefined = router.query['id'] ? parseIdStr(router.query['id']) : undefined;
	const isEditing = !!id;

	const createProductMutation = useCreateProductMutation();
	const updateProductMutation = useUpdateProductMutation();
	const deleteProductMutation = useDeleteProductMutation();
	const createProductVariationMutation = useCreateProductVariationMutation();
	const updateProductVariationMutation = useUpdateProductVariationMutation();

	const { data: existingProduct } = useProductById(id, { refetchInterval: false });
	const { data: existingProductVariants } = useProductVariantsByProductId(id, { refetchInterval: false });

	const title = getAdminTranslation(existingProduct ? STRINGS.PRODUCT_UPDATE_TITLE(getAdminTranslation(existingProduct.name)) : STRINGS.PRODUCT_CREATE_TITLE);

	const [createProductDto, setCreateProductDto] = useState<CreateProductDto>({
		name: {},
		attributes: [],
		categoryId: 0,
		chargeTaxes: false,
		currency: 'EUR',
		description: {},
		descriptionRaw: {},
		additionalDescription: {},
		additionalDescriptionRaw: {},
		descriptionPlaintext: '',
		isAvailableForPurchase: true,
		isPublished: true,
		isVisibleInListings: true,
		metadata: {},
		minPrice: 0,
		privateMetadata: {},
		productTypeId: 0,
		rating: 0,
		seoDescription: '',
		slug: '',
		seoTitle: '',
		weight: 0,
		productMedia: [],
		collectionIds: [],
	});


	const [defaultVariant, setDefaultVariant] = useState<CreateProductVariantDto>({
			name: {},
			privateMetadata: {},
			attributes: [],
			currency: 'EUR',
			metadata: {},
			sku: '',
			stock: 0,
			trackInventory: false,
			productMedia: [],
		},
	);


	const isReadyToSubmit: boolean = useMemo(() => {
		if ( !createProductDto.categoryId || !createProductDto.productTypeId ) return false;
		if ( !createProductDto.name[languages.defaultLanguage] ) return false;
		// TODO add check for required attributes
		return true;
	}, [createProductDto, languages.defaultLanguage]);

	const { data: productTypes } = useProductTypes();
	const { data: productType } = useProductTypeId(createProductDto.productTypeId);

	useEffect(() => {
		if ( isEditing ) return;
		if ( !productType ) return;
		setCreateProductDto(state => ({
			...state,
			attributes: productType.attributes.map(att => ({
				productTypeAttributeId: att.id,
				values: [],
			})),
		}));
	}, [productType]);

	useEffect(() => {
		onVariantValueEdit('name', createProductDto.name);
	}, [createProductDto.name]);

	useEffect(() => {
		if ( !existingProduct ) return;
		const { id, attributes, productMedia, defaultVariant, collections, defaultVariantId, updatedAt, created, ...rest } = existingProduct;
		setCreateProductDto({
			...rest,
			productMedia: productMedia.map(pm => ({ mediaId: pm.media.id, sortOrder: pm.sortOrder })),
			collectionIds: collections.map(c => c.id),
			attributes: productType ? productType.attributes.map(pta => {
				const att = attributes.find(a => pta.attributeId === a.id);
				if ( !pta ) throw new Error('att not found');
				return {
					productTypeAttributeId: pta.id,
					values: att ? att.values.map(v => ({
						valueId: v.id,
						sortOrder: v.sortOrder,
					})) : [],
				};
			}) : [],
		});
	}, [existingProduct, productType]);

	useEffect(() => {
		if ( !existingProductVariants || !productType ) return;
		if ( productType.hasVariants ) return;
		if ( !existingProductVariants[0] ) return;
		const { id, attributes, updatedAt, discountedPrice, created, ...rest } = existingProductVariants[0];
		delete rest['productId'];
		setDefaultVariant({
			...rest,
			attributes: [],
			productMedia: [],
		});
	}, [existingProductVariants, productType]);

	const variantsHeaders = useMemo(() => {
		if ( !productType || !existingProductVariants || !existingProductVariants[0] ) return [];
		return productType.variantAttributes.filter(pta => pta.variantSelection).map(pta => {
			const attribute = existingProductVariants[0].attributes.find(a => a.id === pta.attributeId);
			return {
				id: pta.id,
				attributeName: attribute?.name || {},
				attributeId: pta.attributeId,
			};
		});
	}, [existingProductVariants, productType]);

	async function onCreateProduct() {
		if ( !isReadyToSubmit || !productType ) {
			toast.error(getAdminTranslation(STRINGS.FILL_ALL_FIELDS));
			return;
		}
		if ( !isEditing ) {
			const createdProduct = await createProductMutation.mutateAsync({
				createProductDto,
			});
			if ( !productType.hasVariants ) {
				await createProductVariationMutation.mutateAsync({
					productId: createdProduct.id,
					createProductVariantDto: defaultVariant,
				});
				toast.success([getAdminTranslation(STRINGS.PRODUCT), getAdminTranslation(STRINGS.CREATED)].join(' '));
				await router.push(NIMA_ROUTES.products.edit(createdProduct.id));

			} else {
				toast.success([getAdminTranslation(STRINGS.PRODUCT), getAdminTranslation(STRINGS.CREATED)].join(' '));
				await router.push(NIMA_ROUTES.products.createVariant(createdProduct.id));
			}
		} else {
			await updateProductMutation.mutateAsync({
				productId: id,
				createProductDto,
			});
			if ( !productType.hasVariants ) {
				await updateProductVariationMutation.mutateAsync({
					id: existingProductVariants[0].id,
					productId: id,
					createProductVariantDto: defaultVariant,
				});
			}

			toast.success([getAdminTranslation(STRINGS.PRODUCT), getAdminTranslation(STRINGS.UPDATED)].join(' '));

		}
	}

	async function onDeleteProduct() {
		if ( !id || !existingProduct ) return;
		const confirm = window.confirm(getAdminTranslation(STRINGS.ARE_YOU_SURE_DELETE(getTranslation(existingProduct.name, languages.adminLanguage))));
		if ( confirm ) {
			await deleteProductMutation.mutateAsync({
				productId: id,
			});
			toast.success([getAdminTranslation(STRINGS.PRODUCT), getAdminTranslation(STRINGS.DELETED)].join(' '));
			await router.push(NIMA_ROUTES.products.list);
		}
	}


	function onValueEdit(name: keyof CreateProductDto, value: any) {
		setCreateProductDto(state => ({
			...state,
			[name]: value,
		}));
	}


	function onDescriptionEdit(html: string, raw: any) {
		setCreateProductDto(state => ({
			...state,
			description: {
				...state.description,
				[languages.currentEditingLanguage]: html,
			},
			descriptionRaw: {
				...state.descriptionRaw,
				[languages.currentEditingLanguage]: raw,
			},
		}));
	}

	function onShortDescriptionEdit(html: string, raw: any) {
		setCreateProductDto(state => ({
			...state,
			additionalDescription: {
				...state.additionalDescription,
				[languages.currentEditingLanguage]: html,
			},
			additionalDescriptionRaw: {
				...state.additionalDescriptionRaw,
				[languages.currentEditingLanguage]: raw,
			},
		}));
	}

	function onVariantValueEdit(name: keyof CreateProductVariantDto, value: any) {
		setDefaultVariant(state => ({
			...state,
			[name]: value,
		}));
	}

	function onAttributeChange(productAttributeValue: CreateAssignedProductAttributeDto) {
		setCreateProductDto(state => {
			const attribute = state.attributes.find(att => att.productTypeAttributeId === productAttributeValue.productTypeAttributeId);
			if ( !attribute ) return state;
			attribute.values = productAttributeValue.values;
			return {
				...state,
			};
		});
	}

	return (
		<>
			<NimaTitle title={ title }/>
			<AdminPage
				label={ title }
				footerContainer={ <AdminFooter>
					<Link href={ NIMA_ROUTES.products.list }>
						<a className={ 'btn btn-secondary' }>{ getAdminTranslation(STRINGS.BACK) }</a>
					</Link>

					{ existingProduct && <button className="btn btn-error"
												 onClick={ onDeleteProduct }>
						<Trans>{ STRINGS.DELETE }</Trans>
					</button> }

					<button className="btn btn-success"
							disabled={ !isReadyToSubmit }
							onClick={ onCreateProduct }>
						<Trans>{ isEditing ? STRINGS.UPDATE : STRINGS.SAVE }</Trans>
					</button>
				</AdminFooter> }
			>
				<AdminColumn>
					<AdminSection title={ getAdminTranslation(STRINGS.GENERAL_INFO) }
								  titleRightContainer={ <SelectEditingLanguage/> }>
						<label className="label">
							<span className="label-text"><Trans>{ STRINGS.NAME }</Trans> </span>
						</label>
						<TranslatableInput className={ 'input w-full max-w-xs input-bordered' }
										   name="name"
										   value={ createProductDto.name }
										   onChange={ (value) => onValueEdit('name', value) }
						/>

						<div>
							<label className="label">
							<span
								className="label-text"><Trans>{ STRINGS.DESCRIPTION }</Trans> ({ languages.currentEditingLanguage.toUpperCase() })</span>
							</label>
							{ createProductDto.descriptionRaw && <RichTextInput
								name={ 'description' }
								key={ languages.currentEditingLanguage + createProductDto?.name[languages.currentEditingLanguage] }
								init={ createProductDto.descriptionRaw[languages.currentEditingLanguage] }
								onChange={ (html, raw) => {
									onDescriptionEdit(html, raw);
								} }/> }
						</div>
						<div>
							<label className="label">
							<span
								className="label-text"><Trans>{ STRINGS.SHORT_DESCRIPTION }</Trans> ({ languages.currentEditingLanguage.toUpperCase() })</span>
							</label>
							{ createProductDto.additionalDescriptionRaw && <RichTextInput
								name={ 'additionalDescription' }
								key={ languages.currentEditingLanguage + createProductDto?.name[languages.currentEditingLanguage] }
								init={ createProductDto.additionalDescriptionRaw[languages.currentEditingLanguage] }
								onChange={ (html, raw) => {
									onShortDescriptionEdit(html, raw);
								} }/> }
						</div>
						<div className="form-control w-full max-w-xs">
							<label className="label">
								<span className="label-text"><Trans>{ STRINGS.SLUG }</Trans></span>
								{ !isEditing &&
									<span
										className="label-text-alt"><Trans>{ STRINGS.LEAVE_EMPTY_FOR_DEFAULT }</Trans></span> }
							</label>
							<input className={ 'input w-full max-w-xs input-bordered' }
								   type="text"
								   name="name"
								   value={ createProductDto.slug }
								   placeholder={ getSlug(createProductDto.name.en || '') }
								   onChange={ (e) => onValueEdit('slug', e.target.value) }
							/>
						</div>

						<label className="label cursor-pointer justify-start gap-3">
							<input type="checkbox" className="checkbox" checked={ !createProductDto.isPublished }
								   onChange={ (e) => onValueEdit('isPublished', !e.target.checked) }/>
							<span className="label-text"><Trans>{ STRINGS.DRAFT }</Trans></span>
						</label>

					</AdminSection>
					{ createProductDto.attributes.length > 0 &&
						<AdminSection title={ getAdminTranslation(STRINGS.ATTRIBUTES) }
									  subtitle={ createProductDto.attributes.length + ' ' + getAdminTranslation(STRINGS.ATTRIBUTES).toLowerCase() }>
							{ createProductDto.attributes.map(productAttributeValue => <EditProductAttribute
								key={ productAttributeValue.productTypeAttributeId }
								productTypeId={ createProductDto.productTypeId }
								onSelect={ onAttributeChange }
								productAttributeValue={ productAttributeValue }/>) }
						</AdminSection>
					}

					{ (productType && !productType?.hasVariants) &&
						<>
							<EditVariantInformation state={ defaultVariant } onValueEdit={ onVariantValueEdit }/>
						</>
					}

					{ (productType && productType?.hasVariants && isEditing) &&
						<AdminSection title={ getAdminTranslation(STRINGS.VARIANTS) }
									  subtitle={ (existingProductVariants?.length || 0) + ' ' + getAdminTranslation(STRINGS.VARIANTS) }
									  titleRightContainer={ <>
										  <Link
											  href={ NIMA_ROUTES.products.createVariant(existingProduct?.id || -1) }>
											  <button className="btn btn-success">
												  <Trans>{ STRINGS.CREATE_NEW_VARIANT }</Trans>
											  </button>
										  </Link>
									  </> }
						>
							<table className="table w-full">
								<thead>
								<tr>
									<th>ID</th>
									<th><Trans>{ STRINGS.NAME }</Trans></th>
									{ variantsHeaders.map(vh => <th key={ vh.id }>
										<Trans>{ vh.attributeName }</Trans></th>) }
									<th><Trans>{ STRINGS.STOCK }</Trans></th>
									<th><Trans>{ STRINGS.PRICE }</Trans></th>
									<th><Trans>{ STRINGS.ACTIONS }</Trans></th>
								</tr>
								</thead>
								<tbody>
								{ (existingProductVariants || []).map(variant => <tr key={ variant.id }>
									<td>{ variant.id }</td>
									<td><Trans>{ variant.name }</Trans></td>
									{ variantsHeaders.map(vh => {
										const value = variant.attributes.find(a => a.id === vh.attributeId);
										return <td key={ vh.id }>
											<Trans>{ (value.values.map(v => v.slug).join(' ') || '') + '' }</Trans>
										</td>;
									}) }
									<td><StockBadge productVariant={ variant }/></td>
									<td>{ getEuroValue(variant.priceAmount) }</td>
									<td>
										<Link href={ NIMA_ROUTES.products.editVariant(id, variant.id) }>
											<button className={ 'btn btn-primary' }><Trans>{ STRINGS.EDIT }</Trans>
											</button>
										</Link>
									</td>
								</tr>) }

								</tbody>
							</table>

						</AdminSection>
					}

					<MediaSelectorSection
						isMulti
						sortableMedia={ createProductDto.productMedia }
						onSelect={ (media) => onValueEdit('productMedia', media) }
					/>

					<MetadataEditor values={ createProductDto.metadata as Metadata }
									onChange={ (v => onValueEdit('metadata', v)) }/>
					<MetadataEditor isPrivate values={ createProductDto.privateMetadata as Metadata }
									onChange={ (v => onValueEdit('privateMetadata', v)) }/>


				</AdminColumn>
				<AdminColumn>
					<AdminSection title={ getAdminTranslation(STRINGS.ORGANIZE_PRODUCT) }>
						<div>
							<label className="label">
								<span className="label-text"><Trans>{ STRINGS.PRODUCT_TYPE }</Trans></span>
							</label>
							<select className="select select-bordered w-full max-w-xs"
									disabled={ isEditing }
									onChange={ (e) => {
										onValueEdit('productTypeId', +e.target.value);
									} }
									value={ createProductDto.productTypeId }
							>
								<option disabled value={ 0 }>Select Type</option>
								{ productTypes && productTypes
									.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
									.map((type) => {
										return <option
											key={ type.id }
											value={ type.id }>
											{ type.name }
										</option>;
									}) }
							</select>
						</div>
						<div>
							<label className="label">
								<span className="label-text"><Trans>{ STRINGS.CATEGORIES }</Trans></span>
							</label>
							<CategoriesSelect
								selectedId={ createProductDto.categoryId }
								onChange={ (id) => onValueEdit('categoryId', id) }
							/>
						</div>
						<div>
							<label className="label">
								<span className="label-text"><Trans>{ STRINGS.COLLECTIONS }</Trans></span>
							</label>
							<CollectionSelect
								selectedIds={ createProductDto.collectionIds }
								onChange={ (ids) => onValueEdit('collectionIds', ids) }
							/>
						</div>
					</AdminSection>
				</AdminColumn>

			</AdminPage>
		</>
	);
}
