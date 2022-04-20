export interface Option {
	id: number;
	optionKey: string;
	optionValue: string;
}

export interface CreateOptionDto extends Omit<Option, 'id'> {
	id?: number;
}
