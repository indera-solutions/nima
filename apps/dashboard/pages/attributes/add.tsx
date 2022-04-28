import { CreateAttributeDto, InputType } from '@nima/sdk';
import { enumToArray, toTitleCase } from '@nima/utils';
import React, { useState } from 'react';
import Select from 'react-select';
import { AdminColumn, AdminPage, AdminSection, NimaTitle, TranslatableInput } from '../../components';
import { SelectEditingLanguage } from '../../components/forms/SelectEditingLanguage';

interface AddAttributeProps {

}

const types = enumToArray(InputType);
const typesDropdown = types.map(type => ({ label: toTitleCase(type), value: type }));

export default function AddAttribute(props: AddAttributeProps) {

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

	function onValueEdit(name: keyof CreateAttributeDto, value: any) {
		setCreateAttributeDto(state => ({
			...state,
			[name]: value,
		}));
	}

	return (
		<>
			<NimaTitle title={ 'Add Attribute' }/>
			<AdminPage
				label={/* isEditing ? 'Update Attribute' :*/ 'Create New Attribute' }
				// footerContainer={ <AdminFooter>
				// 	<LoomLink url={ COMMERCE_V2_ROUTES.attributes.list }>
				// 		<ThemeButton alt>Back</ThemeButton>
				// 	</LoomLink>
				//
				//
				// 	<ThemeButton onClick={ onCreateAttribute }>Save</ThemeButton>
				//</AdminFooter> } }
			>
				<AdminColumn>
					<AdminSection title={ 'General Information' } titleRightContainer={ <SelectEditingLanguage/> }>
						{ JSON.stringify(createAttributeDto) }
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
								<span className="label-text">Pick the best fantasy franchise</span>
							</label>
							<select className="select select-bordered"
									value={ createAttributeDto.inputType }
									onChange={ (e) => onValueEdit('inputType', e.target.value) }
							>
								{ typesDropdown.map(td => <option value={ td.value }
																  key={ td.value }>{ td.label }</option>) }
							</select>
						</div>
						<Select
							value={ createAttributeDto.inputType + '' }
							options={ typesDropdown }
							onChange={ (e) => {
								onValueEdit('inputType', e);
							} }
						/>
						{/*<ThemeCheckBox className={ 'mt-3' } checked={ state.valueRequired } onChange={ (isChecked) => {*/ }
						{/*	onValueEdit(isChecked, 'valueRequired');*/ }
						{/*} }>*/ }
						{/*	Value Required*/ }
						{/*</ThemeCheckBox>*/ }
						{/*<LoomCreatableSelect options={ options } />*/ }
					</AdminSection>
				</AdminColumn>
			</AdminPage>
		</>
	);
}
