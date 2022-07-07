import {
	getTranslation,
	Trans,
	useCategoryId,
	useCreateCategoryMutation,
	useDeleteCategoryMutation,
	useLanguages,
	useTranslations,
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
import { STRINGS } from '../../strings/strings';

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
	const { getAdminTranslation } = useTranslations();

	const languages = useLanguages();
	const id: number | undefined = router.query['id'] ? parseIdStr(router.query['id']) : undefined;
	const parentId: number | undefined = router.query['parentId'] ? parseIdStr(router.query['parentId']) : undefined;
	const isEditing = !!id;


	const createCategoryMutation = useCreateCategoryMutation();
	const updateCategoryMutation = useUpdateCategoryMutation();
	const deleteCategoryMutation = useDeleteCategoryMutation();
	const { data: existingCategory } = useCategoryId(id, { refetchInterval: false });

	const title = getAdminTranslation(existingCategory ? STRINGS.CATEGORY_UPDATE_TITLE(getAdminTranslation(existingCategory.name)) : STRINGS.CATEGORY_CREATE_TITLE);

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

	async function onDeleteCategory() {
		if ( !id || !existingCategory ) return;
		const confirm = window.confirm(`Are you sure you want to delete ${ getTranslation(existingCategory.name, languages.adminLanguage) }?`);
		if ( confirm ) {
			try {
				await deleteCategoryMutation.mutateAsync({
					categoryId: id,
					forceDelete: false,
				});
				toast.success('Category Deleted');
				router.push(NIMA_ROUTES.categories.list);
			} catch ( e ) {
				console.log(e.response);
				if ( e.response.data.message === 'CATEGORY_WITH_CHILDREN' ) {
					const forceConfirm = window.confirm('There are subcategories in this category. Do you want to delete all subcategories too?');
					if ( forceConfirm ) {
						await deleteCategoryMutation.mutateAsync({
							categoryId: id,
							forceDelete: true,
						});
						toast.success('Category and subcategories deleted.');
						router.push(NIMA_ROUTES.categories.list);
					}
				} else if ( e.response.data.message === 'CATEGORY_WITH_PRODUCTS' ) {
					toast.error('There are still products in category. Move it to new category.');
				}
			}

		}
	}

	return (
		<>
			<NimaTitle
				title={ title }/>
			<AdminPage
				label={ title }
				footerContainer={ <AdminFooter>
					{ parentId && <Link href={ NIMA_ROUTES.categories.edit(parentId) + '#admin-page' }>
						<button className={ 'btn btn-primary' }><Trans>{ STRINGS.BACK_TO_PARENT }</Trans></button>
					</Link> }
					{ existingCategory && <button className="btn btn-error"
												  onClick={ onDeleteCategory }>
						<Trans>{ STRINGS.DELETE }</Trans>
					</button> }
					<Link href={ NIMA_ROUTES.categories.list }>
						<button className={ 'btn btn-secondary' }><Trans>{ STRINGS.BACK }</Trans></button>
					</Link>

					<button className="btn btn-success"
							onClick={ onCreateCategory }><Trans>{ isEditing ? STRINGS.SAVE : STRINGS.CREATE }</Trans>
					</button>
				</AdminFooter> }
			>
				<AdminColumn>
					<AdminSection title={ getAdminTranslation(STRINGS.GENERAL_INFO) }
								  titleRightContainer={ <SelectEditingLanguage/> }>
						<label className="label">
							<span className="label-text"><Trans>{ STRINGS.NAME }</Trans></span>
						</label>
						<TranslatableInput className={ 'input w-full max-w-xs input-bordered' }
										   name="name"
										   value={ createCategoryDto.name }
										   onChange={ (value) => onValueEdit('name', value) }
						/>

						<label className="label">
							<span className="label-text"><Trans>{ STRINGS.DESCRIPTION }</Trans></span>
						</label>
						<TranslatableInput className={ 'input w-full max-w-xs input-bordered' }
										   name="name"
										   value={ createCategoryDto.description }
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
												  <Trans>{ STRINGS.ADD_SUBCATEGORY }</Trans>
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
