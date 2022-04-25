export function getEuroValue(value: string | number | undefined): string {
	if ( value === undefined || value === null || isNaN(+value) ) {
		return '';
	}
	return value.toLocaleString('el-GR', {
		style: 'currency',
		currency: 'EUR',
		maximumFractionDigits: 2,
	});
}
