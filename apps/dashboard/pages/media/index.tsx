import { useTranslations } from '@nima-cms/react';
import React from 'react';
import { AdminPage, MediaGallery } from '../../components';
import { STRINGS } from '../../strings/strings';

interface IndexProps {

}

export default function Index(props: IndexProps) {
	const { getAdminTranslation } = useTranslations();

	return (
		<>
			<AdminPage label={ getAdminTranslation(STRINGS.MEDIA) }>
				<MediaGallery/>
			</AdminPage>
		</>
	);
}
