import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributeValuesController } from './attribute-values.controller';
import { AttributeValuesService } from './attribute-values.service';
import { AttributesController } from './attributes.controller';
import { AttributesService } from './attributes.service';
import { AttributeValueEntity } from './entities/attribute-value.entity';
import { AttributeValuesRepository } from './entities/attribute-values.repository';
import { AttributeEntity } from './entities/attribute.entity';
import { AttributeRepository } from './entities/attribute.repository';

@Module({
	imports: [TypeOrmModule.forFeature([AttributeRepository, AttributeValuesRepository])],
	providers: [AttributesService, AttributeValuesService],
	controllers: [AttributesController, AttributeValuesController],
})
export class AttributesModule {
}

export const AttributesModuleEntities = [AttributeValueEntity, AttributeEntity];
