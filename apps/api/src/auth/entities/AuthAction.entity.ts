import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';

export enum AuthActionType {
	RESET_PASSWORD = 'RESET_PASSWORD',
	VERIFY_EMAIL = 'VERIFY_EMAIL',

}

@Entity('auth_actions')
export class AuthActionEntity {
	@PrimaryGeneratedColumn('uuid')
	token: string;

	@Column({ type: 'enum', enum: AuthActionType })
	actionType: AuthActionType;

	@ManyToOne(() => UserEntity)
	user: UserEntity;

	@RelationId((relation: AuthActionEntity) => relation.user)
	userId: number;

	@CreateDateColumn()
	createdAt: string;

	@Column()
	hasLoggedInSince: boolean;
}
