import {
	getTranslation,
	Trans,
	useCollectionById,
	useCreateCollectionMutation,
	useDeleteCollectionMutation,
	useLanguages,
	useTranslations,
	useUpdateCollectionMutation,
} from '@nima-cms/react';
import { CreateCollectionDto } from '@nima-cms/sdk';
import { getSlug, Metadata, parseIdStr } from '@nima-cms/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
	AdminColumn,
	AdminFooter,
	AdminPage,
	AdminSection,
	CollectionProductList,
	MediaSelectorSection,
	MetadataEditor,
	NimaTitle,
	SelectEditingLanguage,
	TranslatableInput,
} from '../../components';
import { NIMA_ROUTES } from '../../lib/routes';
import { STRINGS } from '../../strings/strings';

interface AddCollectionProps {

}


export default function AddCollection(props: AddCollectionProps) {
	const router = useRouter();
	const { getAdminTranslation } = useTranslations();
	const languages = useLanguages();
	const id: number | undefined = router.query['id'] ? parseIdStr(router.query['id']) : undefined;
	const isEditing = !!id;

	const createCollectionMutation = useCreateCollectionMutation();
	const updateCollectionMutation = useUpdateCollectionMutation();
	const deleteCollectionMutation = useDeleteCollectionMutation();
	const { data: existingCollection } = useCollectionById(id, { refetchInterval: false });

	const title = getAdminTranslation(existingCollection ? STRINGS.COLLECTION_UPDATE_TITLE(getAdminTranslation(existingCollection.name)) : STRINGS.COLLECTION_CREATE_TITLE);

	useEffect(() => {
		if ( !existingCollection ) return;
		const { id, products, backgroundImage, ...rest } = existingCollection;

		setCreateCollectionDto({
			...rest,
			products: products.map((p, index) => ({ productId: p.product.id, sortOrder: p.sortOrder })),
			backgroundImageId: backgroundImage?.id,
		});
	}, [existingCollection]);


	const [createCollectionDto, setCreateCollectionDto] = useState<CreateCollectionDto>({
		name: {},
		description: {},
		backgroundImageId: undefined,
		slug: '',
		products: [],
		seoTitle: {},
		seoDescription: {},
		metadata: {},
		privateMetadata: {},
	});


	function onValueEdit(name: keyof CreateCollectionDto, value: any) {
		setCreateCollectionDto(state => ({
			...state,
			[name]: value,
		}));
	}

	async function onCreateCollection() {

		if ( !isEditing ) {
			try {
				const createdCollection = await createCollectionMutation.mutateAsync({ createCollectionDto });
				toast.success('Collection Created!');
				await router.push(NIMA_ROUTES.collections.edit(createdCollection.id));
			} catch ( e: any ) {
				console.log(e);
			}
		} else {
			const { products, ...rest } = createCollectionDto;
			const updatedCollection = await updateCollectionMutation.mutateAsync({
				collectionId: id,
				updateCollectionDto: rest,
			});
			toast.success('Collection Updated!');
			await router.push(NIMA_ROUTES.collections.list);
		}
	}

	async function onDeleteCollection() {
		if ( !id || !existingCollection ) return;
		const confirm = window.confirm(`Are you sure you want to delete ${ getTranslation(existingCollection.name, languages.adminLanguage) }? It will be removed from all products.`);
		if ( confirm ) {
			await deleteCollectionMutation.mutateAsync({
				collectionId: id,
			});
			toast.success('Collection Deleted');
			router.push(NIMA_ROUTES.collections.list);
		}
	}

	return (
		<>
			<NimaTitle
				title={ title }/>
			<AdminPage
				label={ title }
				footerContainer={ <AdminFooter>

					<Link href={ NIMA_ROUTES.collections.list }>
						<button className={ 'btn btn-secondary' }><Trans>{ STRINGS.BACK }</Trans></button>
					</Link>

					{ existingCollection && <button className="btn btn-error"
													onClick={ onDeleteCollection }>
						<Trans>{ STRINGS.DELETE }</Trans>
					</button> }

					<button className="btn btn-success"
							onClick={ onCreateCollection }><Trans>{ isEditing ? STRINGS.SAVE : STRINGS.CREATE }</Trans>
					</button>
				</AdminFooter> }
			>
				<AdminColumn>
					<AdminSection title={ 'General Information' } titleRightContainer={ <SelectEditingLanguage/> }>
						<label className="label">
							<span className="label-text"><Trans>{ STRINGS.NAME }</Trans></span>
						</label>
						<TranslatableInput className={ 'input w-full max-w-xs input-bordered' }
										   name="name"
										   value={ createCollectionDto.name }
										   onChange={ (value) => onValueEdit('name', value) }
						/>

						<label className="label">
							<span className="label-text"><Trans>{ STRINGS.DESCRIPTION }</Trans></span>
						</label>
						<TranslatableInput className={ 'input w-full max-w-xs input-bordered' }
										   name="name"
										   value={ createCollectionDto.description }
										   onChange={ (value) => onValueEdit('description', value) }
						/>
						<div className="form-control w-full max-w-xs">
							<label className="label">
								<span className="label-text"><Trans>{ STRINGS.SLUG }</Trans></span>
								{ !isEditing &&
									<span className="label-text-alt"><Trans>{ STRINGS.LEAVE_EMPTY_FOR_DEFAULT }</Trans></span> }
							</label>
							<input className={ 'input w-full max-w-xs input-bordered' }
								   type="text"
								   name="name"
								   value={ createCollectionDto.slug }
								   placeholder={ getSlug(createCollectionDto.name.en || '') }
								   onChange={ (e) => onValueEdit('slug', e.target.value) }
							/>
						</div>

					</AdminSection>
					<MediaSelectorSection
						title={ getAdminTranslation(STRINGS.BACKGROUND_IMAGE) }
						sortableMedia={ createCollectionDto.backgroundImageId ? [{ mediaId: createCollectionDto.backgroundImageId, sortOrder: 0 }] : [] }
						onSelect={ (media) => {
							const id = media.length === 0 ? undefined : media[0].mediaId;
							onValueEdit('backgroundImageId', id);
						} }
					/>
					{ id && <CollectionProductList
						products={ createCollectionDto.products }
						collectionId={ id }
					/> }
					<AdminSection title={ 'SEO' }>
						<label className="label">
							<span className="label-text">SEO Title</span>
						</label>
						<TranslatableInput className={ 'input w-full max-w-xs input-bordered' }
										   name="name"
										   value={ createCollectionDto.seoTitle }
										   onChange={ (value) => onValueEdit('seoTitle', value) }
						/>

						<label className="label">
							<span className="label-text">SEO Description</span>
						</label>
						<TranslatableInput className={ 'input w-full max-w-xs input-bordered' }
										   name="name"
										   value={ createCollectionDto.seoDescription }
										   onChange={ (value) => onValueEdit('seoDescription', value) }
						/>

					</AdminSection>


					<MetadataEditor values={ createCollectionDto.metadata as Metadata }
									onChange={ (v => onValueEdit('metadata', v)) }/>
					<MetadataEditor isPrivate values={ createCollectionDto.privateMetadata as Metadata }
									onChange={ (v => onValueEdit('privateMetadata', v)) }/>
				</AdminColumn>
			</AdminPage>
		</>
	);
}


