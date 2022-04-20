export interface Media {
	id?: number;
	url: string;
	name: string;
	mimeType: string;
	slug: string;
}

export interface CreateMediaDto extends Omit<Media, 'id'> {
}


export function isLoomMedia(x: unknown): x is Media {
	if ( !x ) return false;
	return !(typeof x === 'number');
}

export function isCreateLoomDto(x: unknown): x is CreateMediaDto {
	if ( !x ) return false;
	const id = (x as any)['id'];
	return !!id;
}
