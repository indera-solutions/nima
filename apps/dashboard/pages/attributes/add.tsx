import {
	useAddAttributeValueMutation,
	useAttributeById,
	useAttributeValues,
	useCreateAttributeMutation,
	useUpdateAttributeMutation,
} from '@nima/react';
import { AttributeValueDto, CreateAttributeDto, CreateAttributeValueDto, InputType } from '@nima/sdk';
import { enumToArray, isCreateAttributeValueDto, Metadata, parseIdStr, toTitleCase } from '@nima/utils';
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
	NimaTitle,
	SelectEditingLanguage,
	TranslatableInput,
} from '../../components';
import { MetadataEditor } from '../../components/forms/MetadataEditor';
import { NIMA_ROUTES } from '../../lib/routes';

interface AddAttributeProps {

}

const types = enumToArray(InputType);
const typesDropdown = types.map(type => ({ label: toTitleCase(type), value: type as string }));

export default function AddAttribute(props: AddAttributeProps) {

	const router = useRouter();
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
	const addAttributeValueMutation = useAddAttributeValueMutation();


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
				await router.push(NIMA_ROUTES.attributes.list);
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

	return (
		<>
			<NimaTitle title={ isEditing ? 'Update Attribute' : 'Create New Attribute' }/>
			<AdminPage
				label={ isEditing ? 'Update Attribute' : 'Create New Attribute' }
				footerContainer={ <AdminFooter>
					<Link href={ NIMA_ROUTES.attributes.list }>
						<button className={ 'btn btn-secondary' }>Back</button>
					</Link>

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
								className={ 'input input-bordered' }
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
					<AttributeValuesForm values={ values } onValueCreate={ onValueCreate }
										 type={ createAttributeDto.inputType }/>

					<MetadataEditor values={ createAttributeDto.metadata as Metadata }
									onChange={ (v => onValueEdit('metadata', v)) }/>
					<MetadataEditor isPrivate values={ createAttributeDto.privateMetadata as Metadata }
									onChange={ (v => onValueEdit('privateMetadata', v)) }/>
				</AdminColumn>
			</AdminPage>
		</>
	);
}
