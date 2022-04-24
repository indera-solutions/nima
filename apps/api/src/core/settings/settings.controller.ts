import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { SettingsDto } from '../dto/settings.dto';
import { SettingsService } from './settings.service';

@Controller('core/settings')
@ApiTags('core')
export class SettingsController {
	constructor(private readonly settingsService: SettingsService) {
	}

	@Post()
	@ApiBody({ type: SettingsDto })
	@ApiCreatedResponse({ type: SettingsDto, description: 'The initialized settings' })
	async createSettings(@Body() createSettingsDto: SettingsDto): Promise<SettingsDto> {
		return this.settingsService.createSettings(createSettingsDto);
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
