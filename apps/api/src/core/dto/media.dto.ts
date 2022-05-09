import { ApiProperty, OmitType } from '@nestjs/swagger';
import { PaginatedResults } from '@nima/utils';
import { MediaEntity } from '../entities/media.entity';

export class MediaDto extends MediaEntity {

	static prepare(entity: MediaEntity): MediaDto {
		return {
			id: entity.id,
			mimeType: entity.mimeType,
			name: entity.name,
			url: entity.url,
			thumbnailUrl: entity.thumbnailUrl,
			slug: entity.slug,
			alt: entity.alt,
			byteSize: entity.byteSize,
			created: entity.created,
		};
	}
}

export class MediaListPaginated implements PaginatedResults<MediaDto> {
	@ApiProperty({ type: [MediaDto] })
	items: MediaDto[];
	@ApiProperty()
	pageNumber: number;
	@ApiProperty()
	pageSize: number;
	@ApiProperty()
	totalCount: number;

}

export class CreateMediaDto extends OmitType(MediaDto, ['id', 'created']) {

}
