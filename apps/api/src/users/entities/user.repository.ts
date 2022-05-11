import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
	findByEmail(email: string): Promise<UserEntity | undefined> {
		return this.findOne({
			where: {
				email: email,
			},
		});
	}

	findById(id: number): Promise<UserEntity | undefined> {
		return this.findOne({
			where: {
				id: id,
			},
		});
	}
}
