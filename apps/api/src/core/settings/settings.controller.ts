import { Body, Controller, Get, Patch, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { IsAdmin, IsStaff } from '../../auth/auth.decorator';
import { CreateSettingsDto, SettingsDto, UpdateWebhookSettingsDto } from '../dto/settings.dto';
import { SettingsService } from './settings.service';

@Controller('core/settings')
@ApiTags('Core')
@ApiBearerAuth()
export class SettingsController {
	constructor(private readonly settingsService: SettingsService) {
	}

	@Get()
	@ApiOkResponse({ type: SettingsDto, description: 'asdas', status: 200 })
	@IsStaff()
	async getSettings(): Promise<SettingsDto> {
		return this.settingsService.getSettings();
	}

	@Put()
	@ApiOkResponse({ type: SettingsDto })
	@IsAdmin()
	async updateSettings(@Body() createSettingsDto: CreateSettingsDto): Promise<SettingsDto> {
		return this.settingsService.updateSettings(createSettingsDto);
	}

	@Patch('/webhooks')
	@ApiOkResponse({ type: CreateSettingsDto })
	@IsAdmin()
	async updateWebhookSettings(@Body() webhookSettingsDto: UpdateWebhookSettingsDto): Promise<SettingsDto> {
		return this.settingsService.updateWebhooks(webhookSettingsDto);
	}
}
