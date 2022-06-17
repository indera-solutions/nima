import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto, PaymentDto, UpdatePaymentDto } from './dto/payment.dto';
import { PaymentRepository } from './entities/payment.repository';

@Injectable()
export class PaymentsService {
	constructor(private paymentRepository: PaymentRepository) {
	}

	async save(params: { dto: CreatePaymentDto, id?: number }): Promise<PaymentDto> {
		const { dto, id } = params;
		const payment = await this.paymentRepository.save({ ...dto, id: id });
		return PaymentDto.prepare(payment);
	}

	async getById(params: { id: number }): Promise<PaymentDto> {
		const { id } = params;
		const payment = await this.paymentRepository.findOne(id);
		if ( !payment ) throw new NotFoundException('ATTRIBUTE_NOT_FOUND');
		return PaymentDto.prepare(payment);

	}

	async findAll(): Promise<PaymentDto[]> {
		const payments = await this.paymentRepository.find();
		return [];
	}

	async deleteById(params: { id: number }): Promise<PaymentDto> {
		const { id } = params;
		const paymentDto = await this.getById({ id });
		await this.paymentRepository.delete(id);
		return paymentDto;
	}

	async patch(params: { id: number; dto: UpdatePaymentDto }) {
		const { id, dto } = params;
		const payment = await this.getById({ id: id });
		for ( const dtoKey in dto ) {
			payment[dtoKey] = dto[dtoKey];
		}
		return await this.save({ dto: payment, id: id });
	}
}
