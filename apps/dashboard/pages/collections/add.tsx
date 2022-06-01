import {
	getTranslation,
	useCollectionById,
	useCreateCollectionMutation,
	useLanguages,
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

interface AddProductTypeProps {

}

const defaultCategory = {
	name: {},
	slug: '',
	metadata: {},
	privateMetadata: {},
	description: {},
	parentId: undefined,
	seoDescription: {},
	seoTitle: {},
};

export default function AddCollection(props: AddProductTypeProps) {
	const router = useRouter();
	const languages = useLanguages();
	const id: number | undefined = router.query['id'] ? parseIdStr(router.query['id']) : undefined;
	const isEditing = !!id;

	const createCollectionMutation = useCreateCollectionMutation();
	const updateCollectionMutation = useUpdateCollectionMutation();
	const { data: existingCollection } = useCollectionById(id, { refetchInterval: false });

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
				toast.success('Category Created!');
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

	return (
		<>
			<NimaTitle
				title={ existingCollection ? `Update ${ getTranslation(existingCollection.name, languages.adminLanguage) } Collection` : 'Create Collection' }/>
			<AdminPage
				label={ existingCollection ? `Update ${ getTranslation(existingCollection.name, languages.adminLanguage) } Collection` : 'Create New Collection' }
				footerContainer={ <AdminFooter>

					<Link href={ NIMA_ROUTES.collections.list }>
						<button className={ 'btn btn-secondary' }>Back</button>
					</Link>

					<button className="btn btn-success"
							onClick={ onCreateCollection }>{ isEditing ? 'Save' : 'Create' }</button>
				</AdminFooter> }
			>
				<AdminColumn>
					<AdminSection title={ 'General Information' } titleRightContainer={ <SelectEditingLanguage/> }>
						<label className="label">
							<span className="label-text">Name</span>
						</label>
						<TranslatableInput className={ 'input w-full max-w-xs input-bordered' }
										   name="name"
										   value={ createCollectionDto.name }
										   onChange={ (value) => onValueEdit('name', value) }
						/>

						<label className="label">
							<span className="label-text">Description</span>
						</label>
						<TranslatableInput className={ 'input w-full max-w-xs input-bordered' }
										   name="name"
										   value={ createCollectionDto.description }
										   onChange={ (value) => onValueEdit('description', value) }
						/>
						<div className="form-control w-full max-w-xs">
							<label className="label">
								<span className="label-text">Slug</span>
								{ !isEditing &&
									<span className="label-text-alt">Leave empty to generate default</span> }
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
						title={ 'Background Image (optional)' }
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


