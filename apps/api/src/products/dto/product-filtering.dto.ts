import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { LanguageCode, PaginatedResults } from '@nima-cms/utils';
import { IsBoolean, IsEnum, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';
import { ProductDto } from './product.dto';

export class AttributeDrillDownValuesDto {
	@ApiProperty()
	attributeValueSlug: string;
	@ApiProperty()
	attributeValueId: number;
	@ApiProperty()
	count: number;
}

export class AttributeDrillDownDto {
	@ApiProperty()
	attributeId: number;
	@ApiProperty()
	attributeSlug: string;
	@ApiProperty({ type: AttributeDrillDownValuesDto, isArray: true })
	fieldValues: AttributeDrillDownValuesDto[];
}

export class ProductQueryFilterDto {
	@ApiProperty()
	attributeSlug: string;
	@ApiProperty()
	values: string[];
}

export class ProductFilterResultDto implements PaginatedResults<ProductDto> {
	@ApiProperty({ type: [AttributeDrillDownDto] })
	attributeDrillDown: AttributeDrillDownDto[];

	@ApiProperty()
	minPrice?: number;

	@ApiProperty()
	maxPrice?: number;

	@ApiProperty()
	selectedMinPrice: number;

	@ApiProperty()
	selectedMaxPrice: number;

	@ApiProperty({ type: [ProductDto] })
	items: ProductDto[];

	@ApiProperty()
	pageNumber: number;

	@ApiProperty()
	pageSize: number;

	@ApiProperty()
	totalCount: number;
}

export enum ProductSorting {
	NAME_ASC = 'NAME_ASC',
	NAME_DESC = 'NAME_DESC',
	PRICE_ASC = 'PRICE_ASC',
	PRICE_DESC = 'PRICE_DESC',
	DATE_CREATED_ASC = 'DATE_CREATED_ASC',
	DATE_CREATED_DESC = 'DATE_CREATED_DESC',
	RATING_ASC = 'RATING_ASC',
	RATING_DESC = 'RATING_DESC',
}

export class ProductFilterParamsDto {
	@ApiProperty({ type: [Number], required: false })
	@IsInt({ each: true })
	@IsOptional()
	attributeValueIds?: number[];

	@ApiPropertyOptional({ type: Number, required: false })
	@IsNumber()
	@IsOptional()
	minPrice?: number;

	@ApiPropertyOptional({ type: Number, required: false })
	@IsNumber()
	@IsOptional()
	maxPrice?: number;

	@ApiPropertyOptional({ enum: ProductSorting, required: false, enumName: 'ProductSorting' })
	@IsEnum(ProductSorting)
	@IsOptional()
	sorting?: ProductSorting;

	@ApiProperty({ enum: LanguageCode, enumName: 'LanguageCode', required: false })
	@IsEnum(LanguageCode)
	@IsOptional()
	language?: LanguageCode;

	@ApiPropertyOptional({ type: String, required: false })
	@IsString()
	@IsOptional()
	search?: string;

	@ApiPropertyOptional({ type: Boolean, required: false })
	@IsBoolean()
	@IsOptional()
	variants?: boolean;

	@ApiProperty({ type: Number, required: false })
	@IsInt()
	@IsOptional()
	itemsPerPage?: number;

	@ApiProperty({ type: Number, required: false })
	@IsInt()
	@IsOptional()
	page?: number;

	@ApiPropertyOptional({ type: Number, required: false })
	@IsInt()
	@IsOptional()
	categoryId?: number;

	@ApiPropertyOptional({ type: Number, required: false })
	@IsInt()
	@IsOptional()
	collectionId?: number;
}

