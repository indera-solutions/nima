import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app/app.controller';
import { AttributesModule } from './attributes/attributes.module';
import { AttributeEntity } from './attributes/models/attribute.entity';
import { AttributeValueEntity } from './attributes/models/attributeValue.entity';
import { AddressEntity } from './core/entities/address.entity';
import { MediaEntity } from './core/entities/media.entity';
import { SettingsEntity } from './core/entities/settings.entity';
import { ProductsModule } from './products/products.module';
import { ProductTypesModule } from './product-types/product-types.module';
import { CategoriesModule } from './categories/categories.module';
import { CoreModule } from './core/core.module';
import { UserEntity } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

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
			entities: [AttributeEntity, AttributeValueEntity, AddressEntity, MediaEntity, SettingsEntity, UserEntity],
			logging: 'all',
			// logging: isDev ? ['error', 'query'] : ['error'],
			synchronize: true,
		}),
		ProductsModule,
		ProductTypesModule,
		CategoriesModule,
		CoreModule,
		UsersModule,
		AuthModule,
	],
	controllers: [AppController],
	providers: [],
})
export class AppModule {}
