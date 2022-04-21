import { Address } from '@nima/interfaces';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('core_addresses')
export class AddressEntity implements Address {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: true })
	firstName?: string;

	@Column({ nullable: true })
	lastName?: string;

	@Column({ nullable: true })
	companyName?: string;

	@Column({ nullable: true })
	phone?: string;

	@Column()
	country: string;

	@Column()
	state: string;

	@Column()
	city: string;

	@Column()
	zip: string;

	@Column()
	address: string;

	@Column({ nullable: true })
	address2?: string;
}
