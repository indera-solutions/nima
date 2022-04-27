import { ApiProperty } from '@nestjs/swagger';
import { Address, LanguageCode, Media, Settings } from '@nima/interfaces';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AddressEntity } from './address.entity';
import { MediaEntity } from './media.entity';

@Entity('core_settings')
export class SettingsEntity implements Settings {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	@ApiProperty({ type: String, example: 'Example Shop' })
	siteName: string;

	@Column({ type: 'enum', enum: LanguageCode })
	@ApiProperty({ enum: LanguageCode, example: LanguageCode.en, enumName: 'LanguageCode' })
	adminLanguage: LanguageCode;

	@Column({ type: 'enum', array: true, enum: LanguageCode })
	@ApiProperty({ enum: LanguageCode, example: [LanguageCode.en, LanguageCode.el], isArray: true, enumName: 'LanguageCode' })
	availableLanguages: LanguageCode[];

	@Column()
	@ApiProperty({ type: String, example: 'https://example.com' })
	baseUrl: string;

	@Column()
	@ApiProperty({ type: Boolean, example: true })
	canRegister: boolean;

	@Column({ type: 'enum', enum: LanguageCode })
	@ApiProperty({ enum: LanguageCode, example: LanguageCode.en, enumName: 'LanguageCode' })
	defaultLanguage: LanguageCode;

	@Column()
	@ApiProperty({ type: String, example: 'sender@example.com' })
	senderEmail: string;

	@Column()
	@ApiProperty({ type: String, example: 'Sender' })
	senderName: string;

	@Column()
	@ApiProperty({ type: String, example: 'Awesome Eshop' })
	seoTitle: string;

	@Column()
	@ApiProperty({ type: String, example: 'What a great shop!' })
	seoDescription: string;

	@ManyToOne(() => AddressEntity)
	@ApiProperty({ type: AddressEntity, required: false })
	shopAddress: Address;

	@ManyToOne(() => MediaEntity)
	@ApiProperty({ type: MediaEntity, required: false })
	siteLogo: Media;


}
