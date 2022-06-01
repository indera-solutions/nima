import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SettingsDto } from '../dto/settings.dto';
import { SettingsEntity } from '../entities/settings.entity';

@Injectable()
export class SettingsService {
	constructor(@InjectRepository(SettingsEntity) private settingsRepository: Repository<SettingsEntity>) {
	}

	private static checkSettingsIntegrity(settings: SettingsEntity[]): void {
		if ( settings.length === 0 ) {
			throw new BadRequestException('SETTINGS_NOT_INITIALIZED', 'Settings object is not initialized. Call update settings first');
		}
		if ( settings.length > 1 ) {
			throw new ConflictException('MULTIPLE_SETTINGS', 'More that one settings instances detected. Please delete the invalid ones.');
		}
	}

	private static prepareSettings(entity: SettingsEntity): SettingsDto {
		return {
			siteName: entity.siteName,
			adminLanguage: entity.adminLanguage,
			adminEmail: entity.adminEmail,
			availableLanguages: entity.availableLanguages,
			baseUrl: entity.baseUrl,
			canRegister: entity.canRegister,
			defaultLanguage: entity.defaultLanguage,
			senderEmail: entity.senderEmail,
			senderName: entity.senderName,
			seoTitle: entity.seoTitle,
			seoDescription: entity.seoDescription,
			shopAddress: entity.shopAddress,
			siteLogo: entity.siteLogo,
			emailWebhooks: entity.emailWebhooks,
		};
	}

	async getSettings(): Promise<SettingsDto> {
		const existingSettings = await this.settingsRepository.find();
		SettingsService.checkSettingsIntegrity(existingSettings);
		return SettingsService.prepareSettings(existingSettings[0]);
	}

	async updateSettings(createSettingsDto: SettingsDto): Promise<SettingsDto> {
		const existingSettings = await this.settingsRepository.find();
		if ( existingSettings.length === 0 ) {
			const res = await this.settingsRepository.save(createSettingsDto);
			return SettingsService.prepareSettings(res);
		} else {
			SettingsService.checkSettingsIntegrity(existingSettings);
			const res = await this.settingsRepository.save({
				...createSettingsDto,
				id: existingSettings[0].id,
			});
			return SettingsService.prepareSettings(res);
		}
	}
}
