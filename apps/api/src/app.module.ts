import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app/app.controller';
import { AttributesModule } from './attributes/attributes.module';
import { AttributeEntity } from './attributes/models/attribute.entity';
import { AttributeValueEntity } from './attributes/models/attributeValue.entity';
import { ProductsModule } from './products/products.module';
import { ProductTypesModule } from './product-types/product-types.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
	imports: [
		AttributesModule,
		TypeOrmModule.forRoot({
			name: 'default',
			type: 'postgres',
			host: process.env['DB_HOST'] || 'localhost',
			port: 5432,
			username: process.env['DB_USERNAME'] || 'nima',
			password: 'nima',
			database: 'nima',
			entities: [AttributeEntity, AttributeValueEntity],
			logging: 'all',
			// logging: isDev ? ['error', 'query'] : ['error'],
			synchronize: true,
		}),
		ProductsModule,
		ProductTypesModule,
		CategoriesModule,
	],
	controllers: [AppController],
	providers: [],
})
export class AppModule {}
