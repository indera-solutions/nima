import { useCreateProductVariationMutation, useProductById, useProductTypeId } from '@nima/react';
import { CreateAssignedProductAttributeDto, CreateProductVariantDto } from '@nima/sdk';
import { Metadata, parseIdStr } from '@nima/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
	AdminColumn,
	AdminFooter,
	AdminPage,
	AdminSection,
	EditProductAttribute,
	EditVariantInformation,
	MetadataEditor,
	NimaTitle,
	SelectEditingLanguage,
	TranslatableInput,
} from '../../components';
import { NIMA_ROUTES } from '../../lib/routes';

interface VariantsProps {

}

export default function Variants(props: VariantsProps) {
	const router = useRouter();
	const productId = router.query['productId'] ? parseIdStr(router.query['productId']) : undefined;
	const { data: product } = useProductById(productId);
	const { data: productType } = useProductTypeId(product?.productTypeId);
	console.log(productType);

	// const { data: attributeTypes } = useProductTypeVariantAttributes(product?.productType?.id);
	// const [productAttributeValues, setProductAttributeValues] = useState<ProductAttributeValue[]>([]);

	const createProductVariationMutation = useCreateProductVariationMutation();
	// const addProductVariationAttributeValueMutation = useAddProductVariationAttributeValueMutation();

	const [createProductVariation, setCreateProductVariation] = useState<CreateProductVariantDto>({
			name: {},
			privateMetadata: {},
			attributes: [],
			currency: 'EUR',
			metadata: {},
			costPriceAmount: 0,
			isPreorder: false,
			sku: '',
			stock: 0,
			trackInventory: false,
		},
	);


	//
	// useEffect(() => {
	// 	if ( !attributeTypes ) return;
	// 	setProductAttributeValues(attributeTypes.map(pta => ({
	// 		productTypeAttributeId: pta.id,
	// 		attributeId: pta.attribute.id,
	// 		required: pta.attribute.valueRequired,
	// 		isVariantSelection: pta.variantSelection,
	// 	})));
	// }, [attributeTypes]);

	useEffect(() => {
		if ( !productType ) return;
		setCreateProductVariation(state => ({
			...state,
			attributes: productType.variantAttributes.map(att => ({
				productTypeVariantAttributeId: att.id,
				values: [],
			})),

		}));
	}, [productType]);


	const variationAttributes = productType?.variantAttributes.filter(va => !va.variantSelection) || [];
	const selectionAttributes = productType?.variantAttributes.filter(va => va.variantSelection) || [];


	function onAttributeChange(productAttributeValue: CreateAssignedProductAttributeDto) {
		setCreateProductVariation(state => {
			const attribute = state.attributes.find(att => att.productTypeVariantAttributeId === productAttributeValue.productTypeAttributeId);
			if ( !attribute ) return state;
			attribute.values = productAttributeValue.values;
			return {
				...state,
			};
		});
	}

	async function onCreateVariant() {
		// try {
		if ( !productId ) throw new Error('Invalid Product id');
		const createdProductVariant = await createProductVariationMutation.mutateAsync({
			productId: productId || 0,
			createProductVariantDto: createProductVariation,
		});
		toast.success('Variation Created');
		await router.push(NIMA_ROUTES.products.edit(productId));
	}

	function onValueEdit(name: keyof CreateProductVariantDto, value: any) {
		setCreateProductVariation(createProductVariation => ({
			...createProductVariation,
			[name]: value,
		}));
	}

	return (
		<>
			<NimaTitle
				title={ 'Add Variation' }/>
			<AdminPage
				// reverted
				label={ /*existingProductType ? 'Update ' + existingProductType :*/ 'Add Variation' }
				topRightContainer={ <div>
					<Link href={ NIMA_ROUTES.products.edit(productId) }>
						<button className={ 'btn btn-secondary' }>Back to product</button>
					</Link>
				</div> }
				footerContainer={ <AdminFooter>
					<Link href={ NIMA_ROUTES.products.edit(productId) }>
						<button className={ 'btn btn-secondary' }>Back to product</button>
					</Link>
					<button
						className={ 'btn btn-success ' + (createProductVariationMutation.isLoading ? 'loading' : '') }
						onClick={ onCreateVariant }>
						Save
					</button>
				</AdminFooter> }
			>

				<AdminColumn>
					<AdminSection title={ 'General Information' } titleRightContainer={ <SelectEditingLanguage/> }>
						<label className="label">
							<span className="label-text">Name</span>
						</label>
						<TranslatableInput className={ 'input w-full max-w-xs input-bordered' }
										   name="name"
										   value={ createProductVariation.name }
										   onChange={ (value) => onValueEdit('name', value) }
						/>
					</AdminSection>
					{ variationAttributes.length > 0 &&
						<AdminSection title={ 'Variation Attributes' }
									  subtitle={ variationAttributes.length + ' attributes' }>
							{ variationAttributes.map(productAttributeValue => <EditProductAttribute
								key={ productAttributeValue.attributeId }
								onSelect={ onAttributeChange }
								productTypeId={ productType?.id }
								isVariants
								productAttributeValue={ createProductVariation.attributes.find(a => a.productTypeVariantAttributeId === productAttributeValue.id) }/>) }
						</AdminSection>
					}

					{ selectionAttributes.length > 0 &&
						<AdminSection title={ 'Selection Attributes' }
									  subtitle={ selectionAttributes.length + ' attributes' }>
							{ selectionAttributes.map(productAttributeValue => <EditProductAttribute
								key={ productAttributeValue.attributeId }
								onSelect={ onAttributeChange }
								productTypeId={ productType?.id }
								isVariants
								productAttributeValue={ createProductVariation.attributes.find(a => a.productTypeVariantAttributeId === productAttributeValue.id) }/>) }
						</AdminSection>
					}

					<EditVariantInformation state={ createProductVariation } onValueEdit={ onValueEdit }/>

					<MetadataEditor values={ createProductVariation.metadata as Metadata }
									onChange={ (value) => onValueEdit('metadata', value) }/>
					<MetadataEditor values={ createProductVariation.privateMetadata as Metadata }
									onChange={ (value) => onValueEdit('privateMetadata', value) } isPrivate/>
				</AdminColumn>
			</AdminPage>
		</>
	);
}
