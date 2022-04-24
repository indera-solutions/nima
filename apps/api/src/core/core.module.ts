import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreController } from './core.controller';
import { CoreService } from './core.service';
import { AddressEntity } from './entities/address.entity';
import { MediaEntity } from './entities/media.entity';
import { SettingsEntity } from './entities/settings.entity';
import { SettingsController } from './settings/settings.controller';
import { SettingsService } from './settings/settings.service';

@Module({
	imports: [TypeOrmModule.forFeature([AddressEntity, MediaEntity, SettingsEntity])],
	controllers: [CoreController, SettingsController],
	providers: [CoreService, SettingsService],
})
export class CoreModule {
}
