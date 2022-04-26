import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { SettingsDto } from '../dto/settings.dto';
import { SettingsService } from './settings.service';

@Controller('core/settings')
@UseGuards(JwtAuthGuard)
@ApiTags('Core')
@ApiBearerAuth()
export class SettingsController {
	constructor(private readonly settingsService: SettingsService) {
	}

	@Get()
	@ApiResponse({ type: SettingsDto, description: 'asdas', status: 200 })
	async getSettings(): Promise<SettingsDto> {
		return this.settingsService.getSettings();
	}

	@Put()
	@ApiResponse({ type: SettingsDto })
	async updateSettings(@Body() createSettingsDto: SettingsDto): Promise<SettingsDto> {
		return this.settingsService.updateSettings(createSettingsDto);
	}
}
