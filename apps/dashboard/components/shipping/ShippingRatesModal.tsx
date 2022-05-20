import {
	useCreateShippingRateMutation,
	useDeleteShippingRateMutation,
	useUpdateShippingRateMutation,
} from '@nima-cms/react';
import { CreateShippingRateDto, ShippingMethodType, ShippingRateDto, ShippingZoneDto } from '@nima-cms/sdk';
import { deepEqual, enumToArray, toTitleCase } from '@nima-cms/utils';
import React, { useState } from 'react';
import Select from 'react-select';
import { toast } from 'react-toastify';

interface ShippingRatesModalProps {
	init: ShippingZoneDto;
	methodId: number;
	onClose: () => void;
}

const types = enumToArray(ShippingMethodType);
const typesDropdown = types.map(type => ({ label: toTitleCase(type), value: type as string }));

export function ShippingRatesModal(props: ShippingRatesModalProps) {
	const zoneId = props.init.id;

	return (
		<>
			<div className="modal modal-open">
				<div className="modal-box w-11/12 max-w-6xl">
					<label onClick={ props.onClose } className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
					<h3 className="font-bold text-lg">Create New Shipping Zone</h3>
					<div className="py-4">
						<div className="">
							<table className="table w-full">
								<thead>
								<tr>
									<th>Type</th>
									<th>Min</th>
									<th>Max</th>
									<th>Rate</th>
									<th>Actions</th>
									<th>Delete</th>
								</tr>
								</thead>
								<tbody>
								{ (props.init.shippingRates || []).map((rate) => <RateLine
									key={ rate.id }
									rate={ rate }
									zoneId={ zoneId }
									methodId={ props.methodId }
								/>) }
								<RateLine
									key={ props.init?.shippingRates.length }
									zoneId={ zoneId }
									methodId={ props.methodId }
								/>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</>

	);
}

function RateLine(props: { rate?: ShippingRateDto, methodId, zoneId }) {

	const [rate, setRate] = useState<CreateShippingRateDto>(props.rate || {
		shippingType: ShippingMethodType.FLAT_RATE,
		rate: 0,
	});

	const createShippingRateMutation = useCreateShippingRateMutation();
	const updateShippingRateMutation = useUpdateShippingRateMutation();
	const deleteShippingRateMutation = useDeleteShippingRateMutation();

	async function onUpdate() {
		if ( !props.rate ) return;
		const temp = { ...rate };
		delete temp['id'];
		await updateShippingRateMutation.mutateAsync({
			methodId: props.methodId,
			zoneId: props.zoneId,
			rateId: props.rate.id,
			updateShippingRateDto: temp,
		});
		toast.success('Rate Updated');
	}

	async function onCreate() {
		await createShippingRateMutation.mutateAsync({
			methodId: props.methodId,
			zoneId: props.zoneId,
			createShippingRateDto: rate,
		});
		toast.success('Rate created');
	}

	function onMinMaxChange(value: string, isMin: boolean) {
		setRate(state => {
			const temp: CreateShippingRateDto = { ...state };
			const finalValue = value ? +value : null;
			if ( state.shippingType === ShippingMethodType.BY_WEIGHT ) {
				if ( isMin ) {
					temp.minimumOrderWeight = finalValue;
				} else {
					temp.maximumOrderWeight = finalValue;
				}
			} else {
				if ( isMin ) {
					temp.minimumPrice = finalValue;
				} else {
					temp.maximumPrice = finalValue;
				}
			}

			return temp;
		});
	}

	function onTypeChange(type: ShippingMethodType) {
		setRate(state => {
			const temp: CreateShippingRateDto = { ...state, shippingType: type };
			if ( type === ShippingMethodType.FREE_SHIPPING ) {
				temp.rate = 0;
			} else if ( type === ShippingMethodType.FLAT_RATE ) {
				temp.maximumOrderWeight = null;
				temp.minimumOrderWeight = null;
			} else if ( type === ShippingMethodType.BY_WEIGHT ) {
				temp.maximumPrice = null;
				temp.minimumPrice = null;
			}

			return temp;
		});
	}

	async function onDelete() {
		if ( props.rate ) {
			await deleteShippingRateMutation.mutateAsync({
				rateId: props.rate.id,
				methodId: props.methodId,
				zoneId: props.zoneId,
			});
			toast.success('Rate Deleted.');
		} else {
			setRate({
				shippingType: ShippingMethodType.FLAT_RATE,
				rate: 0,
				minimumDeliveryDays: null,
				maximumPrice: null,
				minimumPrice: null,
				maximumOrderWeight: null,
				minimumOrderWeight: null,
				maximumDeliveryDays: null,
			});
		}
	}

	return <tr className={ 'hover' }>
		<td>
			<Select
				value={ typesDropdown.find(td => td.value === rate.shippingType) }
				options={ typesDropdown }
				onChange={ (e) => {
					onTypeChange(ShippingMethodType[e.value]);
				} }
			/>
		</td>
		<td>
			<label className="input-group">
				<input
					className={ 'input input-bordered w-full ' }
					type={ 'number' }
					value={ rate.minimumOrderWeight || rate.minimumPrice || '' }
					onChange={ (e) => {
						onMinMaxChange(e.target.value, true);
					} }/>
				<span>{ rate.shippingType === ShippingMethodType.BY_WEIGHT ? 'kg' : '€' }</span>
			</label>

		</td>
		<td>
			<label className="input-group">
				<input
					className={ 'input input-bordered w-full ' }
					type={ 'number' }
					value={ rate.maximumOrderWeight || rate.maximumPrice || '' }
					onChange={ (e) => {
						onMinMaxChange(e.target.value, false);
					} }/>
				<span>{ rate.shippingType === ShippingMethodType.BY_WEIGHT ? 'kg' : '€' }</span>
			</label>
		</td>
		<td>
			<label className="input-group">
				<input
					className={ 'input input-bordered w-full ' }
					type={ 'number' }
					disabled={ rate.shippingType === ShippingMethodType.FREE_SHIPPING || rate.shippingType === ShippingMethodType.LOCAL_PICKUP }
					value={ rate.rate }
					onChange={ (e) => {
						setRate(state => ({ ...state, rate: +e.target.value }));
					} }/>
				<span>{ '€' }</span>
			</label></td>
		<td>
			{ props.rate ?
				<button
					className={ 'btn btn-primary w-full' }
					disabled={ deepEqual(props.rate, rate) }
					onClick={ onUpdate }>Save
				</button> :
				<button
					className={ 'btn btn-success w-full' }
					onClick={ onCreate }>
					Create
				</button>
			}
		</td>
		<td>
			<button className="btn btn-square btn-error" onClick={ onDelete }>
				<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
					 stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
				</svg>
			</button>
		</td>
	</tr>;
}

