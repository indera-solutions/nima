import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { PaymentEntity } from './payment.entity';

@EntityRepository(PaymentEntity)
export class PaymentRepository extends BaseRepository<PaymentEntity> {

}
