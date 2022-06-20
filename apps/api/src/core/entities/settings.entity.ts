import { ApiProperty } from '@nestjs/swagger';
import { LanguageCode } from '@nima-cms/utils';
import { IsBoolean, IsEmail, IsEnum, IsInt, IsString, IsUrl } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Emails } from '../../email/templates';
import { AddressDto } from '../dto/address.dto';
import { MediaDto } from '../dto/media.dto';
import { AddressEntity } from './address.entity';
import { MediaEntity } from './media.entity';

export class EmailWebhooksDto {
	@ApiProperty({ enum: Emails, enumName: 'Emails' })
	@IsEnum(Emails)
	emailType: Emails;

	@ApiProperty()
	@IsUrl()
	webhook: string;
}

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

	@Column({ default: 'test@test.com' })
	@ApiProperty({ type: String, example: 'sender@example.com' })
	@IsEmail()
	adminEmail: string;

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


	@Column({ type: 'int', default: 1 })
	@ApiProperty({ type: Number, example: 1 })
	@IsInt()
	globalStockThreshold: number;

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

	@Column({ type: 'jsonb', default: [] })
	@ApiProperty({ type: () => EmailWebhooksDto, isArray: true })
	emailWebhooks: EmailWebhooksDto[];
}
