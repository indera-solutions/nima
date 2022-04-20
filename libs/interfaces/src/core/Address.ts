export interface Address {
	id: number;
	firstName?: string;
	lastName?: string;
	companyName?: string;
	phone?: string;
	/** Should be ISO 3166-1 alpha-2 code */
	country: string;
	/** Should be ISO 3166-2 code */
	state: string;
	city: string;
	zip: string;
	address: string;
	address2?: string;
}

export interface CreateAddressDto extends Omit<Address, 'id'> {
}
