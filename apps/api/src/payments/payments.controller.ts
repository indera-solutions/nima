import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiBody,
	ApiHeader,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiParam,
	ApiTags,
} from '@nestjs/swagger';
import { IsPublic } from '../auth/auth.decorator';
import { StaffOrKeyGuard } from '../auth/combo-auth.guard';
import { PaymentDto, UpdatePaymentDto } from './dto/payment.dto';
import { PaymentsService } from './payments.service';

@Controller('payments')
@ApiTags('Payments')
@ApiBearerAuth()
export class PaymentsController {
	constructor(private service: PaymentsService) {
	}

	// @Post()
	// @ApiOkResponse({ type: PaymentDto })
	// @ApiBody({ type: CreatePaymentDto })
	// create(@Body() createPaymentDto: CreatePaymentDto): Promise<PaymentDto> {
	// 	return this.service.save({ dto: createPaymentDto });
	// }
	//
	// @Get()
	// @ApiOkResponse({ type: [PaymentDto] })
	// findAll(): Promise<PaymentDto[]> {
	// 	return this.service.findAll();
	// }

	@Get('/:id')
	@ApiParam({ type: String, name: 'id' })
	@ApiNotFoundResponse({ description: 'ATTRIBUTE_NOT_FOUND' })
	@ApiOkResponse({ type: PaymentDto })
	@ApiHeader({ name: 'X-API-KEY' })
	@IsPublic()
	@UseGuards(StaffOrKeyGuard)
	getById(@Param('id') id: string): Promise<PaymentDto> {
		return this.service.getById({ id: id });
	}

	@Patch('/:id')
	@ApiOkResponse({ type: PaymentDto })
	@ApiBody({ type: UpdatePaymentDto })
	@ApiParam({ type: String, name: 'id' })
	@ApiHeader({ name: 'X-API-KEY' })
	@IsPublic()
	@UseGuards(StaffOrKeyGuard)
	patch(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto): Promise<PaymentDto> {
		return this.service.patch({ id: id, dto: updatePaymentDto });
	}
}
