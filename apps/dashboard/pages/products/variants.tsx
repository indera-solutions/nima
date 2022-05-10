import {
	useCreateProductVariationMutation,
	useProductById,
	useProductTypeId,
	useProductVariantById,
	useUpdateProductVariationMutation,
} from '@nima/react';
import { CreateAssignedProductVariantAttributeDto, CreateProductVariantDto } from '@nima/sdk';
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
	MediaSelectorSection,
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
	const variantId = router.query['variantId'] ? parseIdStr(router.query['variantId']) : undefined;
	const isEditing = !!variantId;

	const { data: product } = useProductById(productId);
	const { data: productType } = useProductTypeId(product?.productTypeId);

	const { data: existingVariation } = useProductVariantById(productId, variantId, { refetchInterval: false });


	const createProductVariationMutation = useCreateProductVariationMutation();
	const updateProductVariationMutation = useUpdateProductVariationMutation();


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
			productMedia: [],
		},
	);


	useEffect(() => {
		if ( isEditing ) return;
		if ( !productType ) return;
		setCreateProductVariation(state => ({
			...state,
			attributes: productType.variantAttributes.map(att => ({
				productTypeVariantAttributeId: att.id,
				values: [],
			})),

		}));
	}, [productType]);

	useEffect(() => {
		if ( !existingVariation ) return;
		const { id, attributes, updatedAt, productMedia, created, ...rest } = existingVariation;
		setCreateProductVariation({
			...rest,
			productMedia: productMedia.map(pm => ({ mediaId: pm.media.id, sortOrder: pm.sortOrder })),
			attributes: productType ? attributes.map(att => {
				const pta = productType.variantAttributes.find(a => a.attributeId === att.id);
				if ( !pta ) throw new Error('att not found');
				return {
					productTypeVariantAttributeId: pta.id,
					values: att.values.map((v, index) => ({
						valueId: v.id,
						sortOrder: v.sortOrder || index,
					})),
				};
			}) : [],
		});
	}, [existingVariation, productType]);


	const variationAttributes = productType?.variantAttributes.filter(va => !va.variantSelection) || [];
	const selectionAttributes = productType?.variantAttributes.filter(va => va.variantSelection) || [];


	function onAttributeChange(productAttributeValue: CreateAssignedProductVariantAttributeDto) {
		setCreateProductVariation(state => {
			const attribute = state.attributes.find(att => att.productTypeVariantAttributeId === productAttributeValue.productTypeVariantAttributeId);
			if ( !attribute ) return { ...state };
			attribute.values = productAttributeValue.values;
			return {
				...state,
			};
		});
	}

	async function onCreateVariant() {
		if ( isEditing ) {
			await updateProductVariationMutation.mutateAsync({
				createProductVariantDto: createProductVariation,
				productId,
				id: variantId,
			});
			toast.success('Variation Updated');

		} else {
			if ( !productId ) throw new Error('Invalid Product id');
			const createdProductVariant = await createProductVariationMutation.mutateAsync({
				productId: productId || 0,
				createProductVariantDto: createProductVariation,
			});
			toast.success('Variation Created');
			await router.push(NIMA_ROUTES.products.edit(productId));
		}
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

					<MediaSelectorSection
						isMulti
						sortableMedia={ createProductVariation.productMedia }
						onSelect={ (media) => onValueEdit('productMedia', media) }
					/>

					<MetadataEditor values={ createProductVariation.metadata as Metadata }
									onChange={ (value) => onValueEdit('metadata', value) }/>
					<MetadataEditor values={ createProductVariation.privateMetadata as Metadata }
									onChange={ (value) => onValueEdit('privateMetadata', value) } isPrivate/>
				</AdminColumn>
			</AdminPage>
		</>
	);
}
