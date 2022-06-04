import {
	Trans,
	useAttributes,
	useCreateProductTypeMutation,
	useProductTypeId,
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

interface AddProductTypeProps {

}

export default function AddProductType(props: AddProductTypeProps) {
	const router = useRouter();
	const id: number | undefined = router.query['id'] ? parseIdStr(router.query['id']) : undefined;
	const isEditing = !!id;

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
				toast.success('Product Type Created!');
				await router.push(NIMA_ROUTES.productTypes.list);
			} catch ( e: any ) {
				console.log(e);
			}
		} else {
			const updatedProductType = await updateProductTypeMutation.mutateAsync({
				productTypeId: id,
				createProductTypeDto: createProductTypeDto,
			});
			toast.success('Product Type Updated!');
		}
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
			<NimaTitle title={ isEditing ? 'Update Product Type' : 'Create Product Type' }/>
			<AdminPage
				label={ isEditing ? 'Update Product Type' : 'Create New Product Type' }
				footerContainer={ <AdminFooter>
					<Link href={ NIMA_ROUTES.productTypes.list }>
						<button className={ 'btn btn-secondary' }>Back</button>
					</Link>

					<button className="btn btn-success"
							onClick={ onCreateProductType }>{ isEditing ? 'Save' : 'Create' }</button>
				</AdminFooter> }
			>
				<AdminColumn>
					<AdminSection title={ 'General Information' }>
						<label className="label">
							<span className="label-text">Name</span>
						</label>
						<input className={ 'input w-full max-w-xs input-bordered' }
							   type="text"
							   name="name"
							   value={ createProductTypeDto.name }
							   placeholder={ 'Pants' }
							   onChange={ (e) => onValueEdit('name', e.target.value) }
						/>

					</AdminSection>

					<AdminSection title={ 'Attributes' }
								  titleRightContainer={ <AvailableAttributesModal
									  availableAttributes={ availableAttributes }
									  onNewAttributes={ (newAttributesIds) => onAddAttributes(newAttributesIds, false) }
									  id={ 'attributes-modal' }/> }>
						<div className="overflow-x-auto">
							<table className="table table-zebra w-full">
								<thead>
								<tr>
									<th>Name</th>
									<th>Action</th>
								</tr>
								</thead>
								<tbody>
								{ createProductTypeDto.attributes.map(attribute => {
									const att = attributes?.find(a => a.id === attribute.attributeId);
									if ( !att ) return;
									return <tr key={ attribute.attributeId }>
										<th>
											<Trans>{ att.name }</Trans> ({ att.slug })
										</th>
										<th>
											<button className={ 'btn btn-error' }
													onClick={ () => onRemoveAttribute(attribute.attributeId, false) }>
												Remove
											</button>
										</th>
									</tr>;
								}) }

								</tbody>
							</table>
						</div>
					</AdminSection>

					<AdminSection title={ 'Variation Attributes' }
								  titleRightContainer={ <AvailableAttributesModal
									  availableAttributes={ availableAttributes }
									  onNewAttributes={ (newAttributesIds) => onAddAttributes(newAttributesIds, true) }
									  id={ 'variant-attributes-modal' }/> }>
						<div className="overflow-x-auto">
							<table className="table table-zebra w-full">
								<thead>
								<tr>
									<th>Name</th>
									<th>Used in Variant Selection</th>
									<th>Action</th>
								</tr>
								</thead>
								<tbody>
								{ createProductTypeDto.variantAttributes.map(attribute => {
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
											<button className={ 'btn btn-error' }
													onClick={ () => onRemoveAttribute(attribute.attributeId, true) }>
												Remove
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
			<SVGPlus width={ '20' } height={ '20' }/> Add Attributes</label>

		<input type="checkbox" id={ props.id } className="modal-toggle"/>
		<div className="modal">
			<div className="modal-box relative">
				<label htmlFor={ props.id } className="btn btn-sm btn-circle absolute right-2 top-2"
					   onClick={ init }>✕</label>
				<h3 className="text-lg font-bold">Select all the attributes to add</h3>
				{ props.availableAttributes.map(att => <div className="form-control" key={ att.id }>
					<label className="label cursor-pointer">
						<span className="label-text"><Trans>{ att.name }</Trans> ({ att.slug })</span>
						<input type="checkbox" checked={ checkedMap[att.id] } className="checkbox"
							   onChange={ () => onChange(att.id) }/>
					</label>
				</div>) }
				<div className={ 'flex justify-end' }>
					<label className={ 'btn btn-primary' } htmlFor={ props.id } onClick={ onSave }>Add</label>
				</div>
			</div>
		</div>

	</>;
}
