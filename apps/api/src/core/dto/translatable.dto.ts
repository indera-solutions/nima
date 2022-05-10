import { ApiProperty } from '@nestjs/swagger';
import { Translatable } from '@nima-cms/utils';

export class TranslatableDto implements Translatable {
	@ApiProperty({ type: String, required: false })
	de?: string;
	@ApiProperty({ type: String, required: false })
	it?: string;
	@ApiProperty({ type: String, required: false })
	fr?: string;
	@ApiProperty({ type: String, required: false })
	es?: string;
	@ApiProperty({ type: String, required: false })
	el?: string;
	@ApiProperty({ type: String, required: false })
	en?: string;
}
