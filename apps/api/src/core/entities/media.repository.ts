import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { MediaEntity } from './media.entity';

@EntityRepository(MediaEntity)
export class MediaRepository extends BaseRepository<MediaEntity> {

	listOfType(mimeType: string) {
		return this.find({
			where: {
				mimeType: mimeType,
			},
		});
	}

	async findById(id: number) {
		return this.findOne({ where: { id: id } });
	}

	async deleteById(id: number) {
		return this.delete(id);
	}
}
