import { Trans, useSettings } from '@nima-cms/react';
import { ProductVariantDto } from '@nima-cms/sdk';
import React from 'react';
import { STRINGS } from '../../strings/strings';

interface StockBadgeProps {
	productVariant?: ProductVariantDto;
}

export function StockBadge(props: StockBadgeProps) {
	const { data: settings } = useSettings();

	const { productVariant } = props;
	if ( !productVariant || !settings ) return <span>-</span>;
	if ( !productVariant.trackInventory ) {
		return <span>{ productVariant.stock }</span>;
	}
	const stock = productVariant.stock || 0;
	if ( stock === 0 ) {
		return <div className="badge badge-error gap-2">
			<Trans>{ STRINGS.OUT_OF_STOCK }</Trans>
		</div>;
	}

	const threshold = productVariant.stockThreshold || settings.globalStockThreshold;
	if ( stock <= threshold ) {
		return <div className="badge badge-warning  gap-2">
			{ stock } (≤{ threshold })
		</div>;
	}

	return <div className="badge badge-outline">{ stock }</div>;
}
