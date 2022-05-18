import { useCreateShippingZoneMutation, useUpdateShippingZoneMutation } from '@nima-cms/react';
import { CreateShippingZoneDto, ShippingZoneDto, ShippingZoneLocationType } from '@nima-cms/sdk';
import { continents, countries, enumToArray, getStatesOfCountryByAlpha2, toTitleCase } from '@nima-cms/utils';
import React, { useEffect, useMemo, useState } from 'react';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { SelectEditingLanguage, TranslatableInput } from '../forms';

interface NewShippingZoneModalProps {
	init?: ShippingZoneDto;
	methodId: number;
	onClose: () => void;
}

const types = enumToArray(ShippingZoneLocationType);
const typesDropdown = types.map(type => ({ label: toTitleCase(type), value: type as string }));
const continentsDropdown = Object.entries(continents).map(country => ({ label: toTitleCase(country[1].name), value: country[0] }));
const countriesDropdown = Object.entries(countries).map(country => ({ label: toTitleCase(country[1].name), value: country[0] }));
const stateDropdown = countriesDropdown.map(type => {
	return {
		label: type.label,
		options: getStatesOfCountryByAlpha2(type.value).map(state => ({
			label: state.name,
			value: state.stateCode,
		})),
	};
});

export function NewShippingZoneModal(props: NewShippingZoneModalProps) {
	const id = props.init?.id;

	const createShippingZoneMutation = useCreateShippingZoneMutation();
	const updateShippingZoneMutation = useUpdateShippingZoneMutation();


	const [createShippingZoneDto, setCreateShippingZoneDto] = useState<CreateShippingZoneDto>({
		name: '',
		locationCodes: [],
		locationType: ShippingZoneLocationType.COUNTRY,
		description: {},
		privateMetadata: {},
		metadata: {},
	});

	useEffect(() => {
		if ( !props.init ) return;
		console.log('props.init', props.init);
		setCreateShippingZoneDto({
			name: props.init.name,
			locationCodes: Array.from(props.init.locationCodes),
			locationType: props.init.locationType,
			description: props.init.description,
			privateMetadata: props.init.privateMetadata,
			metadata: props.init.metadata,
		});
	}, [props.init]);

	const [zipText, setZipText] = useState('');

	useEffect(() => {
		if ( createShippingZoneDto.locationType !== ShippingZoneLocationType.POSTAL ) return;
		const codes = zipText.replace(/[\n\t\r]/g, ',').split(',').map(code => code.replace(/[A-Za-z ]/g, '').trim());
		onValueEdit('locationCodes', codes);
	}, [zipText, createShippingZoneDto.locationType]);


	const stateValue = useMemo(() => {
		if ( createShippingZoneDto.locationType !== ShippingZoneLocationType.STATE ) return [];
		const values = [];
		stateDropdown.forEach(statesByCountry => {
			values.push(...statesByCountry.options.filter(state => createShippingZoneDto.locationCodes.includes(state.value)));
		});
	}, [createShippingZoneDto.locationType, createShippingZoneDto.locationCodes]);

	function onLocationTypeChange(newValue) {
		setCreateShippingZoneDto(state => ({
			...state,
			locationType: newValue,
			locationCodes: [],
		}));
	}

	function onValueEdit(name: keyof CreateShippingZoneDto, value: any) {
		setCreateShippingZoneDto(state => {
			return {
				...state,
				[name]: value,
			};
		});
	}

	async function onSave() {
		if ( id ) {
			await updateShippingZoneMutation.mutateAsync({
				id: id,
				methodId: props.methodId,
				updateShippingZoneDto: createShippingZoneDto,
			});
			toast.success('Zone Updated!');
		} else {
			await createShippingZoneMutation.mutateAsync({
				methodId: props.methodId,
				createShippingZoneDto: createShippingZoneDto,
			});
			toast.success('Zone Updated!');
		}
		props.onClose();
	}

	return (
		<>

			<div className="modal modal-open">
				<div className="modal-box h-3/5">
					<label onClick={ props.onClose } className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
					<h3 className="font-bold text-lg">Create New Shipping Zone</h3>
					<div className="py-4">

						<div className="form-control w-full max-w-xs">
							<label className="label">
								<span className="label-text">Name</span>
							</label>
							<input
								value={ createShippingZoneDto.name }
								onChange={ (e => onValueEdit('name', e.target.value)) }
								className={ 'input input-bordered' }
							/>
						</div>

						<div className="form-control w-full max-w-xs">
							<label className="label">
								<span className="label-text">Description</span>
								<SelectEditingLanguage/>
							</label>
							<TranslatableInput
								value={ createShippingZoneDto.description }
								onChange={ (str => onValueEdit('description', str)) }
								className={ 'input input-bordered w-full' }
							/>
						</div>


						<div className="form-control w-full max-w-xs">
							<label className="label">
								<span className="label-text">Type</span>
							</label>
							<Select
								value={ typesDropdown.find(td => td.value === createShippingZoneDto.locationType) }
								options={ typesDropdown }
								onChange={ (e) => {
									onLocationTypeChange(e.value);
								} }
							/>
						</div>

						{ createShippingZoneDto.locationType === ShippingZoneLocationType.COUNTRY &&
							<div className="form-control w-full max-w-xs">
								<label className="label">
									<span className="label-text">Country</span>
								</label>
								<Select
									value={ countriesDropdown.filter(td => createShippingZoneDto.locationCodes.includes(td.value)) }
									options={ countriesDropdown }
									isMulti
									onChange={ (e) => {
										onValueEdit('locationCodes', e.map(v => v.value));
									} }
								/>
							</div> }

						{ createShippingZoneDto.locationType === ShippingZoneLocationType.STATE &&
							<div className="form-control w-full max-w-xs">
								<label className="label">
									<span className="label-text">State</span>
								</label>
								<Select
									value={ stateValue }
									options={ stateDropdown }
									isMulti
									onChange={ (e) => {
										onValueEdit('locationCodes', e.map(v => v.value));
									} }
								/>
							</div> }
						{ createShippingZoneDto.locationType === ShippingZoneLocationType.CONTINENT &&
							<div className="form-control w-full max-w-xs">
								<label className="label">
									<span className="label-text">Continents</span>
								</label>
								<Select
									value={ continentsDropdown.filter(td => createShippingZoneDto.locationCodes.includes(td.value)) }
									options={ continentsDropdown }
									isMulti
									onChange={ (e) => {
										onValueEdit('locationCodes', e.map(v => v.value));
									} }
								/>
							</div> }
						{ createShippingZoneDto.locationType === ShippingZoneLocationType.POSTAL &&
							<div className="form-control w-full max-w-xs">
								<label className="label">
									<span className="label-text">ZIP Codes</span>
									<span className="label-text-alt">single or range, seperated by comma</span>
								</label>
								<textarea value={ zipText } onChange={ e => setZipText(e.target.value) }
										  className={ 'input input-bordered' } cols={ 30 } rows={ 10 }/>
							</div> }
					</div>
					<div className="modal-action">
						<label className="btn" onClick={ onSave }>
							{ props.init ? 'Update' : 'Create' } Shipping
							Zone
						</label>
					</div>
				</div>
			</div>
		</>

	);
}
