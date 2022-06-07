import { Body, Controller } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {
	}

	// @Post()
	getData(@Body() payload: any) {
		// console.log({ payload });
		// return this.appService.getData();
	}
}
