import { OmitType, PickType } from '@nestjs/swagger';
import { SettingsEntity } from '../entities/settings.entity';


export class SettingsDto extends OmitType(SettingsEntity, ['id']) {
}

export class CreateSettingsDto extends OmitType(SettingsDto, ['emailWebhooks']) {
}

export class UpdateWebhookSettingsDto extends PickType(SettingsDto, ['emailWebhooks']) {
}
