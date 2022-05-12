import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressService } from './address/address.service';
import { CoreController } from './core.controller';
import { CoreService } from './core.service';
import { AddressEntity } from './entities/address.entity';
import { MediaEntity } from './entities/media.entity';
import { MediaRepository } from './entities/media.repository';
import { SettingsEntity } from './entities/settings.entity';
import { MediaController } from './media/media.controller';
import { MediaService } from './media/media.service';
import { SettingsController } from './settings/settings.controller';
import { SettingsService } from './settings/settings.service';

@Module({
	imports: [TypeOrmModule.forFeature([AddressEntity, MediaRepository, SettingsEntity])],
	controllers: [CoreController, SettingsController, MediaController],
	providers: [CoreService, SettingsService, MediaService, AddressService],
	exports: [MediaService, AddressService],
})
export class CoreModule {
}

export const CoreModuleEntities = [AddressEntity, MediaEntity, SettingsEntity];
