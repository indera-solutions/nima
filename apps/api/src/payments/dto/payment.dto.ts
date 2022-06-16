import { OmitType, PartialType, PickType } from '@nestjs/swagger';
import { PaymentEntity } from '../entities/payment.entity';

export class PaymentDto extends PaymentEntity {
	static prepare(entity: PaymentEntity, options?: { isAdmin?: boolean }): PaymentDto {
		return {
			id: entity.id,
			method: entity.method,
			supportRefId: entity.supportRefId,
			status: entity.status,
			dateCreated: entity.dateCreated,
			dateUpdated: entity.dateUpdated,
			customerId: entity.customerId,
			description: entity.description,
			amount: entity.amount,
			currency: entity.currency,
			referenceId: entity.referenceId,
			transactionTicket: entity.transactionTicket,

		};
	}
}

export class CreatePaymentDto extends OmitType(PaymentDto, ['id', 'dateCreated', 'dateUpdated']) {
}

export class UpdatePaymentDto extends PartialType(PickType(CreatePaymentDto, ['status', 'supportRefId', 'referenceId', 'transactionTicket'])) {
}

export class UpdatePaymentStatusDto extends PickType(PaymentDto, ['status']) {
}
