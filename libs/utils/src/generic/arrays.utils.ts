export function enumToArray<T = string>(enumme: any): T[] {
	return Object.keys(enumme)
				 .map(key => enumme[key]);
}
