import { Trans, useTranslations } from '@nima-cms/react';
import React, { useState } from 'react';
import { STRINGS } from '../../strings/strings';
import { AdminColumn, AdminSection } from '../AdminLayout';
import { AddNewMedia, AddNewMediaProps } from './AddNewMedia';
import { MediaList, MediaListProps } from './MediaList';

interface MediaGalleryProps {
	title?: string;


}


export function MediaGallery(props: MediaGalleryProps & MediaListProps & AddNewMediaProps) {
	const [display, setDisplay] = useState<'list' | 'add'>('list');
	const { getAdminTranslation } = useTranslations();

	return (
		<AdminColumn>
			<AdminSection title={ props.title || getAdminTranslation(STRINGS.MEDIA_LIST) } titleRightContainer={ <>
				<div className="tabs">
					<a className={ 'tab tab-lg tab-lifted ' + (display === 'list' ? 'tab-active' : '') }
					   onClick={ () => setDisplay('list') }><Trans>{ STRINGS.LIST }</Trans></a>
					<a className={ 'tab tab-lg tab-lifted ' + (display === 'add' ? 'tab-active' : '') }
					   onClick={ () => setDisplay('add') }><Trans>{ STRINGS.UPLOAD_NEW }</Trans></a>
				</div>
			</> }>
				{ display === 'list' ? <MediaList { ...props }/> : <AddNewMedia { ...props }/> }
			</AdminSection>
		</AdminColumn>
	);
}



