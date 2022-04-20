import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributesController } from './attributes.controller';
import { AttributesService } from './attributes.service';
import { AttributeRepository } from './models/attribute.repository';
import { AttributeValueEntity } from './models/attributeValue.entity';

@Module({
	imports: [TypeOrmModule.forFeature([AttributeRepository, AttributeValueEntity])],
	providers: [AttributesService],
	controllers: [AttributesController],
})
export class AttributesModule {
}
