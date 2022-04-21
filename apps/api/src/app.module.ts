import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app/app.controller';
import { AttributesModule, AttributesModuleEntities } from './attributes/attributes.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { CoreModule, CoreModuleEntities } from './core/core.module';
import { ProductTypesModule, ProductTypesModuleEntities } from './product-types/product-types.module';
import { ProductsModule } from './products/products.module';
import { UserEntity } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';

const ALL_ENTITIES = [...AttributesModuleEntities, UserEntity, ...CoreModuleEntities, ...ProductTypesModuleEntities];

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
			entities: ALL_ENTITIES,
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
export class AppModule {
}
