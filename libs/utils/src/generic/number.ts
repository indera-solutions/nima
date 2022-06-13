export function roundToDigit(input: number, digits = 2): number {
	if ( Number.isInteger(digits) ) {
		const temp = Math.pow(10, digits);
		return Math.round((input + Number.EPSILON) * temp) / temp;
	}
}
