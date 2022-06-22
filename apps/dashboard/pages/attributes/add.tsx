import {
	getTranslation,
	useAddAttributeValueMutation,
	useAttributeById,
	useAttributeValues,
	useCreateAttributeMutation,
	useLanguages,
	useRemoveAttributeMutation,
	useRemoveAttributeValueMutation,
	useUpdateAttributeMutation,
	useUpdateAttributeValueMutation,
} from '@nima-cms/react';
import { AttributeValueDto, CreateAttributeDto, CreateAttributeValueDto, InputType } from '@nima-cms/sdk';
import { enumToArray, isCreateAttributeValueDto, Metadata, parseIdStr, toTitleCase } from '@nima-cms/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { toast } from 'react-toastify';
import {
	AdminColumn,
	AdminFooter,
	AdminPage,
	AdminSection,
	AttributeValuesForm,
	MetadataEditor,
	NimaTitle,
	SelectEditingLanguage,
	TranslatableInput,
} from '../../components';
import { NIMA_ROUTES } from '../../lib/routes';

interface AddAttributeProps {

}

const types = enumToArray(InputType);
const typesDropdown = types.map(type => ({ label: toTitleCase(type), value: type as string }));

export default function AddAttribute(props: AddAttributeProps) {

	const router = useRouter();
	const languages = useLanguages();
	const id: number | undefined = router.query['id'] ? parseIdStr(router.query['id']) : undefined;
	const isEditing = !!id;

	const [createAttributeDto, setCreateAttributeDto] = useState<CreateAttributeDto>({
		name: {},
		slug: '',
		inputType: InputType.DROPDOWN,
		storefrontSearchPosition: 0,
		availableInGrid: false,
		filterableInDashboard: false,
		filterableInStorefront: false,
		metadata: {},
		privateMetadata: {},
		unit: undefined,
		valueRequired: false,
		visibleInStorefront: false,
	});

	const { data: existingAttribute } = useAttributeById(id, { refetchInterval: false });
	const { data: existingAttributeValues } = useAttributeValues(id, { refetchInterval: false });

	const [values, setValues] = useState<(AttributeValueDto | CreateAttributeValueDto)[]>([]);

	const createAttributeMutation = useCreateAttributeMutation();
	const updateAttributeMutation = useUpdateAttributeMutation();
	const removeAttributeMutation = useRemoveAttributeMutation();
	const addAttributeValueMutation = useAddAttributeValueMutation();
	const removeAttributeValueMutation = useRemoveAttributeValueMutation();
	const updateAttributeValueMutation = useUpdateAttributeValueMutation();

	useEffect(() => {
		if ( createAttributeDto.inputType === InputType.DROPDOWN || createAttributeDto.inputType === InputType.MULTISELECT ) {
			setValues([]);
		} else if ( createAttributeDto.inputType === InputType.BOOLEAN ) {
			setValues([
				{ boolean: true, name: { 'en': 'Yes', 'el': 'Ναι' } },
				{ boolean: false, name: { 'en': 'No', 'el': 'Όχι' } },
			]);
		}
	}, [createAttributeDto.inputType]);

	useEffect(() => {
		if ( !existingAttribute ) return;
		const { id, ...rest } = existingAttribute;
		setCreateAttributeDto(rest);
	}, [existingAttribute]);

	useEffect(() => {
		if ( !existingAttributeValues ) return;
		setValues(existingAttributeValues);
	}, [existingAttributeValues]);

	function onValueEdit(name: keyof CreateAttributeDto, value: any) {
		setCreateAttributeDto(state => ({
			...state,
			[name]: value,
		}));
	}

	async function onCreateAttribute() {
		if ( !isEditing ) {
			try {
				const createdAttribute = await createAttributeMutation.mutateAsync({ createAttributeDto });
				await Promise.all(values.filter(v => isCreateAttributeValueDto(v)).map((value) => {
					if ( createdAttribute.inputType === InputType.BOOLEAN ) value.slug = createdAttribute.slug + '_' + (value.boolean ? 'true' : 'false');
					return addAttributeValueMutation.mutateAsync({
						attributeId: createdAttribute.id,
						createAttributeValue: value as CreateAttributeValueDto,
					});
				}));
				toast.success('Attribute Created!');
				// await router.push(NIMA_ROUTES.attributes.list);
			} catch ( e: any ) {
				console.log(e);
			}
		} else {
			const updatedAttributeDto = await updateAttributeMutation.mutateAsync({
				attributeId: id,
				updateAttributeDto: createAttributeDto,
			});
			toast.success('Attribute Updated!');
		}

	}

	async function onValueUpdate(value: AttributeValueDto | CreateAttributeValueDto, oldSlug: string) {
		if ( !value ) return;
		if ( isCreateAttributeValueDto(value) ) {
			setValues(state => {
				const temp = Array.from(state);
				temp[temp.findIndex(v => v.slug === oldSlug)] = value;
				return temp;
			});
		} else {
			if ( !id ) return;
			const { id: valueId, ...updateDto } = value as AttributeValueDto;
			await updateAttributeValueMutation.mutateAsync({
				attributeId: id,
				attributeValueId: value['id'],
				updateAttributeValueDto: updateDto,
			});
			toast.success('Value updated.');
		}
	}

	async function onValueRemove(value: AttributeValueDto | CreateAttributeValueDto) {
		if ( !value ) return;
		if ( !value['id'] ) {
			setValues(state => {
				const temp = Array.from(state);
				temp.splice(temp.indexOf(value), 1);
				return temp;
			});
		} else {
			if ( !id ) return;
			const confirm = window.confirm(`Are you sure you want to delete ${ getTranslation(value.name, languages.adminLanguage) }? It will be removed from all products using it.`);
			if ( confirm ) {
				await removeAttributeValueMutation.mutateAsync({
					attributeId: id,
					attributeValueId: value['id'],
				});
				toast.success('Value removed');
			}
		}
	}

	async function onValueCreate(value: CreateAttributeValueDto) {
		if ( isEditing ) {
			try {
				const newValue = await addAttributeValueMutation.mutateAsync({
					attributeId: id,
					createAttributeValue: value,
				});
				setValues(state => [...state, newValue]);
				toast.success('Value added.');
			} catch ( e: any ) {
				console.log(e);
			}
		} else {
			setValues(state => [...state, value]);
		}
	}

	async function onDeleteAttribute() {
		if ( !id || !existingAttribute ) return;
		const confirm = window.confirm(`Are you sure you want to delete ${ getTranslation(existingAttribute.name, languages.adminLanguage) }? It will be removed from all product types and products`);
		if ( confirm ) {
			await removeAttributeMutation.mutateAsync({
				attributeId: id,
			});
			router.push(NIMA_ROUTES.attributes.list);
		}
	}

	return (
		<>
			<NimaTitle title={ isEditing ? 'Update Attribute' : 'Create New Attribute' }/>
			<AdminPage
				label={ isEditing ? 'Update Attribute' : 'Create New Attribute' }
				footerContainer={ <AdminFooter>
					<Link href={ NIMA_ROUTES.attributes.list }>
						<button className={ 'btn btn-secondary' }>Back</button>
					</Link>

					{ existingAttribute && <button className="btn btn-error"
												   onClick={ onDeleteAttribute }>
						Delete
					</button> }

					<button className="btn btn-success"
							onClick={ onCreateAttribute }>{ isEditing ? 'Save' : 'Create' }</button>
				</AdminFooter> }
			>
				<AdminColumn>
					<AdminSection title={ 'General Information' } titleRightContainer={ <SelectEditingLanguage/> }>
						<div className="form-control w-full max-w-xs">
							<label className="label">
								<span className="label-text">Name</span>
							</label>
							<TranslatableInput
								value={ createAttributeDto.name }
								onChange={ (str => onValueEdit('name', str)) }
							/>
						</div>
						<div className="form-control w-full max-w-xs">
							<label className="label">
								<span className="label-text">Slug</span>
							</label>
							<input
								value={ createAttributeDto.slug }
								onChange={ (e => onValueEdit('slug', e.target.value)) }
								className={ 'input input-bordered' }
							/>
						</div>
						<div className="form-control w-full max-w-xs">
							<label className="label">
								<span className="label-text">Input Type</span>
							</label>
							<Select
								value={ typesDropdown.find(td => td.value === createAttributeDto.inputType) }
								options={ typesDropdown }
								onChange={ (e) => {
									onValueEdit('inputType', e.value);
								} }
								styles={ { menu: styles => ({ ...styles, zIndex: 100 }) } }
							/>
						</div>
						<div className="form-control w-full max-w-xs">
							<label className="label cursor-pointer justify-start gap-4">
								<input type="checkbox" checked={ createAttributeDto.valueRequired } className="checkbox"
									   onChange={ e => onValueEdit('valueRequired', e.target.checked) }
								/>
								<span className="label-text">Value Required</span>
							</label>
						</div>
					</AdminSection>
					<AttributeValuesForm values={ values }
										 onValueRemove={ onValueRemove }
										 onValueCreate={ onValueCreate }
										 onValueUpdate={ onValueUpdate }
										 type={ createAttributeDto.inputType }/>

					<MetadataEditor values={ createAttributeDto.metadata as Metadata }
									onChange={ (v => onValueEdit('metadata', v)) }/>
					<MetadataEditor isPrivate values={ createAttributeDto.privateMetadata as Metadata }
									onChange={ (v => onValueEdit('privateMetadata', v)) }/>
				</AdminColumn>
				<AdminColumn>
					<AdminSection title={ 'Configurations' }>
						<div className="form-control w-full max-w-xs">
							<label className="label cursor-pointer justify-start gap-4">
								<input type="checkbox" checked={ createAttributeDto.visibleInStorefront }
									   className="checkbox"
									   onChange={ e => onValueEdit('visibleInStorefront', e.target.checked) }
								/>
								<span className="label-text">Visible In Storefront</span>
							</label>
						</div>
						<div className="form-control w-full max-w-xs">
							<label className="label cursor-pointer justify-start gap-4">
								<input type="checkbox" checked={ createAttributeDto.filterableInDashboard }
									   className="checkbox"
									   onChange={ e => onValueEdit('filterableInDashboard', e.target.checked) }
								/>
								<span className="label-text">Filterable In Dashboard</span>
							</label>
						</div>
						<div className="form-control w-full max-w-xs">
							<label className="label cursor-pointer justify-start gap-4">
								<input type="checkbox" checked={ createAttributeDto.filterableInStorefront }
									   className="checkbox"
									   onChange={ e => onValueEdit('filterableInStorefront', e.target.checked) }
								/>
								<span className="label-text">Filterable In Store</span>
							</label>
						</div>
						<div className="form-control w-full max-w-xs">
							<label className="label cursor-pointer justify-start gap-4">
								<input type="checkbox" checked={ createAttributeDto.availableInGrid }
									   className="checkbox"
									   onChange={ e => onValueEdit('availableInGrid', e.target.checked) }
								/>
								<span className="label-text">Available In Grid</span>
							</label>
						</div>

						<div className="form-control w-full max-w-xs">
							<label className="label">
								<span className="label-text">Store Search Position</span>
							</label>
							<input
								type={ 'number' }
								min={ 0 }
								value={ createAttributeDto.storefrontSearchPosition }
								onChange={ (e => onValueEdit('storefrontSearchPosition', e.target.value)) }
								className={ 'input input-bordered' }
							/>
						</div>
					</AdminSection>
				</AdminColumn>
			</AdminPage>
		</>
	);
}
