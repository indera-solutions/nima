import { ApiProperty, OmitType } from '@nestjs/swagger';
import { MediaDto } from '../../core/dto/media.dto';
import { ProductMediaEntity } from '../entities/ProductMedia';

export class ProductMediaDto extends OmitType(ProductMediaEntity, ['media', 'product']) {

	@ApiProperty({ type: () => MediaDto })
	media: MediaDto;

	static prepare(entity: ProductMediaEntity, options?: { isAdmin?: boolean }): ProductMediaDto {
		return {
			sortOrder: entity.sortOrder,
			media: MediaDto.prepare(entity.media),
		};

	}
}
