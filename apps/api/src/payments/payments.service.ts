import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto, PaymentDto, UpdatePaymentDto } from './dto/payment.dto';
import { PaymentRepository } from './entities/payment.repository';

@Injectable()
export class PaymentsService {
	constructor(private paymentRepository: PaymentRepository) {
	}


	async save(params: { dto: CreatePaymentDto, id?: number }): Promise<PaymentDto> {
		const { dto, id } = params;
		const attribute = await this.paymentRepository.save({ ...dto, id: id });
		return PaymentDto.prepare(attribute);
	}

	async getById(params: { id: number }): Promise<PaymentDto> {
		const { id } = params;
		const attribute = await this.paymentRepository.findOne({ where: { id: id } });
		if ( !attribute ) throw new NotFoundException('ATTRIBUTE_NOT_FOUND');
		return PaymentDto.prepare(attribute);

	}

	async findAll(): Promise<PaymentDto[]> {
		const attributes = await this.paymentRepository.find();
		return [];
	}

	async deleteById(params: { id: number }): Promise<PaymentDto> {
		const { id } = params;
		const attr = await this.getById({ id });
		await this.paymentRepository.delete(id);
		return attr;
	}


	async patch(params: { id: number; dto: UpdatePaymentDto }) {
		const { id, dto } = params;
		const attr = await this.getById({ id: id });
		for ( const dtoKey in dto ) {
			attr[dtoKey] = dto[dtoKey];
		}
		return await this.save({ dto: attr, id: id });
	}
}
