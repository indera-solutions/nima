import { Trans } from '@nima-cms/react';
import { MediaDto } from '@nima-cms/sdk';
import dayjs from 'dayjs';
import React from 'react';

interface MediaDetailsProps {
	media: MediaDto;
}

export function MediaDetails({ media }: MediaDetailsProps) {
	function formatBytes(a, b = 2, k = 1024) {
		const d = Math.floor(Math.log(a) / Math.log(k));
		return 0 == a ? '0 Bytes' : parseFloat((a / Math.pow(k, d)).toFixed(Math.max(0, b))) + ' ' + ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][d];
	}

	return (
		<div className={ 'flex gap-1 flex-col' }>
			<h1 className={ 'w-full text-center text-2xl' }>{ media.name }</h1>
			{ media.thumbnailUrl &&
				<img className={ 'object-contain h-full' } src={ media.thumbnailUrl } alt=""/> }
			<h3>Date: { dayjs(media.created).format('DD/MM/YYYY HH:mm') }</h3>
			<h3>Size: { formatBytes(media.byteSize) }</h3>
			<h3>Mime: { media.mimeType }</h3>
			<h3>Alt: <Trans>{ media.alt }</Trans></h3>
			<label className="input-group">
				<input
					className={ 'input input-bordered w-full' }
					readOnly value={ media.url }
				/>
				<button className="btn btn-square" onClick={ () => navigator.clipboard.writeText(media.url) }>
					Copy
				</button>
			</label>
		</div>
	);
}
