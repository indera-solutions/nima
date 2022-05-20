import { useAddressById, useUpdateAddressMutation } from '@nima-cms/react';
import { CreateAddressDto } from '@nima-cms/sdk';
import { countries, getStatesOfCountryByAlpha2, toTitleCase } from '@nima-cms/utils';
import React, { useEffect, useMemo, useState } from 'react';
import { Simulate } from 'react-dom/test-utils';
import Select from 'react-select';
import { toast } from 'react-toastify';
import input = Simulate.input;

interface NewShippingZoneModalProps {
	addressId: number;
	onClose: () => void;
}

const countriesDropdown = Object.entries(countries).map(country => ({ label: toTitleCase(country[1].name), value: country[0] }));

export function EditAddressModal(props: NewShippingZoneModalProps) {
	const id = props.addressId;

	const { data: address } = useAddressById(id, { refetchInterval: false });
	const updateAddressMutation = useUpdateAddressMutation();

	const [createAddressDto, setCreateAddressDto] = useState<CreateAddressDto>({
		address: '',
		address2: '',
		city: '',
		companyName: '',
		country: '',
		firstName: '',
		lastName: '',
		phone: '',
		state: '',
		zip: '',
	});

	const statesOptions = useMemo(() => {
		const statesOfCountry = getStatesOfCountryByAlpha2(createAddressDto.country);
		return statesOfCountry.map(state => ({
			label: state.name,
			value: state.stateCode,
		}));
	}, [createAddressDto.country]);

	useEffect(() => {
		if ( !address ) return;
		setCreateAddressDto({
			address: address.address || '',
			address2: address.address2 || '',
			city: address.city || '',
			companyName: address.companyName || '',
			country: address.country || '',
			firstName: address.firstName || '',
			lastName: address.lastName || '',
			phone: address.phone || '',
			state: address.state || '',
			zip: address.zip || '',
		});
	}, [address]);


	function onValueEdit(name: keyof CreateAddressDto, value: any) {
		setCreateAddressDto(state => {
			return { ...state, [name]: value };
		});
	}

	async function onSave() {
		await updateAddressMutation.mutateAsync({
			id: id,
			createAddressDto: createAddressDto,
		});
		toast.success('Address Updated!');
		props.onClose();
	}


	return (
		<>
			<div className="modal modal-open">
				<div className="modal-box">
					<label onClick={ props.onClose } className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
					<h3 className="font-bold text-lg">Edit Address</h3>
					<div className="py-4">

						<div className={ 'flex gap-4' }>
							<div className="form-control w-full max-w-xs">
								<label className="label">
									<span className="label-text">First Name</span>
								</label>
								<input
									value={ createAddressDto.firstName }
									onChange={ (e => onValueEdit('firstName', e.target.value)) }
									className={ 'input input-bordered' }
								/>
							</div>
							<div className="form-control w-full max-w-xs">
								<label className="label">
									<span className="label-text">Last Name</span>
								</label>
								<input
									value={ createAddressDto.lastName }
									onChange={ (e => onValueEdit('lastName', e.target.value)) }
									className={ 'input input-bordered' }
								/>
							</div>
						</div>
						<div className="form-control w-full">
							<label className="label">
								<span className="label-text">Phone</span>
							</label>
							<input
								value={ createAddressDto.phone }
								onChange={ (e => onValueEdit('phone', e.target.value)) }
								className={ 'input input-bordered' }
							/>
						</div>
						<div className="form-control w-full">
							<label className="label">
								<span className="label-text">Company Name</span>
							</label>
							<input
								value={ createAddressDto.companyName }
								onChange={ (e => onValueEdit('companyName', e.target.value)) }
								className={ 'input input-bordered' }
							/>
						</div>

						<div className="form-control w-full">
							<label className="label">
								<span className="label-text">Address</span>
							</label>
							<input
								value={ createAddressDto.address }
								onChange={ (e => onValueEdit('address', e.target.value)) }
								className={ 'input input-bordered' }
							/>
						</div>

						<div className={ 'flex gap-4' }>
							<div className="form-control w-full max-w-xs">
								<label className="label">
									<span className="label-text">City</span>
								</label>
								<input
									value={ createAddressDto.city }
									onChange={ (e => onValueEdit('city', e.target.value)) }
									className={ 'input input-bordered' }
								/>
							</div>
							<div className="form-control w-full max-w-xs">
								<label className="label">
									<span className="label-text">ZIP</span>
								</label>
								<input
									value={ createAddressDto.zip }
									onChange={ (e => onValueEdit('zip', e.target.value)) }
									className={ 'input input-bordered' }
								/>
							</div>
						</div>

						<div className={ 'flex gap-4' }>
							<div className="form-control w-full max-w-xs">
								<label className="label">
									<span className="label-text">State</span>
								</label>
								<Select
									value={ statesOptions.find(td => createAddressDto.state === td.value) }
									options={ statesOptions }
									onChange={ (e) => {
										onValueEdit('state', e.value);
									} }
								/>
							</div>
							<div className="form-control w-full max-w-xs">
								<label className="label">
									<span className="label-text">Country</span>

								</label>
								<Select
									value={ countriesDropdown.find(td => createAddressDto.country === td.value) }
									options={ countriesDropdown }
									onChange={ (e) => {
										console.log(e);
										onValueEdit('country', e.value);
									} }
								/>
							</div>
						</div>
						<div className="modal-action">
							<label className="btn btn-success" onClick={ onSave }>
								Update Address
							</label>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
