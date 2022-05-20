import { useAddressById } from '@nima-cms/react';
import { getCountryByCode, getCountryName, getState, getStateName } from '@nima-cms/utils';
import React, { useState } from 'react';
import { AdminSection } from '../AdminLayout';
import { EditAddressModal } from '../forms';

interface AddressViewProps {
	title: string;
	addressId: number;
}

export function AddressView(props: AddressViewProps) {
	const [modalOpen, setModalOpen] = useState(false);
	const { data: address } = useAddressById(props.addressId, { refetchInterval: false });


	if ( !address ) return <AdminSection title={ props.title }>
		Loading..
	</AdminSection>;

	return (
		<>
			<AdminSection title={ props.title }
						  titleRightContainer={ <button onClick={ () => setModalOpen(true) }
														className={ 'btn btn-primary' }>Edit</button> }>
				<div className="w-full">
					<h4>{ address.firstName } { address.lastName }</h4>
					<h4>{ address.phone }</h4>
					<h4>{ address.companyName }</h4>
					<h4>{ address.address }</h4>
					<h4>{ address.address2 }</h4>
					<h4>{ address.city }</h4>
					<h4>{ address.zip }</h4>
					<h4>{ getStateName(getState(address.country, address.state)) }</h4>
					<h4>{ getCountryName(getCountryByCode(address.country)) }</h4>
				</div>
			</AdminSection>
			{ modalOpen && <EditAddressModal onClose={ () => setModalOpen(false) } addressId={ props.addressId }/> }

		</>
	);
}
