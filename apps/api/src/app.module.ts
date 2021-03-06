import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributesModule, AttributesModuleEntities } from './attributes/attributes.module';
import { AdminGuard, StaffGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';
import { AuthActionEntity } from './auth/entities/AuthAction.entity';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { CategoriesModule, CategoriesModuleEntities } from './categories/categories.module';
import { CheckoutModule, CheckoutModuleEntities } from './checkout/checkout.module';
import { CollectionsModule, CollectionsModuleEntities } from './collections/collections.module';
import { CoreModule, CoreModuleEntities } from './core/core.module';
import { DiscountsModule, DiscountsModuleEntities } from './discounts/discounts.module';
import { EmailModule } from './email/email.module';
import { OrderModule, OrderModuleEntities } from './order/order.module';
import { PaymentsModule, PaymentsModuleEntities } from './payments/payments.module';
import { ProductTypesModule, ProductTypesModuleEntities } from './product-types/product-types.module';
import { ProductsModule, ProductsModuleEntities } from './products/products.module';
import { ShippingModule, ShippingModuleEntities } from './shipping/shipping.module';
import { UserEntity } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';

const ALL_ENTITIES = [
	...AttributesModuleEntities,
	UserEntity,
	AuthActionEntity,
	...CoreModuleEntities,
	...ProductTypesModuleEntities,
	...CategoriesModuleEntities,
	...ProductsModuleEntities,
	...OrderModuleEntities,
	...CheckoutModuleEntities,
	...PaymentsModuleEntities,
	...ShippingModuleEntities,
	...CollectionsModuleEntities,
	...DiscountsModuleEntities,
];

@Module({
	imports: [
		TypeOrmModule.forRoot({
			name: 'default',
			type: 'postgres',
			host: process.env['DB_HOST'] || 'localhost',
			port: 5432,
			username: process.env['DB_USERNAME'] || 'nima',
			password: process.env['DB_PASSWORD'] || 'nima',
			database: process.env['DB_DATABASE'] || 'nima',
			entities: ALL_ENTITIES,
			logging: ['error'],
			// logging: true,
			synchronize: true,
		}),
		EventEmitterModule.forRoot(),
		AttributesModule,
		ProductsModule,
		ProductTypesModule,
		CategoriesModule,
		CoreModule,
		UsersModule,
		AuthModule,
		OrderModule,
		CheckoutModule,
		DiscountsModule,
		PaymentsModule,
		ShippingModule,
		CollectionsModule,
		EmailModule,
	],
	providers: [
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard,
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
