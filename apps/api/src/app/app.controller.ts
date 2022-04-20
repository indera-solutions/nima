import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
	constructor() {
	}

	@Get('/app')
	getData() {
		return 'Hello World';
	}
}
