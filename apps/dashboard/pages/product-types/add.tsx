import {
	Trans,
	useAttributes,
	useCreateProductTypeMutation,
	useProductTypeId, useTranslations,
	useUpdateProductTypeMutation,
} from '@nima-cms/react';
import { AttributeDto, CreateProductTypeDto } from '@nima-cms/sdk';
import { Metadata, parseIdStr } from '@nima-cms/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Attributes, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { SVGPlus } from '../../assets/SVGIcons';
import { AdminColumn, AdminFooter, AdminPage, AdminSection, MetadataEditor, NimaTitle } from '../../components';
import { NIMA_ROUTES } from '../../lib/routes';
import { STRINGS } from '../../strings/strings';

interface AddProductTypeProps {

}

export default function AddProductType(props: AddProductTypeProps) {
	const router = useRouter();
	const id: number | undefined = router.query['id'] ? parseIdStr(router.query['id']) : undefined;
	const isEditing = !!id;
	const { getAdminTranslation } = useTranslations();

	const [createProductTypeDto, setCreateProductTypeDto] = useState<CreateProductTypeDto>({
		name: '',
		slug: '',
		metadata: {},
		privateMetadata: {},
		attributes: [],
		variantAttributes: [],
		isDigital: false,
		isShippingRequired: false,
		weight: 0,
	});

	const { data: existingProductType } = useProductTypeId(id, { refetchInterval: false });
	const { data: attributes } = useAttributes();

	const availableAttributes: AttributeDto[] = useMemo(() => {
		if ( !attributes ) return [];
		const existingIds = [...createProductTypeDto.attributes.map(a => a.attributeId), ...createProductTypeDto.variantAttributes.map(a => a.attributeId)];
		return attributes.filter(a => !existingIds.includes(a.id));
	}, [attributes, createProductTypeDto.attributes, createProductTypeDto.variantAttributes]);

	const createProductTypeMutation = useCreateProductTypeMutation();
	const updateProductTypeMutation = useUpdateProductTypeMutation();


	useEffect(() => {
		if ( !existingProductType ) return;
		const { id, hasVariants, ...rest } = existingProductType;
		setCreateProductTypeDto(rest);
	}, [existingProductType]);


	function onValueEdit(name: keyof CreateProductTypeDto, value: any) {
		setCreateProductTypeDto(state => ({
			...state,
			[name]: value,
		}));
	}

	async function onCreateProductType() {

		if ( !isEditing ) {
			try {
				const createdProductType = await createProductTypeMutation.mutateAsync({ createProductTypeDto });
				toast.success([getAdminTranslation(STRINGS.PRODUCT_TYPE), getAdminTranslation(STRINGS.CREATED)].join(' '));
				await router.push(NIMA_ROUTES.productTypes.list);
			} catch ( e: any ) {
				console.log(e);
			}
		} else {
			const updatedProductType = await updateProductTypeMutation.mutateAsync({
				productTypeId: id,
				createProductTypeDto: createProductTypeDto,
			});
			toast.success([getAdminTranslation(STRINGS.PRODUCT_TYPE), getAdminTranslation(STRINGS.UPDATED)].join(' '));
		}
	}

	function onVariantChangeOrder(attribute, newOrder) {
		setCreateProductTypeDto(state => {
			const temp = { ...state };
			temp.variantAttributes[temp.variantAttributes.indexOf(attribute)].sortOrder = newOrder;
			return temp;
		});
	}

	function onAttributeChangeOrder(attribute, newOrder) {
		setCreateProductTypeDto(state => {
			const temp = { ...state };
			temp.attributes[temp.attributes.indexOf(attribute)].sortOrder = newOrder;
			return temp;
		});
	}

	function onVariantSelectionToggle(attributeId: number) {
		setCreateProductTypeDto(state => {
			const temp = { ...state };
			const index = temp.variantAttributes.findIndex(att => att.attributeId === attributeId);
			temp.variantAttributes[index].variantSelection = !temp.variantAttributes[index].variantSelection;
			return temp;
		});
	}

	function onAddAttributes(newAttributesIds: number[], isVariant: boolean) {
		setCreateProductTypeDto(state => {
			const temp = { ...state };
			for ( const id of newAttributesIds ) {
				if ( isVariant ) {
					temp.variantAttributes.push({
						id: undefined,
						attributeId: id,
						variantSelection: false,
						sortOrder: temp.variantAttributes.length,
					});
				} else {
					temp.attributes.push({
						id: undefined,
						attributeId: id,
						sortOrder: temp.attributes.length,
					});
				}
			}
			if ( isVariant ) {
				temp.variantAttributes = [...temp.variantAttributes];
			} else {
				temp.attributes = [...temp.attributes];
			}
			return temp;
		});
	}

	function onRemoveAttribute(attributeId: number, isVariant: boolean) {
		setCreateProductTypeDto(state => {
			const temp = { ...state };
			if ( isVariant ) {
				const index = temp.variantAttributes.findIndex(att => att.attributeId === attributeId);
				temp.variantAttributes.splice(index, 1);
				temp.variantAttributes = [...temp.variantAttributes];
			} else {
				const index = temp.attributes.findIndex(att => att.attributeId === attributeId);
				temp.attributes.splice(index, 1);
				temp.attributes = [...temp.attributes];
			}
			return temp;
		});
	}

	return (
		<>
			<NimaTitle
				title={ isEditing ? getAdminTranslation(STRINGS.PRODUCT_TYPE_UPDATE_TITLE) : getAdminTranslation(STRINGS.PRODUCT_TYPE_CREATE_TITLE) }
			/>
			<AdminPage
				label={  isEditing ? getAdminTranslation(STRINGS.PRODUCT_TYPE_UPDATE_TITLE) : getAdminTranslation(STRINGS.PRODUCT_TYPE_CREATE_TITLE) }
				footerContainer={ <AdminFooter>
					<Link href={ NIMA_ROUTES.productTypes.list }>
						<button className={ 'btn btn-secondary' }><Trans>{STRINGS.BACK}</Trans></button>
					</Link>

					<button className="btn btn-success"
							onClick={ onCreateProductType }><Trans>{ isEditing ? STRINGS.SAVE : STRINGS.CREATE }</Trans></button>
				</AdminFooter> }
			>
				<AdminColumn>
					<AdminSection title={ getAdminTranslation(STRINGS.GENERAL_INFO) }>
						<label className="label">
							<span className="label-text"><Trans>{STRINGS.NAME}</Trans></span>
						</label>
						<input className={ 'input w-full max-w-xs input-bordered' }
							   type="text"
							   name="name"
							   value={ createProductTypeDto.name }
							   placeholder={ 'e.g., Pants' }
							   onChange={ (e) => onValueEdit('name', e.target.value) }
						/>

					</AdminSection>

					<AdminSection title={ getAdminTranslation(STRINGS.ATTRIBUTES) }
								  titleRightContainer={ <AvailableAttributesModal
									  availableAttributes={ availableAttributes }
									  onNewAttributes={ (newAttributesIds) => onAddAttributes(newAttributesIds, false) }
									  id={ 'attributes-modal' }/> }>
						<div className="overflow-x-auto">
							<table className="table table-zebra w-full">
								<thead>
								<tr>
									<th><Trans caps>{STRINGS.NAME}</Trans></th>
									<th><Trans caps>{STRINGS.ORDER}</Trans></th>
									<th><Trans caps>{STRINGS.ACTION}</Trans></th>
								</tr>
								</thead>
								<tbody>
								{ createProductTypeDto.attributes.sort((a, b) => a.sortOrder - b.sortOrder).map(attribute => {
									const att = attributes?.find(a => a.id === attribute.attributeId);
									if ( !att ) return;
									return <tr key={ attribute.attributeId }>
										<th>
											<Trans>{ att.name }</Trans> ({ att.slug })
										</th>
										<th>
											<input type="number"
												   value={ attribute.sortOrder }
												   onChange={ (e) => onAttributeChangeOrder(attribute, +e.target.value) }
												   className="input input-border"/>
										</th>
										<th>
											<button className={ 'btn btn-error' }
													onClick={ () => onRemoveAttribute(attribute.attributeId, false) }>
												<Trans>{STRINGS.REMOVE}</Trans>
											</button>
										</th>
									</tr>;
								}) }

								</tbody>
							</table>
						</div>
					</AdminSection>

					<AdminSection title={ getAdminTranslation(STRINGS.VARIATION_ATTRIBUTES) }
								  titleRightContainer={ <AvailableAttributesModal
									  availableAttributes={ availableAttributes }
									  onNewAttributes={ (newAttributesIds) => onAddAttributes(newAttributesIds, true) }
									  id={ 'variant-attributes-modal' }/> }>
						<div className="overflow-x-auto">
							<table className="table table-zebra w-full">
								<thead>
								<tr>
									<th><Trans caps>{STRINGS.NAME}</Trans></th>
									<th><Trans caps>{STRINGS.USED_IN_VARIANT_SELECTION}</Trans></th>
									<th><Trans caps>{STRINGS.ORDER}</Trans></th>
									<th><Trans caps>{STRINGS.ACTION}</Trans></th>
								</tr>
								</thead>
								<tbody>
								{ createProductTypeDto.variantAttributes.sort((a, b) => a.sortOrder - b.sortOrder).map(attribute => {
									const att = attributes?.find(a => a.id === attribute.attributeId);
									if ( !att ) return;
									return <tr
										key={ attribute.attributeId }>
										<th>
											<Trans>{ att.name || '' }</Trans> ({ att.slug })
										</th>
										<th>
											<input type="checkbox"
												   checked={ attribute.variantSelection }
												   onChange={ () => onVariantSelectionToggle(attribute.attributeId) }
												   className="checkbox"/>
										</th>
										<th>
											<input type="number"
												   value={ attribute.sortOrder }
												   onChange={ (e) => onVariantChangeOrder(attribute, +e.target.value) }
												   className="input input-border"/>
										</th>
										<th>
											<button className={ 'btn btn-error' }
													onClick={ () => onRemoveAttribute(attribute.attributeId, true) }>
												<Trans>{STRINGS.REMOVE}</Trans>
											</button>
										</th>
									</tr>;
								}) }

								</tbody>
							</table>
						</div>
					</AdminSection>


					<MetadataEditor values={ createProductTypeDto.metadata as Metadata }
									onChange={ (v => onValueEdit('metadata', v)) }/>
					<MetadataEditor isPrivate values={ createProductTypeDto.privateMetadata as Metadata }
									onChange={ (v => onValueEdit('privateMetadata', v)) }/>
				</AdminColumn>
			</AdminPage>
		</>
	);
}


function AvailableAttributesModal(props: { id: string, availableAttributes: AttributeDto[], onNewAttributes: (newAttributesIds: number[]) => void }) {

	const [checkedMap, setCheckedMap] = useState<{ [T: number]: boolean }>({});
	useEffect(() => {
		init();
	}, [props.availableAttributes]);

	function init() {
		const temp = {};
		props.availableAttributes.forEach(att => {
			temp[att.id] = false;
		});
		setCheckedMap(temp);
	}

	function onChange(id: number) {
		setCheckedMap(state => {
			const temp = { ...state };
			temp[id] = !temp[id];
			return temp;
		});
	}

	function onSave() {
		const ids = Object.keys(checkedMap).filter(id => checkedMap[id]).map(id => +id);
		props.onNewAttributes(ids);
	}

	return <>
		<label htmlFor={ props.id }
			   className={ 'btn btn-primary  gap-2 modal-button ' + (props.availableAttributes.length === 0 ? 'btn-disabled ' : '') }>
			<SVGPlus width={ '20' } height={ '20' }/><Trans>{STRINGS.ADD_ATTRIBUTES}</Trans></label>

		<input type="checkbox" id={ props.id } className="modal-toggle"/>
		<div className="modal">
			<div className="modal-box relative">
				<label htmlFor={ props.id } className="btn btn-sm btn-circle absolute right-2 top-2"
					   onClick={ init }>✕</label>
				<h3 className="text-lg font-bold"><Trans>{STRINGS.SELECT_ALL_ATTRIBUTES}</Trans></h3>
				{ props.availableAttributes.map(att => <div className="form-control" key={ att.id }>
					<label className="label cursor-pointer">
						<span className="label-text"><Trans>{ att.name }</Trans> ({ att.slug })</span>
						<input type="checkbox" checked={ checkedMap[att.id] } className="checkbox"
							   onChange={ () => onChange(att.id) }/>
					</label>
				</div>) }
				<div className={ 'flex justify-end' }>
					<label className={ 'btn btn-primary' } htmlFor={ props.id } onClick={ onSave }><Trans>{STRINGS.ADD}</Trans></label>
				</div>
			</div>
		</div>

	</>;
}
