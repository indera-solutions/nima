import { ApiBody } from '@nestjs/swagger';

export const ApiMultiFile = (fileName = 'files'): MethodDecorator => (
	target: any,
	propertyKey: string,
	descriptor: PropertyDescriptor,
) => {
	ApiBody({
		required: true,
		schema: {
			type: 'object',
			properties: {
				[fileName]: {
					type: 'array',
					items: {
						type: 'string',
						format: 'binary',
					},
				},
			},
		},
	})(target, propertyKey, descriptor);
};

export const ApiFile = (fileName = 'file'): MethodDecorator => (
	target: any,
	propertyKey: string,
	descriptor: PropertyDescriptor,
) => {
	ApiBody({
		required: true,
		schema: {
			type: 'object',
			properties: {
				[fileName]: {
					type: 'string',
					format: 'binary',
				},
			},
		},
	})(target, propertyKey, descriptor);
};
