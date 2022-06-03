import { Body, Controller, Get, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { IsAdmin, IsStaff } from '../../auth/auth.decorator';
import { SettingsDto } from '../dto/settings.dto';
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
	async updateSettings(@Body() createSettingsDto: SettingsDto): Promise<SettingsDto> {
		return this.settingsService.updateSettings(createSettingsDto);
	}
}
