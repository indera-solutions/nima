import { Trans, useCreateUserMutation, useTranslations, useUpdateUserMutation, useUserById } from '@nima-cms/react';
import { CreateUserDto, LanguageCode } from '@nima-cms/sdk';
import { Metadata, parseIdStr } from '@nima-cms/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AdminColumn, AdminFooter, AdminPage, AdminSection, MetadataEditor, NimaTitle } from '../../components';
import { NIMA_ROUTES } from '../../lib/routes';
import { STRINGS } from '../../strings/strings';

interface AddUserProps {

}

export default function AddUser(props: AddUserProps) {
	const { getAdminTranslation } = useTranslations();
	const router = useRouter();
	const id: number | undefined = router.query['id'] ? parseIdStr(router.query['id']) : undefined;
	const isEditing = !!id;

	const [createUserDto, setCreateUserDto] = useState<CreateUserDto>({
		email: '',
		password: '',
		isAdmin: false,
		isStaff: false,
		isActive: false,
		metadata: {},
		privateMetadata: {},
		avatar: undefined,
		firstName: '',
		languageCode: LanguageCode.en,
	});

	const { data: existingUser } = useUserById(id, { refetchInterval: false });


	const createUserMutation = useCreateUserMutation();
	const updateUserMutation = useUpdateUserMutation();


	useEffect(() => {
		if ( !existingUser ) return;
		const { id, lastLogin, createdAt, updatedAt, ...rest } = existingUser;
		setCreateUserDto({
			...rest,
			password: '',
		});
	}, [existingUser]);


	function onValueEdit(name: keyof CreateUserDto, value: any) {
		setCreateUserDto(state => ({
			...state,
			[name]: value,
		}));
	}

	async function onCreateAttribute() {
		if ( !isEditing ) {
			try {
				const createdUser = await createUserMutation.mutateAsync({ createUserDto });
				toast.success('User Created!');
				// await router.push(NIMA_ROUTES.attributes.list);
			} catch ( e: any ) {
				console.log(e);
			}
		} else {
			const updatedUserDto = await updateUserMutation.mutateAsync({
				userId: id,
				updateUserDto: createUserDto,
			});
			toast.success('User Updated!');
		}

	}


	return (
		<>
			<NimaTitle
				title={ getAdminTranslation(isEditing ? STRINGS.USER_UPDATE_TITLE : STRINGS.USER_CREATE_TITLE) }/>
			<AdminPage
				label={ getAdminTranslation(isEditing ? STRINGS.USER_UPDATE_TITLE : STRINGS.USER_CREATE_TITLE) }
				footerContainer={ <AdminFooter>
					<Link href={ NIMA_ROUTES.users.list }>
						<button className={ 'btn btn-secondary' }><Trans>{ STRINGS.BACK }</Trans></button>
					</Link>

					<button className="btn btn-success"
							onClick={ onCreateAttribute }>{ getAdminTranslation(isEditing ? STRINGS.SAVE : STRINGS.CREATE) }</button>
				</AdminFooter> }
			>
				<AdminColumn>
					<AdminSection title={ 'Authentication' }>
						<div className="form-control w-full max-w-xs">
							<label className="label">
								<span className="label-text">Email</span>
							</label>
							<input
								type={ 'email' }
								value={ createUserDto.email }
								onChange={ (e => onValueEdit('email', e.target.value)) }
								className={ 'input input-bordered' }
							/>
						</div>
						<div className="form-control w-full max-w-xs">
							<label className="label">
								<span
									className="label-text"><Trans>{ isEditing ? STRINGS.NEW_PASSWORD : STRINGS.PASSWORD }</Trans></span>
							</label>
							<input
								value={ createUserDto.password }
								onChange={ (e => onValueEdit('password', e.target.value)) }
								className={ 'input input-bordered' }
							/>
						</div>

					</AdminSection>

					<AdminSection title={ getAdminTranslation(STRINGS.INFO) }>
						<div className="form-control w-full max-w-xs">
							<label className="label">
								<span className="label-text"><Trans>{ STRINGS.FIRST_NAME }</Trans></span>
							</label>
							<input
								value={ createUserDto.firstName }
								onChange={ (e => onValueEdit('firstName', e.target.value)) }
								className={ 'input input-bordered' }
							/>
						</div>
						<div className="form-control w-full max-w-xs">
							<label className="label">
								<span className="label-text"><Trans>{ STRINGS.LAST_NAME }</Trans></span>
							</label>
							<input
								value={ createUserDto.lastName }
								onChange={ (e => onValueEdit('lastName', e.target.value)) }
								className={ 'input input-bordered' }
							/>
						</div>

					</AdminSection>


					<MetadataEditor values={ createUserDto.metadata as Metadata }
									onChange={ (v => onValueEdit('metadata', v)) }/>
					<MetadataEditor isPrivate values={ createUserDto.privateMetadata as Metadata }
									onChange={ (v => onValueEdit('privateMetadata', v)) }/>
				</AdminColumn>
				<AdminColumn>
					<AdminSection title={ getAdminTranslation(STRINGS.CONFIGURATIONS) }>
						<div className="form-control w-full max-w-xs">
							<label className="label cursor-pointer justify-start gap-4">
								<input type="checkbox" checked={ createUserDto.isStaff }
									   className="checkbox"
									   onChange={ e => onValueEdit('isStaff', e.target.checked) }
								/>
								<span className="label-text"><Trans>{ STRINGS.STAFF }</Trans></span>
							</label>
						</div>
						<div className="form-control w-full max-w-xs">
							<label className="label cursor-pointer justify-start gap-4">
								<input type="checkbox" checked={ createUserDto.isAdmin }
									   className="checkbox"
									   onChange={ e => {
										   onValueEdit('isAdmin', e.target.checked);
										   if ( e.target.checked ) onValueEdit('isStaff', e.target.checked);
									   } }
								/>
								<span className="label-text"><Trans>{ STRINGS.ADMIN }</Trans></span>
							</label>
						</div>
						<div className="form-control w-full max-w-xs">
							<label className="label cursor-pointer justify-start gap-4">
								<input type="checkbox" checked={ createUserDto.isActive }
									   className="checkbox"
									   onChange={ e => onValueEdit('isActive', e.target.checked) }
								/>
								<span className="label-text"><Trans>{ STRINGS.ACTIVE }</Trans></span>
							</label>
						</div>
					</AdminSection>
				</AdminColumn>
			</AdminPage>
		</>
	);
}
