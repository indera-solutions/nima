import {
	useCreateShippingMethodMutation,
	useShippingMethodById,
	useUpdateShippingMethodMutation,
} from '@nima-cms/react';
import { CreateAttributeValueDto, CreateShippingMethodDto } from '@nima-cms/sdk';
import { Metadata, parseIdStr } from '@nima-cms/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
	AdminColumn,
	AdminFooter,
	AdminPage,
	AdminSection,
	MetadataEditor,
	NimaTitle,
	SelectEditingLanguage,
	TranslatableInput,
} from '../../components';
import { ZoneTable } from '../../components/shipping/zoneTable';
import { NIMA_ROUTES } from '../../lib/routes';

interface AddAttributeProps {

}


export default function AddShippingMethod(props: AddAttributeProps) {

	const router = useRouter();
	const id: number | undefined = router.query['id'] ? parseIdStr(router.query['id']) : undefined;
	const isEditing = !!id;

	const { data: existingMethod } = useShippingMethodById(id, { refetchInterval: false });

	const createShippingMethodMutation = useCreateShippingMethodMutation();
	const updateShippingMethodMutation = useUpdateShippingMethodMutation();

	const [createShippingMethod, setCreateShippingMethod] = useState<CreateShippingMethodDto>({
		name: '',
		description: {},
		shippingZones: [],
		metadata: {},
		privateMetadata: {},
	});

	useEffect(() => {
		if ( !existingMethod ) return;
		const { id, ...rest } = existingMethod;
		setCreateShippingMethod(rest);
	}, [existingMethod]);

	function onValueEdit(name: keyof CreateShippingMethodDto, value: any) {
		setCreateShippingMethod(state => ({
			...state,
			[name]: value,
		}));
	}

	async function onCreateAttribute() {
		if ( !isEditing ) {
			const createdShippingMethod = await createShippingMethodMutation.mutateAsync({ createShippingMethodDto: createShippingMethod });
			toast.success('Shipping Method Created!');
			await router.push(NIMA_ROUTES.shipping.edit(createdShippingMethod.id));
		} else {
			const updatedAttributeDto = await updateShippingMethodMutation.mutateAsync({
				id,
				updateShippingMethodDto: createShippingMethod,
			});
			toast.success('Shipping Method Updated!');
		}

	}

	async function onValueCreate(value: CreateAttributeValueDto) {
		// if ( isEditing ) {
		// 	try {
		// 		const newValue = await addAttributeValueMutation.mutateAsync({
		// 			attributeId: id,
		// 			createAttributeValue: value,
		// 		});
		// 		setValues(state => [...state, newValue]);
		// 		toast.success('Value added.');
		// 	} catch ( e: any ) {
		// 		console.log(e);
		// 	}
		// } else {
		// 	setValues(state => [...state, value]);
		// }
	}

	return (
		<>
			<NimaTitle title={ isEditing ? 'Update Shipping Method' : 'Create New Shipping Method' }/>
			<AdminPage
				label={ isEditing ? 'Update Shipping Method' : 'Create New Shipping Method' }
				footerContainer={ <AdminFooter>
					<Link href={ NIMA_ROUTES.shipping.list }>
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
							<input
								value={ createShippingMethod.name }
								onChange={ (e => onValueEdit('name', e.target.value)) }
								className={ 'input input-bordered' }
							/>
						</div>
						{/*<div className="form-control w-full max-w-xs">*/ }
						{/*	<label className="label">*/ }
						{/*		<span className="label-text">Input Type</span>*/ }
						{/*	</label>*/ }
						{/*	<Select*/ }
						{/*		value={ typesDropdown.find(td => td.value === createShippingMethod.shippingType) }*/ }
						{/*		options={ typesDropdown }*/ }
						{/*		onChange={ (e) => {*/ }
						{/*			onValueEdit('shippingType', e.value);*/ }
						{/*		} }*/ }
						{/*	/>*/ }
						{/*</div>*/ }
						<div className="form-control w-full max-w-xs">
							<label className="label">
								<span className="label-text">Description</span>
							</label>
							<TranslatableInput
								value={ createShippingMethod.description }
								onChange={ (str => onValueEdit('description', str)) }
								className={ 'input input-bordered w-full' }
							/>
						</div>


						{/*<div className="form-control w-full max-w-xs">*/ }
						{/*	<label className="label">*/ }
						{/*		<span className="label-text">Delivery days</span>*/ }
						{/*	</label>*/ }
						{/*	<div className="w-full flex gap-4">*/ }
						{/*		<div>*/ }
						{/*			<label className="label">*/ }
						{/*				<span className="label-text">Min</span>*/ }
						{/*			</label>*/ }
						{/*			<input*/ }
						{/*				value={ createShippingMethod.minimumDeliveryDays }*/ }
						{/*				onChange={ (e => onValueEdit('minimumDeliveryDays', +e.target.value)) }*/ }
						{/*				type={ 'number' }*/ }
						{/*				className={ 'input input-bordered' }*/ }
						{/*			/>*/ }
						{/*		</div>*/ }
						{/*		<div>*/ }

						{/*			<label className="label">*/ }
						{/*				<span className="label-text">Max</span>*/ }
						{/*			</label>*/ }
						{/*			<input*/ }
						{/*				value={ createShippingMethod.maximumDeliveryDays }*/ }
						{/*				onChange={ (e => onValueEdit('maximumDeliveryDays', +e.target.value)) }*/ }
						{/*				type={ 'number' }*/ }
						{/*				className={ 'input input-bordered' }*/ }
						{/*			/>*/ }
						{/*		</div>*/ }
						{/*	</div>*/ }
						{/*</div>*/ }


					</AdminSection>

					<AdminSection title={ 'Restrictions' }>

						{/*<div className="form-control w-full max-w-xs">*/ }
						{/*	<label className="label">*/ }
						{/*		<span className="label-text">Weight Restriction</span>*/ }
						{/*	</label>*/ }
						{/*	<div className="w-full flex gap-4">*/ }
						{/*		<div>*/ }
						{/*			<label className="label">*/ }
						{/*				<span className="label-text">Min</span>*/ }
						{/*			</label>*/ }
						{/*			<input*/ }
						{/*				value={ createShippingMethod.minimumOrderWeight }*/ }
						{/*				onChange={ (e => onValueEdit('minimumOrderWeight', +e.target.value)) }*/ }
						{/*				type={ 'number' }*/ }
						{/*				className={ 'input input-bordered' }*/ }
						{/*			/>*/ }
						{/*		</div>*/ }
						{/*		<div>*/ }

						{/*			<label className="label">*/ }
						{/*				<span className="label-text">Max</span>*/ }
						{/*			</label>*/ }
						{/*			<input*/ }
						{/*				value={ createShippingMethod.maximumOrderWeight }*/ }
						{/*				onChange={ (e => onValueEdit('maximumOrderWeight', +e.target.value)) }*/ }
						{/*				type={ 'number' }*/ }
						{/*				className={ 'input input-bordered' }*/ }
						{/*			/>*/ }
						{/*		</div>*/ }
						{/*	</div>*/ }
						{/*	<label className="label">*/ }
						{/*		<span className="label-text-alt">Min/max total weight of cart to be active. Type 0 for no restriction</span>*/ }
						{/*	</label>*/ }
						{/*</div>*/ }
					</AdminSection>

					{ existingMethod && <ZoneTable methodId={ id } shippingZones={ existingMethod.shippingZones }/> }

					<MetadataEditor values={ createShippingMethod.metadata as Metadata }
									onChange={ (v => onValueEdit('metadata', v)) }/>
					<MetadataEditor isPrivate values={ createShippingMethod.privateMetadata as Metadata }
									onChange={ (v => onValueEdit('privateMetadata', v)) }/>
				</AdminColumn>
			</AdminPage>
		</>
	);
}
