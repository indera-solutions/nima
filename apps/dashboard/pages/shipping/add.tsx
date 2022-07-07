import {
	getTranslation,
	Trans,
	useCreateShippingMethodMutation,
	useDeleteShippingMethodMutation,
	useLanguages,
	useShippingMethodById,
	useTranslations,
	useUpdateShippingMethodMutation,
} from '@nima-cms/react';
import { CreateShippingMethodDto } from '@nima-cms/sdk';
import { Metadata, parseIdStr } from '@nima-cms/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
	AdminColumn,
	AdminFooter,
	AdminPage,
	AdminSection,
	MetadataEditor,
	NimaTitle,
	SelectEditingLanguage,
	TranslatableInput,
} from '../../components';
import { ZoneTable } from '../../components/shipping/zoneTable';
import { NIMA_ROUTES } from '../../lib/routes';
import { STRINGS } from '../../strings/strings';

interface AddAttributeProps {

}


export default function AddShippingMethod(props: AddAttributeProps) {

	const router = useRouter();
	const { getAdminTranslation } = useTranslations();
	const languages = useLanguages();
	const id: number | undefined = router.query['id'] ? parseIdStr(router.query['id']) : undefined;
	const isEditing = !!id;

	const { data: existingMethod } = useShippingMethodById(id, { refetchInterval: false });

	const createShippingMethodMutation = useCreateShippingMethodMutation();
	const updateShippingMethodMutation = useUpdateShippingMethodMutation();
	const deleteShippingMethodMutation = useDeleteShippingMethodMutation();


	const [createShippingMethod, setCreateShippingMethod] = useState<CreateShippingMethodDto>({
		name: '',
		description: {},
		shippingZones: [],
		metadata: {},
		privateMetadata: {},
	});

	useEffect(() => {
		if ( !existingMethod ) return;
		const { id, ...rest } = existingMethod;
		setCreateShippingMethod(rest);
	}, [existingMethod]);

	function onValueEdit(name: keyof CreateShippingMethodDto, value: any) {
		setCreateShippingMethod(state => ({
			...state,
			[name]: value,
		}));
	}

	async function onCreateShippingMethod() {
		if ( !isEditing ) {
			const createdShippingMethod = await createShippingMethodMutation.mutateAsync({ createShippingMethodDto: createShippingMethod });
			toast.success('Shipping Method Created!');
			await router.push(NIMA_ROUTES.shipping.edit(createdShippingMethod.id));
		} else {
			const updatedAttributeDto = await updateShippingMethodMutation.mutateAsync({
				id,
				updateShippingMethodDto: createShippingMethod,
			});
			toast.success('Shipping Method Updated!');
		}

	}

	async function onDeleteShippingMethod() {
		if ( !id || !existingMethod ) return;
		const confirm = window.confirm(`Are you sure you want to delete ${ getTranslation(existingMethod.name, languages.adminLanguage) }?`);
		if ( confirm ) {
			await deleteShippingMethodMutation.mutateAsync({
				id: id,
			});
			toast.success('Shipping Method Deleted');
			router.push(NIMA_ROUTES.shipping.list);
		}
	}

	return (
		<>
			<NimaTitle
				title={ getAdminTranslation(isEditing ? STRINGS.SHIPPING_METHODS_UPDATE_TITLE : STRINGS.SHIPPING_METHODS_CREATE_TITLE) }/>
			<AdminPage
				label={ getAdminTranslation(isEditing ? STRINGS.SHIPPING_METHODS_UPDATE_TITLE : STRINGS.SHIPPING_METHODS_CREATE_TITLE) }
				footerContainer={ <AdminFooter>
					<Link href={ NIMA_ROUTES.shipping.list }>
						<button className={ 'btn btn-secondary' }><Trans>{ STRINGS.BACK }</Trans></button>
					</Link>

					{ existingMethod && <button className="btn btn-error"
												onClick={ onDeleteShippingMethod }>
						<Trans>{ STRINGS.DELETE }</Trans>
					</button> }

					<button className="btn btn-success"
							onClick={ onCreateShippingMethod }>
						<Trans>{ isEditing ? STRINGS.EDIT : STRINGS.CREATE }</Trans>
					</button>
				</AdminFooter> }
			>
				<AdminColumn>
					<AdminSection title={ getAdminTranslation(STRINGS.GENERAL_INFO) }
								  titleRightContainer={ <SelectEditingLanguage/> }>
						<div className="form-control w-full max-w-xs">
							<label className="label">
								<span className="label-text"><Trans>{ STRINGS.NAME }</Trans></span>
							</label>
							<input
								value={ createShippingMethod.name }
								onChange={ (e => onValueEdit('name', e.target.value)) }
								className={ 'input input-bordered' }
							/>
						</div>
						<div className="form-control w-full max-w-xs">
							<label className="label">
								<span className="label-text"><Trans>{ STRINGS.DESCRIPTION }</Trans></span>
							</label>
							<TranslatableInput
								value={ createShippingMethod.description }
								onChange={ (str => onValueEdit('description', str)) }
								className={ 'input input-bordered w-full' }
							/>
						</div>

					</AdminSection>

					{ existingMethod && <ZoneTable methodId={ id } shippingZones={ existingMethod.shippingZones }/> }

					<MetadataEditor values={ createShippingMethod.metadata as Metadata }
									onChange={ (v => onValueEdit('metadata', v)) }/>
					<MetadataEditor isPrivate values={ createShippingMethod.privateMetadata as Metadata }
									onChange={ (v => onValueEdit('privateMetadata', v)) }/>
				</AdminColumn>
			</AdminPage>
		</>
	);
}
