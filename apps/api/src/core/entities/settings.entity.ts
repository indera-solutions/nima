import { ApiProperty } from '@nestjs/swagger';
import { LanguageCode } from '@nima/utils';
import { IsBoolean, IsEmail, IsEnum, IsString, IsUrl } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AddressDto } from '../dto/address.dto';
import { MediaDto } from '../dto/media.dto';
import { AddressEntity } from './address.entity';
import { MediaEntity } from './media.entity';

@Entity('core_settings')
export class SettingsEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	@ApiProperty({ type: String, example: 'Example Shop' })
	@IsString()
	siteName: string;

	@Column({ type: 'enum', enum: LanguageCode })
	@ApiProperty({ enum: LanguageCode, example: LanguageCode.en, enumName: 'LanguageCode' })
	@IsEnum(LanguageCode)
	adminLanguage: LanguageCode;

	@Column({ type: 'enum', array: true, enum: LanguageCode })
	@ApiProperty({ enum: LanguageCode, example: [LanguageCode.en, LanguageCode.el], isArray: true, enumName: 'LanguageCode' })
	@IsEnum(LanguageCode, { each: true })
	availableLanguages: LanguageCode[];

	@Column()
	@ApiProperty({ type: String, example: 'https://example.com' })
	@IsUrl()
	baseUrl: string;

	@Column()
	@ApiProperty({ type: Boolean, example: true })
	@IsBoolean()
	canRegister: boolean;

	@Column({ type: 'enum', enum: LanguageCode })
	@ApiProperty({ enum: LanguageCode, example: LanguageCode.en, enumName: 'LanguageCode' })
	@IsEnum(LanguageCode)
	defaultLanguage: LanguageCode;

	@Column()
	@ApiProperty({ type: String, example: 'sender@example.com' })
	@IsEmail()
	senderEmail: string;

	@Column()
	@ApiProperty({ type: String, example: 'Sender' })
	@IsString()
	senderName: string;

	@Column()
	@ApiProperty({ type: String, example: 'Awesome Eshop' })
	@IsString()
	seoTitle: string;

	@Column()
	@ApiProperty({ type: String, example: 'What a great shop!' })
	@IsString()
	seoDescription: string;

	@ManyToOne(() => AddressEntity)
	@ApiProperty({ type: AddressDto, required: false })
	shopAddress: AddressDto;

	@ManyToOne(() => MediaEntity)
	@ApiProperty({ type: MediaDto, required: false })
	siteLogo: MediaDto;
}
