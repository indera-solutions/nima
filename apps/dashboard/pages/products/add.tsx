import { getTranslation, useCategories, useLanguages, useProductTypeId, useProductTypes } from '@nima/react';
import { CreateAssignedProductAttributeDto, CreateProductDto } from '@nima/sdk';
import { getSlug, Metadata, parseIdStr } from '@nima/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useCreateProductMutation } from '../../../../libs/react/src/reactQuery/products.queries';
import {
	AdminColumn,
	AdminFooter,
	AdminPage,
	AdminSection,
	MetadataEditor,
	NimaTitle,
	SelectEditingLanguage,
	TranslatableInput,
} from '../../components';
import { EditProductAttribute } from '../../components/products';
import { NIMA_ROUTES } from '../../lib/routes';

interface AddProps {

}

export default function Add(props: AddProps) {

	const router = useRouter();
	const languages = useLanguages();
	const id: number | undefined = router.query['id'] ? parseIdStr(router.query['id']) : undefined;
	const isEditing = !!id;

	const createProductMutation = useCreateProductMutation();


	const [createProductDto, setCreateProductDto] = useState<CreateProductDto>({
		name: {},
		attributes: [],
		categoryId: 0,
		chargeTaxes: false,
		currency: 'EUR',
		description: {},
		descriptionPlaintext: '',
		isAvailableForPurchase: true,
		isPublished: true,
		isVisibleInListings: true,
		metadata: {},
		minPrice: 0,
		privateMetadata: {},
		productTypeId: 3,  //TODO replace with 0
		rating: 0,
		searchDocument: '',
		seoDescription: '',
		slug: '',
		seoTitle: '',
		weight: 0,
	});

	const { data: productTypes } = useProductTypes();
	const { data: categories } = useCategories();
	const { data: productType } = useProductTypeId(createProductDto.productTypeId);

	useEffect(() => {
		if ( !productType ) return;
		setCreateProductDto(state => ({
			...state,
			attributes: productType.attributes.map(att => ({
				productTypeAttributeId: att.id,
				values: [],
			})),
		}));
	}, [productType]);

	async function onCreateProduct() {
		if ( !isEditing ) {
			const createdProduct = await createProductMutation.mutateAsync({
				createProductDto,
			});
			toast.success('Product Created.');
		}
	}

	function onValueEdit(name: keyof CreateProductDto, value: any) {
		setCreateProductDto(state => ({
			...state,
			[name]: value,
		}));
	}

	function onAttributeChange(productAttributeValue: CreateAssignedProductAttributeDto) {
		console.log('productAttributeValue', productAttributeValue);
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
			<NimaTitle
				title={ isEditing ? `Update` : 'Create Product' }/>
			<AdminPage
				label={ isEditing ? `Update` : 'Create New Product' }
				footerContainer={ <AdminFooter>
					<Link href={ NIMA_ROUTES.products.list }>
						<button className={ 'btn btn-secondary' }>Back</button>
					</Link>

					<button className="btn btn-success"
							onClick={ onCreateProduct }>{ isEditing ? 'Save' : 'Create' }</button>
				</AdminFooter> }
			>
				<AdminColumn>
					<AdminSection title={ 'General Information' } titleRightContainer={ <SelectEditingLanguage/> }>
						{ JSON.stringify(createProductDto) }
						<label className="label">
							<span className="label-text">Name</span>
						</label>
						<TranslatableInput className={ 'input w-full max-w-xs input-bordered' }
										   name="name"
										   value={ createProductDto.name }
										   onChange={ (value) => onValueEdit('name', value) }
						/>

						<label className="label">
							<span className="label-text">Description</span>
						</label>
						<TranslatableInput className={ 'input w-full max-w-xs input-bordered' }
										   name="name"
										   value={ createProductDto.description }
										   onChange={ (value) => onValueEdit('description', value) }
						/>
						<div className="form-control w-full max-w-xs">
							<label className="label">
								<span className="label-text">Slug</span>
								{ !isEditing &&
									<span className="label-text-alt">Leave empty to generate default</span> }
							</label>
							<input className={ 'input w-full max-w-xs input-bordered' }
								   type="text"
								   name="name"
								   value={ createProductDto.slug }
								   placeholder={ getSlug(createProductDto.name.en || '') }
								   onChange={ (e) => onValueEdit('slug', e.target.value) }
							/>
						</div>

					</AdminSection>
					{ createProductDto.attributes.length > 0 &&
						<AdminSection title={ 'Attributes' }
									  subtitle={ createProductDto.attributes.length + ' attributes' }>
							{/*{JSON.stringify(productAttributeValues)}*/ }
							{ createProductDto.attributes.map(productAttributeValue => <EditProductAttribute
								key={ productAttributeValue.productTypeAttributeId }
								productTypeId={ createProductDto.productTypeId }
								onSelect={ onAttributeChange }
								productAttributeValue={ productAttributeValue }/>) }
						</AdminSection>
					}
					<MetadataEditor values={ createProductDto.metadata as Metadata }
									onChange={ (v => onValueEdit('metadata', v)) }/>
					<MetadataEditor isPrivate values={ createProductDto.privateMetadata as Metadata }
									onChange={ (v => onValueEdit('privateMetadata', v)) }/>


				</AdminColumn>
				<AdminColumn>
					<AdminSection title={ 'Organize Product' }>
						<div>
							<label className="label">
								<span className="label-text">Product Type</span>
							</label>
							<select className="select select-bordered w-full max-w-xs"
									onChange={ (e) => {
										onValueEdit('productTypeId', +e.target.value);
									} }
									value={ createProductDto.productTypeId }
							>
								<option disabled value={ 0 }>Select Type</option>
								{ productTypes && productTypes.map((type) => {
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
								<span className="label-text">Categories</span>
							</label>
							<select className="select select-bordered w-full max-w-xs"
									onChange={ (e) => {
										onValueEdit('categoryId', +e.target.value);
									} }
									value={ createProductDto.categoryId }

							>
								<option disabled value={ 0 }>Select Category</option>
								{ categories && categories.map((category) => {
									return <option
										key={ category.id }
										value={ category.id }
									>
										{ getTranslation(category.name, languages.adminLanguage) }
									</option>;
								}) }
							</select>
						</div>
					</AdminSection>
				</AdminColumn>

			</AdminPage>
		</>
	);
}
