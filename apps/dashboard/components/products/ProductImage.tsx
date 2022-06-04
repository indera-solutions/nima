import { ProductDto, ProductVariantDto } from '@nima-cms/sdk';
import React from 'react';

interface ProductImageProps {
	product?: ProductDto;
	width?: number;
}

export function getMainImageUrl(product: ProductDto, productVariant?: ProductVariantDto): string | undefined {
	const selection = productVariant && productVariant.productMedia.length > 0 ? productVariant.productMedia : product.productMedia;
	if ( selection.length === 0 ) return undefined;
	return selection.sort((a, b) => a.sortOrder - b.sortOrder)[0]?.media.url;
}


export function ProductImage(props: ProductImageProps) {
	const width = props.width || 50;
	if ( !props.product ) return null;
	if ( props.product.productMedia.length === 0 ) {
		return <img width={ width } src="/productFallback.png"/>;
	}

	return <img width={ width }
				src={ props.product.productMedia.sort((a, b) => a.sortOrder - b.sortOrder)[0].media.thumbnailUrl }/>;

}
