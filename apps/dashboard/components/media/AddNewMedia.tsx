import { Trans, useMediaUploadMutation } from '@nima-cms/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { STRINGS } from '../../strings/strings';

export interface AddNewMediaProps {

}

export function AddNewMedia(props: AddNewMediaProps) {
	const [filesList, setFilesList] = useState<File[]>([]);
	const [progress, setProgress] = useState<Record<string, number>>({});
	const mediaUploadMutation = useMediaUploadMutation({
		onProgress: onProgress,
	});
	const onDrop = useCallback(acceptedFiles => {
		setFilesList(acceptedFiles);
	}, [setFilesList]);

	useEffect(() => {

		setProgress(state => {
			const temp = { ...state };
			filesList.forEach(f => {
				if ( temp[f.name] === undefined ) {
					temp[f.name] = 0;
					mediaUploadMutation.mutateAsync({
						file: f,
					});
				}
			});
			return temp;
		});
	}, [filesList]);

	function onProgress(progress: number, fileName: string) {
		setProgress(state => ({
			...state,
			[fileName]: progress,
		}));
	}

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });


	return (
		<>
			<div { ...getRootProps() }
				 className={ 'flex flex-col justify-center items-center w-full h-96 bg-gray-50 border-dashed border-2 border-gray-600 rounded-lg' }>
				<input { ...getInputProps() } />
				{
					isDragActive ?
						<p><Trans>{ STRINGS.DROP_HERE }</Trans></p> :
						<p><Trans>{ STRINGS.DRAGNDROP_MEDIA }</Trans></p>
				}
				<div className={ 'mt-4' }>
					{ Object.keys(progress).map(fileName => {
						return <div key={ fileName } className={ 'flex gap-4 items-center' }>
							{ fileName }
							<progress className="progress w-56" value={ progress[fileName] || 0 } max="100"></progress>
						</div>;
					}) }
				</div>
			</div>
		</>
	);
}
