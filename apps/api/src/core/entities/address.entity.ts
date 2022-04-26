import { ApiProperty } from '@nestjs/swagger';
import { Address } from '@nima/interfaces';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('core_addresses')
export class AddressEntity implements Address {
	@PrimaryGeneratedColumn()
	@ApiProperty({ type: Number, example: 1 })
	id: number;

	@Column({ nullable: true })
	@ApiProperty({ type: String, example: 'John', required: false })
	firstName?: string;

	@Column({ nullable: true })
	@ApiProperty({ type: String, example: 'Doe', required: false })
	lastName?: string;

	@Column({ nullable: true })
	@ApiProperty({ type: String, example: 'Indera Inc.', required: false })
	companyName?: string;

	@Column({ nullable: true })
	@ApiProperty({ type: String, example: '+1 1234 567 890', required: false })
	phone?: string;

	@Column()
	@ApiProperty({ type: String, example: 'Greece' })
	country: string;

	@Column()
	@ApiProperty({ type: String, example: 'Attica' })
	state: string;

	@Column()
	@ApiProperty({ type: String, example: 'Athens' })
	city: string;

	@Column()
	@ApiProperty({ type: String, example: '12345' })
	zip: string;

	@Column()
	@ApiProperty({ type: String, example: 'Example 123' })
	address: string;

	@Column({ nullable: true })
	@ApiProperty({ type: String, example: 'Example 123', required: false })
	address2?: string;
}
