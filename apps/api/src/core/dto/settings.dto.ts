import { OmitType } from '@nestjs/swagger';
import { SettingsEntity } from '../entities/settings.entity';


export class SettingsDto extends OmitType(SettingsEntity, ['id']) {
}
