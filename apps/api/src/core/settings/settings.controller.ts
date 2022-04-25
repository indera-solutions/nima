import { Body, Controller, Get, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SettingsDto } from '../dto/settings.dto';
import { SettingsService } from './settings.service';

@Controller('core/settings')
@ApiTags('core')
export class SettingsController {
	constructor(private readonly settingsService: SettingsService) {
	}

	@Get()
	async getSettings(): Promise<SettingsDto> {
		return this.settingsService.getSettings();
	}

	@Put()
	async updateSettings(@Body() createSettingsDto: SettingsDto): Promise<SettingsDto> {
		return this.settingsService.updateSettings(createSettingsDto);
	}
}
