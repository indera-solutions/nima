import { OmitType } from '@nestjs/swagger';
import { MediaEntity } from '../entities/media.entity';

export class MediaDto extends MediaEntity {

	static prepare(entity: MediaEntity): MediaDto {
		return {
			id: entity.id,
			mimeType: entity.mimeType,
			name: entity.name,
			url: entity.url,
			slug: entity.slug,
			alt: entity.alt,
			byteSize: entity.byteSize,
		};
	}
}

export class CreateMediaDto extends OmitType(MediaDto, ['id']) {

}
