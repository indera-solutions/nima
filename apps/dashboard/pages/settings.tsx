import { SettingsDto } from '@nima/sdk';
import { LanguageCode, languages } from '@nima/utils';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { AdminColumn, AdminFooter, AdminPage, AdminSection, NimaTitle } from '../components';
import { useSettings, useUpdateSettings } from '../lib/reactQuery/settings.queries';

interface SettingsProps {

}

const languagesOptions = languages.map(l => ({ value: l.code, label: l.name }));

export default function SettingsPage(props: SettingsProps) {

	const { data: existingSettings, isSuccess } = useSettings();
	const updateSettingsMutation = useUpdateSettings();

	const [settings, setSettings] = useState<SettingsDto>({
		siteName: '',
		siteLogo: undefined,
		adminLanguage: LanguageCode.en,
		availableLanguages: [LanguageCode.en],
		baseUrl: '',
		canRegister: false,
		defaultLanguage: LanguageCode.en,
		senderEmail: '',
		senderName: '',
		seoDescription: '',
		seoTitle: '',
		shopAddress: undefined,
	});

	useEffect(() => {
		if ( isSuccess && existingSettings ) {
			setSettings(existingSettings);
		}
	}, [existingSettings, isSuccess]);

	function onEditValue(name: keyof SettingsDto, value) {
		setSettings(state => ({ ...state, [name]: value }));
	}

	async function onSave() {
		await updateSettingsMutation.mutateAsync({ settings });
	}

	return (
		<>
			<NimaTitle title={ 'Settings' }/>
			<AdminPage label={ 'Settings' } footerContainer={ <AdminFooter>
				<button className={ 'btn btn-success' } onClick={ onSave }>Save</button>
			</AdminFooter> }>
				<AdminColumn>
					<AdminSection title={ 'General Settings' }>
						<div className="form-control w-full max-w-xs">
							<label className="label">
								<span className="label-text">Site Name</span>
							</label>
							<input type="text" value={ settings.siteName }
								   onChange={ (e) => onEditValue('siteName', e.target.value) }
								   className="input input-bordered w-full max-w-xs"/>
						</div>
						<div className="form-control w-full max-w-xs">
							<label className="label">
								<span className="label-text">Base URL</span>
							</label>
							<input type="text" value={ settings.baseUrl }
								   onChange={ (e) => onEditValue('baseUrl', e.target.value) }
								   className="input input-bordered w-full max-w-xs"/>
						</div>
						<div className="form-control">
							<label className="label cursor-pointer justify-start gap-4">
								<input type="checkbox" className="toggle" checked={ settings.canRegister }
									   onChange={ event => onEditValue('canRegister', event.target.checked) }/>
								<span className="label-text">Users can register themselves</span>
							</label>
						</div>
					</AdminSection>
					<AdminSection title={ 'Languages' }>
						<label className="label">
							<span className="label-text">Admin Language</span>
						</label>
						<Select
							value={ { value: settings.adminLanguage, label: languagesOptions.find(lo => lo.value === settings.adminLanguage)?.label } }
							options={ languagesOptions }
							onChange={ (e) => {
								onEditValue('adminLanguage', e.value);
							} }
						/>

						<label className="label">
							<span className="label-text">Available Languages</span>
						</label>
						<Select
							value={ settings.availableLanguages.map(al => ({ value: al, label: languagesOptions.find(lo => lo.value === al)?.label })) }
							options={ languagesOptions }
							isMulti
							onChange={ (e) => {
								console.log(e);
								onEditValue('availableLanguages', e.map(option => option.value));
							} }
						/>
						<label className="label">
							<span className="label-text">Default Language</span>
						</label>
						<Select
							value={ { value: settings.defaultLanguage, label: languagesOptions.find(lo => lo.value === settings.defaultLanguage)?.label } }
							options={ languagesOptions.filter(lo => settings.availableLanguages.includes(lo.value)) }
							onChange={ (e) => {
								onEditValue('defaultLanguage', e.value);
							} }
						/>


					</AdminSection>
					<AdminSection title={ 'Emails' }>
						<div className="form-control w-full max-w-xs">
							<label className="label">
								<span className="label-text">Sender Email</span>
							</label>
							<input type="text" value={ settings.senderEmail }
								   onChange={ (e) => onEditValue('senderEmail', e.target.value) }
								   className="input input-bordered w-full max-w-xs"/>
						</div>
						<div className="form-control w-full max-w-xs">
							<label className="label">
								<span className="label-text">Sender Name</span>
							</label>
							<input type="text" value={ settings.senderName }
								   onChange={ (e) => onEditValue('senderName', e.target.value) }
								   className="input input-bordered w-full max-w-xs"/>
						</div>
					</AdminSection>
					<AdminSection title={ 'SEO' }>
						<div className="form-control w-full max-w-xs">
							<label className="label">
								<span className="label-text">SEO Title</span>
							</label>
							<input type="text" value={ settings.seoTitle }
								   onChange={ (e) => onEditValue('seoTitle', e.target.value) }
								   className="input input-bordered w-full max-w-xs"/>
						</div>
						<div className="form-control w-full max-w-xs">
							<label className="label">
								<span className="label-text">SEO Description</span>
							</label>
							<input type="text" value={ settings.seoDescription }
								   onChange={ (e) => onEditValue('seoDescription', e.target.value) }
								   className="input input-bordered w-full max-w-xs"/>
						</div>
					</AdminSection>
				</AdminColumn>

			</AdminPage>
		</>
	);
}
