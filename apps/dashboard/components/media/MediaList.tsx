import { useMediaPaginated } from '@nima-cms/react';
import { MediaDto } from '@nima-cms/sdk';
import React, { useEffect, useMemo, useState } from 'react';
import { useDebounce } from 'use-debounce';

export interface MediaListProps {
	selectedId?: number[];
	onSelect?: (ids: number[]) => void;
	isMulti?: boolean;
}

export function MediaList(props: MediaListProps) {
	const [searchStr, setSearchStr] = useState<string | undefined>(undefined);
	const [debouncedSearch] = useDebounce(searchStr, 1000);

	const [selectedIds, setSelectedIds] = useState<number[]>([]);
	const { data: mediaListResponse, hasNextPage, isFetchingNextPage, fetchNextPage } = useMediaPaginated({ pageSize: 40, search: debouncedSearch });
	const allMedia = useMemo(() => {
		if ( !mediaListResponse || !mediaListResponse.pages ) return [];
		return mediaListResponse.pages.map(p => p.items).flat();
	}, [mediaListResponse]);

	useEffect(() => {
		setSelectedIds(props.selectedId || []);
	}, [props.selectedId]);


	function onImageSelect(media: MediaDto) {
		if ( !props.onSelect ) {
			return;
		}
		setSelectedIds(state => {
			let temp = [...state];
			if ( props.isMulti ) {
				const existingIndex = temp.indexOf(media.id);
				if ( existingIndex >= 0 ) {
					temp.splice(existingIndex, 1);
				} else {
					temp.push(media.id);
				}
			} else {
				temp = [media.id];
			}

			return temp;
		});
	}


	return (
		<>
			{ props.onSelect && <div className={ 'flex justify-end gap-4' }>
				<button className={ 'btn btn-primary' } onClick={ () => {
					setSelectedIds([]);
					props.onSelect([]);
				} }>Clear
				</button>
				<button className={ 'btn btn-success' } onClick={ () => props.onSelect(selectedIds) }>Select</button>
			</div> }
			<div className="form-control w-full max-w-xs">
				<label className="label">
					<span className="label-text">Search</span>
				</label>
				<input className={ 'input w-full max-w-xs input-bordered' }
					   type="text"
					   value={ searchStr || '' }
					   onChange={ (e) => setSearchStr(e.target.value) }
				/>
			</div>
			<div className={ 'flex flex-col gap-4' }>
				<div className={ 'flex gap-4  flex-wrap' }>
					{ allMedia.map(media => <div key={ media.id }
												 onClick={ () => onImageSelect(media) }
												 className={ 'flex basis-1/12 justify-center items-center border w-28 h-28 ' + (selectedIds.includes(media.id) ? 'border-double border-4 border-indigo-600' : '') }>
							{ media.thumbnailUrl ?
								<img className={ 'object-contain h-full' } src={ media.thumbnailUrl } alt=""/> :
								<div className={ '' }>{ media.name }</div> }
						</div>,
					) }
				</div>
				<div className={ 'text-center' }>
					{ hasNextPage && <button onClick={ () => fetchNextPage() }
											 className={ 'btn btn-primary ' + (isFetchingNextPage ? 'loading' : '') }>Load
						More...</button> }
				</div>
			</div>
		</>
	);
}
