import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app/app.controller';
import { AttributesModule, AttributesModuleEntities } from './attributes/attributes.module';
import { AdminGuard, LoggedInGuard, StaffGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule, CategoriesModuleEntities } from './categories/categories.module';
import { CheckoutModule, CheckoutModuleEntities } from './checkout/checkout.module';
import { CoreModule, CoreModuleEntities } from './core/core.module';
import { DiscountsModule } from './discounts/discounts.module';
import { OrderModule, OrderModuleEntities } from './order/order.module';
import { ProductTypesModule, ProductTypesModuleEntities } from './product-types/product-types.module';
import { ProductsModule, ProductsModuleEntities } from './products/products.module';
import { UserEntity } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';

const ALL_ENTITIES = [
	...AttributesModuleEntities,
	UserEntity,
	...CoreModuleEntities,
	...ProductTypesModuleEntities,
	...CategoriesModuleEntities,
	...ProductsModuleEntities,
	...OrderModuleEntities,
	...CheckoutModuleEntities,
];

@Module({
	imports: [
		AttributesModule,
		TypeOrmModule.forRoot({
			name: 'default',
			type: 'postgres',
			host: process.env['DB_HOST'] || 'localhost',
			port: 5432,
			username: process.env['DB_USERNAME'] || 'nima',
			password: process.env['DB_PASSWORD'] || 'nima',
			database: process.env['DB_DATABASE'] || 'nima',
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
		OrderModule,
		CheckoutModule,
		DiscountsModule,
	],
	controllers: [AppController],
	providers: [
		{
			provide: APP_GUARD,
			useClass: LoggedInGuard,
		},
		{
			provide: APP_GUARD,
			useClass: StaffGuard,
		},
		{
			provide: APP_GUARD,
			useClass: AdminGuard,
		},
	],
})
export class AppModule {
}
