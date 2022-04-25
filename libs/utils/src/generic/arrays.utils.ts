export function enumToArray(enumme: any): string[] {
	return Object.keys(enumme)
				 .map(key => enumme[key]);
}
