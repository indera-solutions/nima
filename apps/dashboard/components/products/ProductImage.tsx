import { ProductDto } from '@nima-cms/sdk';
import React from 'react';

interface ProductImageProps {
	product?: ProductDto;
	width?: number;
}

export function ProductImage(props: ProductImageProps) {
	const width = props.width || 50;
	if ( !props.product ) return null;
	if ( props.product.productMedia.length === 0 ) {
		return <img width={ width } src="/productFallback.png"/>;
	}

	return <img width={ width } src={ props.product.productMedia[0].media.thumbnailUrl }/>;

}
