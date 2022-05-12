import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('core_addresses')
export class AddressEntity {
	@PrimaryGeneratedColumn()
	@ApiProperty({ type: Number, example: 1 })
	id: number;

	@Column({ nullable: true })
	@ApiProperty({ type: String, example: 'John', required: false })
	@IsString()
	@IsOptional()
	firstName?: string;

	@Column({ nullable: true })
	@ApiProperty({ type: String, example: 'Doe', required: false })
	@IsString()
	@IsOptional()
	lastName?: string;

	@Column({ nullable: true })
	@ApiProperty({ type: String, example: 'Indera Inc.', required: false })
	@IsString()
	@IsOptional()
	companyName?: string;

	@Column({ nullable: true })
	@ApiProperty({ type: String, example: '+1 1234 567 890', required: false })
	@IsString()
	@IsOptional()
	phone?: string;

	@Column()
	@ApiProperty({ type: String, example: 'Greece' })
	@IsString()
	country: string;

	@Column()
	@ApiProperty({ type: String, example: 'Attica' })
	@IsString()
	state: string;

	@Column()
	@ApiProperty({ type: String, example: 'Athens' })
	@IsString()
	city: string;

	@Column()
	@ApiProperty({ type: String, example: '12345' })
	@IsString()
	zip: string;

	@Column()
	@ApiProperty({ type: String, example: 'Example 123' })
	@IsString()
	@IsOptional()
	address: string;

	@Column({ nullable: true })
	@ApiProperty({ type: String, example: 'Example 123', required: false })
	@IsString()
	@IsOptional()
	address2?: string;
}

export class CreateAddressDto extends OmitType(AddressEntity, ['id']) {
}
