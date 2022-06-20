import { useUpdateOrderStatusMutation } from '@nima-cms/react';
import { OrderDto, OrderStatus } from '@nima-cms/sdk';
import { enumToArray, toTitleCase } from '@nima-cms/utils';
import React, { useState } from 'react';
import Select from 'react-select';
import { toast } from 'react-toastify';

interface NewShippingZoneModalProps {
	order: OrderDto;
	onClose: () => void;
}

const types = enumToArray(OrderStatus);
const typesDropdown = types.map(type => ({ label: toTitleCase(type), value: type as string }));

export function EditOrderStatusModal(props: NewShippingZoneModalProps) {
	const id = props.order.id;
	const [editStatusState, setEditStatusState] = useState<{ status: { label: string, value: string }, notifyCustomer: boolean }>({
		status: typesDropdown.find(type => type.value === props.order.status),
		notifyCustomer: false,
	});
	const updateOrderStatusMutation = useUpdateOrderStatusMutation();


	async function onSave() {
		await updateOrderStatusMutation.mutateAsync({
			id: id,
			updateOrderStatusDto: {
				status: OrderStatus[editStatusState.status.value],
				notifyCustomer: editStatusState.notifyCustomer,
			},
		});
		toast.success('Status Updated!');
		props.onClose();
	}


	return (
		<>
			<div className="modal modal-open">
				<div className="modal-box">
					<label onClick={ props.onClose } className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
					<h3 className="font-bold text-lg">Edit Status</h3>
					<div className="py-4">
						<div className="form-control w-full max-w-xs">
							<label className="label">
								<span className="label-text">Status</span>

							</label>
							<Select
								value={ editStatusState.status }
								options={ typesDropdown }
								onChange={ (e) => {
									setEditStatusState(state => ({
										...state,
										status: e,
									}));
								} }
							/>
						</div>
						<div className="form-control ">
							<label className="label cursor-pointer justify-start gap-4">
								<input type="checkbox" checked={ editStatusState.notifyCustomer } onChange={ () => {
									setEditStatusState(state => ({
										...state,
										notifyCustomer: !state.notifyCustomer,
									}));
								} } className="checkbox"/>
								<span className="label-text"><strong>Notify Customer</strong></span>
							</label>
						</div>
						<div className="modal-action">
							<label className="btn btn-success" onClick={ onSave }>
								Update Status
							</label>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
