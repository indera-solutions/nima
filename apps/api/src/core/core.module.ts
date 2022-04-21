import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreController } from './core.controller';
import { CoreService } from './core.service';
import { AddressEntity } from './entities/address.entity';
import { MediaEntity } from './entities/media.entity';
import { SettingsEntity } from './entities/settings.entity';

@Module({
	imports: [TypeOrmModule.forFeature([AddressEntity, MediaEntity, SettingsEntity])],
	controllers: [CoreController],
	providers: [CoreService],
})
export class CoreModule {
}
