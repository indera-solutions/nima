import { Address, LanguageCode, Media, Settings } from '@nima/interfaces';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AddressEntity } from './address.entity';
import { MediaEntity } from './media.entity';

@Entity('core_settings')
export class SettingsEntity implements Settings {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'enum', enum: LanguageCode })
	adminLanguage: LanguageCode;

	@Column({ type: 'enum', array: true, enum: LanguageCode })
	availableLanguages: LanguageCode[];

	@Column()
	baseUrl: string;

	@Column()
	canRegister: boolean;

	@Column({ type: 'enum', enum: LanguageCode })
	defaultLanguage: LanguageCode;

	@Column()
	senderEmail: string;

	@Column()
	senderName: string;

	@Column()
	seoDescription: string;

	@Column()
	seoTitle: string;

	@ManyToOne(() => AddressEntity)
	shopAddress: Address;

	@ManyToOne(() => MediaEntity)
	siteLogo: Media;

	@Column()
	siteName: string;
}
