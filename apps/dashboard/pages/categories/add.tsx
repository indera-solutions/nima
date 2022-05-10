import {
	getTranslation,
	useCategoryId,
	useCreateCategoryMutation,
	useLanguages,
	useUpdateCategoryMutation,
} from '@nima-cms/react';
import { CreateCategoryDto } from '@nima-cms/sdk';
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
	MetadataEditor,
	NimaTitle,
	SelectEditingLanguage,
	TranslatableInput,
} from '../../components';
import { CategoriesTable } from '../../components/categories/categoriesTable';
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

export default function AddProductType(props: AddProductTypeProps) {
	const router = useRouter();
	const languages = useLanguages();
	const id: number | undefined = router.query['id'] ? parseIdStr(router.query['id']) : undefined;
	const parentId: number | undefined = router.query['parentId'] ? parseIdStr(router.query['parentId']) : undefined;
	const isEditing = !!id;

	const createCategoryMutation = useCreateCategoryMutation();
	const updateCategoryMutation = useUpdateCategoryMutation();
	const { data: existingCategory } = useCategoryId(id, { refetchInterval: false });

	useEffect(() => {
		if ( !existingCategory ) return;
		const { id, children, ...rest } = existingCategory;
		setCreateCategoryDto({ ...rest, parentId });
	}, [existingCategory]);

	useEffect(() => {
		if ( !id ) setCreateCategoryDto(defaultCategory);
	}, [id]);

	useEffect(() => {
		if ( parentId ) onValueEdit('parentId', parentId);
	}, [parentId]);


	const [createCategoryDto, setCreateCategoryDto] = useState<CreateCategoryDto>(defaultCategory);


	function onValueEdit(name: keyof CreateCategoryDto, value: any) {
		setCreateCategoryDto(state => ({
			...state,
			[name]: value,
		}));
	}

	async function onCreateCategory() {

		if ( !isEditing ) {
			try {
				const createdProductType = await createCategoryMutation.mutateAsync({ createCategoryDto });
				toast.success('Category Created!');
				if ( parentId ) {
					await router.push(NIMA_ROUTES.categories.edit(parentId));
				} else {
					await router.push(NIMA_ROUTES.categories.list);
				}
			} catch ( e: any ) {
				console.log(e);
			}
		} else {
			const updatedProductType = await updateCategoryMutation.mutateAsync({
				categoryId: id,
				createCategoryDto: createCategoryDto,
			});
			toast.success('Category Updated!');
			if ( parentId ) {
				await router.push(NIMA_ROUTES.categories.edit(parentId));
			}
		}
	}

	return (
		<>
			<NimaTitle
				title={ existingCategory ? `Update ${ getTranslation(existingCategory.name, languages.adminLanguage) }` : 'Create Category' }/>
			<AdminPage
				label={ existingCategory ? `Update ${ getTranslation(existingCategory.name, languages.adminLanguage) }` : 'Create New Category' }
				footerContainer={ <AdminFooter>
					{ parentId && <Link href={ NIMA_ROUTES.categories.edit(parentId) + '#admin-page' }>
						<button className={ 'btn btn-primary' }>Back to parent</button>
					</Link> }
					<Link href={ NIMA_ROUTES.categories.list }>
						<button className={ 'btn btn-secondary' }>Back</button>
					</Link>

					<button className="btn btn-success"
							onClick={ onCreateCategory }>{ isEditing ? 'Save' : 'Create' }</button>
				</AdminFooter> }
			>
				<AdminColumn>
					<AdminSection title={ 'General Information' } titleRightContainer={ <SelectEditingLanguage/> }>
						<label className="label">
							<span className="label-text">Name</span>
						</label>
						<TranslatableInput className={ 'input w-full max-w-xs input-bordered' }
										   name="name"
										   value={ createCategoryDto.name }
										   onChange={ (value) => onValueEdit('name', value) }
						/>

						<label className="label">
							<span className="label-text">Description</span>
						</label>
						<TranslatableInput className={ 'input w-full max-w-xs input-bordered' }
										   name="name"
										   value={ createCategoryDto.description }
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
								   value={ createCategoryDto.slug }
								   placeholder={ getSlug(createCategoryDto.name.en || '') }
								   onChange={ (e) => onValueEdit('slug', e.target.value) }
							/>
						</div>

					</AdminSection>

					{ isEditing && existingCategory?.children &&
						<AdminSection title={ 'Subcategories' }
									  titleRightContainer={
										  <Link href={ NIMA_ROUTES.categories.add(existingCategory.id) }>
											  <button className={ 'btn btn-primary' }>
												  Add Subcategory
											  </button>
										  </Link>
									  }
						>
							<CategoriesTable categories={ existingCategory.children } parentId={ existingCategory.id }/>
						</AdminSection> }

					<AdminSection title={ 'SEO' }>
						<label className="label">
							<span className="label-text">SEO Title</span>
						</label>
						<TranslatableInput className={ 'input w-full max-w-xs input-bordered' }
										   name="name"
										   value={ createCategoryDto.seoTitle }
										   onChange={ (value) => onValueEdit('seoTitle', value) }
						/>

						<label className="label">
							<span className="label-text">SEO Description</span>
						</label>
						<TranslatableInput className={ 'input w-full max-w-xs input-bordered' }
										   name="name"
										   value={ createCategoryDto.seoDescription }
										   onChange={ (value) => onValueEdit('seoDescription', value) }
						/>

					</AdminSection>


					<MetadataEditor values={ createCategoryDto.metadata as Metadata }
									onChange={ (v => onValueEdit('metadata', v)) }/>
					<MetadataEditor isPrivate values={ createCategoryDto.privateMetadata as Metadata }
									onChange={ (v => onValueEdit('privateMetadata', v)) }/>
				</AdminColumn>
			</AdminPage>
		</>
	);
}
