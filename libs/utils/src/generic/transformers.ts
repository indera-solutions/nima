import { NotFoundException } from '@nestjs/common';
import { Observable } from 'rxjs';

export function observableToPromise<T = any>(obj: Observable<T>): Promise<T> {
	return new Promise<T>((resolve, reject) => {
		obj.subscribe({
			next: value => {
				resolve(value);
			},
			error: err => reject(err),
			complete: () => console.info('Observed.'),
		});
	}).catch(reason => {
		if ( reason.response?.data?.statusCode === 404 ) throw new NotFoundException(reason);
		throw new Error(reason);
	});
}
