import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributeValuesController } from './controllers/attribute-values.controller';
import { AttributesController } from './controllers/attributes.controller';
import { AttributeValueEntity } from './entities/attribute-value.entity';
import { AttributeEntity } from './entities/attribute.entity';
import { AttributeValuesRepository } from './repositories/attribute-values.repository';
import { AttributeRepository } from './repositories/attribute.repository';
import { AttributeValuesService } from './services/attribute-values.service';
import { AttributesService } from './services/attributes.service';

@Module({
	imports: [TypeOrmModule.forFeature([AttributeRepository, AttributeValuesRepository])],
	providers: [AttributesService, AttributeValuesService],
	controllers: [AttributesController, AttributeValuesController],
	exports: [AttributesService, AttributeValuesService],
})
export class AttributesModule {
}

export const AttributesModuleEntities = [AttributeValueEntity, AttributeEntity];
