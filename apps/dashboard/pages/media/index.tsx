import React from 'react';
import { AdminPage, MediaGallery } from '../../components';

interface IndexProps {

}

export default function Index(props: IndexProps) {
	return (
		<>
			<AdminPage label={ 'Media Library' }>
				<MediaGallery/>
			</AdminPage>
		</>
	);
}
