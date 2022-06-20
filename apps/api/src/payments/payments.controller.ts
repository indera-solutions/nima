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
	@ApiParam({ type: Number, name: 'id' })
	@ApiNotFoundResponse({ description: 'ATTRIBUTE_NOT_FOUND' })
	@ApiOkResponse({ type: PaymentDto })
	@ApiHeader({ name: 'X-API-KEY' })
	@IsPublic()
	@UseGuards(StaffOrKeyGuard)
	getById(@Param('id') id: number): Promise<PaymentDto> {
		return this.service.getById({ id: id });
	}

	@Patch('/:id')
	@ApiOkResponse({ type: PaymentDto })
	@ApiBody({ type: UpdatePaymentDto })
	@ApiParam({ type: Number, name: 'id' })
	@ApiHeader({ name: 'X-API-KEY' })
	@IsPublic()
	@UseGuards(StaffOrKeyGuard)
	patch(@Param('id') attributeId: number, @Body() updatePaymentDto: UpdatePaymentDto): Promise<PaymentDto> {
		return this.service.patch({ id: attributeId, dto: updatePaymentDto });
	}

	//
	//
	//
	//
	// @Put('/:id')
	// @ApiOkResponse({ type: PaymentDto })
	// @ApiBody({ type: CreatePaymentDto })
	// @ApiParam({ type: Number, name: 'id' })
	// update(@Param('id') attributeId: number, @Body() createPaymentDto: CreatePaymentDto): Promise<PaymentDto> {
	// 	return this.service.save({ id: attributeId, dto: createPaymentDto });
	// }

	// @Delete('/:id')
	// @ApiOkResponse({ type: PaymentDto })
	// @ApiBody({ type: UpdatePaymentDto })
	// @ApiParam({ type: Number, name: 'id' })
	// remove(@Param('id') attributeId: number): Promise<PaymentDto> {
	// 	return this.service.deleteById({ id: attributeId });
	// }
}
