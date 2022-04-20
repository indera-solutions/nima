/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const globalPrefix = 'api';
	app.setGlobalPrefix(globalPrefix);

	app.enableVersioning({ type: VersioningType.URI, defaultVersion: '2' });

	const port = process.env.PORT || 3333;

	const options = new DocumentBuilder()
		.setTitle('Nima CMS')
		.setDescription('The core api for the Nima CMS backend.')
		.setVersion('0.0.1-alpha')
		.addTag('Nima CMS')
		.addServer('http://localhost:' + port, 'Localhost')
		.addBearerAuth()
		.build();

	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup('docs', app, document, {
		swaggerOptions: {
			operationsSorter: 'method',
			persistAuthorization: true,
		},
	});
	await app.listen(port);
	Logger.log(`🚀 Application is running on: http://localhost:${ port }/${ globalPrefix }`);
}

bootstrap();
