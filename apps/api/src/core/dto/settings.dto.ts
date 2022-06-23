import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';
import { SettingsEntity } from '../entities/settings.entity';
import { MediaDto } from './media.dto';


export class SettingsDto extends OmitType(SettingsEntity, ['id', 'siteLogo']) {
	@ApiProperty({ type: MediaDto, required: false })
	siteLogo: MediaDto;
}

export class CreateSettingsDto extends OmitType(SettingsDto, ['emailWebhooks', 'siteLogo']) {
	@ApiProperty({ type: Number, required: false })
	@IsInt()
	@IsOptional()
	siteLogoId?: number;
}

export class UpdateWebhookSettingsDto extends PickType(SettingsDto, ['emailWebhooks']) {
}
