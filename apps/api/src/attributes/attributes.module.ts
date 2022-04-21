import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributesController } from './attributes.controller';
import { AttributesService } from './attributes.service';
import { AttributeEntity } from './entities/attribute.entity';
import { AttributeRepository } from './entities/attribute.repository';
import { AttributeValueEntity } from './entities/attributeValue.entity';

@Module({
	imports: [TypeOrmModule.forFeature([AttributeRepository, AttributeValueEntity])],
	providers: [AttributesService],
	controllers: [AttributesController],
})
export class AttributesModule {
}

export const AttributesModuleEntities = [AttributeValueEntity, AttributeEntity];
