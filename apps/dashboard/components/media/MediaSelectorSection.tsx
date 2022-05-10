import { useMediaById } from '@nima-cms/react';
import { CreateSortableMediaDto } from '@nima-cms/sdk';
import React, { useCallback, useMemo, useRef } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { SVGPlus } from '../../assets/SVGIcons';
import { AdminSection } from '../AdminLayout';
import { MediaGallery } from './MediaGallery';

interface MediaSelectorSectionProps {
	isMulti?: boolean;
	sortableMedia: CreateSortableMediaDto[];
	onSelect: (media: CreateSortableMediaDto[]) => void;
}

export function MediaSelectorSection(props: MediaSelectorSectionProps) {

	const closeLabelRef = useRef<HTMLLabelElement>();

	const sortedMedia = useMemo(() => {
		const temp: CreateSortableMediaDto[] = [...props.sortableMedia];
		temp.sort((a, b) => a.sortOrder - b.sortOrder);
		return temp;
	}, [props.sortableMedia]);

	const ids = useMemo(() => {
		return sortedMedia.map(m => m.mediaId);
	}, [sortedMedia]);

	function onSelect(ids: number[]) {
		props.onSelect(ids.map((id, index) => ({
			mediaId: id,
			sortOrder: index,
		})));
		if ( closeLabelRef.current ) closeLabelRef.current.click();
	}

	const onDragEnd = useCallback((result) => {
		const reorder = (list: number[], startIndex, endIndex) => {
			const result = Array.from(list);
			const [removed] = result.splice(startIndex, 1);
			result.splice(endIndex, 0, removed);

			return result;
		};
		const newArray = reorder([...ids], result.source.index, result.destination.index);
		const newOrder: CreateSortableMediaDto[] = newArray.map((t, i) => ({
			mediaId: t,
			sortOrder: i,
		}));
		props.onSelect(newOrder);
	}, [ids]);


	return (
		<>
			<AdminSection title={ 'Media' } titleRightContainer={ <>
				<label htmlFor="mediaSelectorModal" className={ 'btn btn-primary gap-2' }>
					<SVGPlus width={ '20' } height={ '20' }/>
					Add Media
				</label>
			</> }>
				<DragDropContext onDragEnd={ onDragEnd }>
					<Droppable droppableId="droppable" direction="horizontal">
						{ (provided, snapshot) => (
							<div
								ref={ provided.innerRef }
								className={ 'flex gap-4' }
								{ ...provided.droppableProps }
							>
								{ sortedMedia.map((media, index) => (
									<Draggable key={ media.mediaId } draggableId={ media.mediaId + '' } index={ index }>
										{ (provided, snapshot) => (
											<div

												ref={ provided.innerRef }
												{ ...provided.draggableProps }
												{ ...provided.dragHandleProps }
											>
												<div className={ 'flex justify-center items-center border w-28 h-28 ' }>
													<ImageItem id={ media.mediaId }/>
												</div>
											</div>
										) }
									</Draggable>
								)) }
							</div>
						) }
					</Droppable>
				</DragDropContext>

			</AdminSection>
			<input type="checkbox" id="mediaSelectorModal" className="modal-toggle"/>
			<div className="modal">
				<div className="modal-box min-w-[90%] h-screen">
					<label htmlFor="mediaSelectorModal"
						   ref={ closeLabelRef }
						   className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
					<MediaGallery selectedId={ ids } isMulti={ props.isMulti } onSelect={ onSelect }/>
				</div>
			</div>
		</>
	);
}

function ImageItem(props: { id: number }) {
	const { data: media } = useMediaById(props.id);
	if ( !media ) return null;
	return <img className={ 'h-full' } src={ media.thumbnailUrl } alt=""/>;
}

