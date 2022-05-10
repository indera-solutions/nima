import { ApiProperty, OmitType } from '@nestjs/swagger';
import { PaginatedResults } from '@nima-cms/utils';
import { IsInt } from 'class-validator';
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

export interface ISortableMediaEntity {
	media: MediaEntity,
	sortOrder: number
}

export class SortableMediaDto {

	@ApiProperty({ type: Number, example: 1 })
		// @IsInt()
	sortOrder: number;

	@ApiProperty({ type: () => MediaDto })
	media: MediaDto;

	static prepare(entity: ISortableMediaEntity): SortableMediaDto {
		return {
			sortOrder: entity.sortOrder,
			media: MediaDto.prepare(entity.media),
		};

	}
}

export class CreateSortableMediaDto extends OmitType(SortableMediaDto, ['media']) {
	@ApiProperty()
	@IsInt()
	mediaId: number;
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
