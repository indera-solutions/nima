import React, { useState } from 'react';
import { AdminColumn, AdminSection } from '../AdminLayout';
import { AddNewMedia, AddNewMediaProps } from './AddNewMedia';
import { MediaList, MediaListProps } from './MediaList';

interface MediaGalleryProps {
	title?: string;


}


export function MediaGallery(props: MediaGalleryProps & MediaListProps & AddNewMediaProps) {
	const [display, setDisplay] = useState<'list' | 'add'>('list');

	return (
		<AdminColumn>
			<AdminSection title={ props.title || 'Media List' } titleRightContainer={ <>
				<div className="tabs">
					<a className={ 'tab tab-lg tab-lifted ' + (display === 'list' ? 'tab-active' : '') }
					   onClick={ () => setDisplay('list') }>List</a>
					<a className={ 'tab tab-lg tab-lifted ' + (display === 'add' ? 'tab-active' : '') }
					   onClick={ () => setDisplay('add') }>Upload new</a>
				</div>
			</> }>
				{ display === 'list' ? <MediaList { ...props }/> : <AddNewMedia { ...props }/> }
			</AdminSection>
		</AdminColumn>
	);
}



