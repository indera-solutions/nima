import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { initializeTransactionalContext } from 'typeorm-transactional-cls-hooked';

import { AppModule } from './app.module';
import { SwaggerDarkModeCss } from './swagger-dark-mode.css';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const globalPrefix = 'api';
	app.setGlobalPrefix(globalPrefix);

	app.enableCors();

	app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });

	const port = process.env.PORT || 3333;

	const options = new DocumentBuilder()
		.setTitle('Nima CMS')
		.setDescription('The core api for the Nima CMS backend.')
		.setVersion('0.0.1-alpha')
		.addTag('Nima CMS')
		.addServer('http://localhost:' + port, 'Localhost')
		.addBearerAuth()
		.build();

	const document = SwaggerModule.createDocument(app, options, {
		operationIdFactory: (controllerKey: string, methodKey: string) => {
			return (controllerKey.replace('Controller', '')) + '_' + methodKey;
		},
	});
	SwaggerModule.setup('docs', app, document, {
		swaggerOptions: {
			operationsSorter: 'method',
			persistAuthorization: true,
		},
		customCss: SwaggerDarkModeCss,
	});

	app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

	await app.listen(port);
	Logger.log(`🚀 Application is running on: http://localhost:${ port }/${ globalPrefix }`);
	Logger.log(`🚀 Swagger is running on: http://localhost:${ port }/docs`);
}

initializeTransactionalContext();

bootstrap();
