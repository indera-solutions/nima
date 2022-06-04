import {
	getTranslation,
	useCreateSaleMutation,
	useLanguages,
	useSaleById,
	useUpdateSaleMutation,
} from '@nima-cms/react';
import { CreateDiscountSaleDto, DiscountType } from '@nima-cms/sdk';
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
	SalesCollectionList,
	SalesProductList,
	SelectEditingLanguage,
	TranslatableInput,
} from '../../components';
import { SalesCategoryList } from '../../components/sales/SalesCategoryList';
import { NIMA_ROUTES } from '../../lib/routes';

interface AddSaleProps {

}


export default function AddSale(props: AddSaleProps) {
	const router = useRouter();
	const languages = useLanguages();
	const id: number | undefined = router.query['id'] ? parseIdStr(router.query['id']) : undefined;
	const isEditing = !!id;

	const createSaleMutation = useCreateSaleMutation();
	const updateSaleMutation = useUpdateSaleMutation();
	const { data: existingSale } = useSaleById(id, { refetchInterval: false });

	useEffect(() => {
		if ( !existingSale ) return;
		const { id, products, collections, categories, variants, created, updatedAt, ...rest } = existingSale;
		setCreateSaleDto({
			...rest,
		});
	}, [existingSale]);


	const [createSaleDto, setCreateSaleDto] = useState<CreateDiscountSaleDto>({
		name: {},
		discountType: DiscountType.FLAT,
		discountValue: 0,
		metadata: {},
		privateMetadata: {},
	});


	function onValueEdit(name: keyof CreateDiscountSaleDto, value: any) {
		setCreateSaleDto(state => ({
			...state,
			[name]: value,
		}));
	}

	async function onCreateCollection() {

		if ( !isEditing ) {
			try {
				const createdSale = await createSaleMutation.mutateAsync({ createDiscountSaleDto: createSaleDto });
				toast.success('Sale Created!');
				await router.push(NIMA_ROUTES.sales.edit(createdSale.id));
			} catch ( e: any ) {
				console.log(e);
			}
		} else {
			const updatedCollection = await updateSaleMutation.mutateAsync({
				id,
				updateDiscountDto: createSaleDto,
			});
			toast.success('Sale Updated!');
			await router.push(NIMA_ROUTES.sales.list);
		}
	}

	return (
		<>
			<NimaTitle
				title={ existingSale ? `Update ${ getTranslation(existingSale.name, languages.adminLanguage) } Sale` : 'Create Sale' }/>
			<AdminPage
				label={ existingSale ? `Update ${ getTranslation(existingSale.name, languages.adminLanguage) } Sale` : 'Create New Sale' }
				footerContainer={ <AdminFooter>

					<Link href={ NIMA_ROUTES.sales.list }>
						<button className={ 'btn btn-secondary' }>Back</button>
					</Link>

					<button className="btn btn-success"
							onClick={ onCreateCollection }>{ isEditing ? 'Save' : 'Create' }</button>
				</AdminFooter> }
			>
				<AdminColumn>
					<AdminSection title={ 'General' } titleRightContainer={ <SelectEditingLanguage/> }>
						<label className="label">
							<span className="label-text">Name</span>
						</label>
						<TranslatableInput className={ 'input w-full max-w-xs input-bordered' }
										   name="name"
										   value={ createSaleDto.name }
										   onChange={ (value) => onValueEdit('name', value) }
						/>

						<div className={ 'flex flex-col items-start gap-1' }>
							<label className="label cursor-pointer">
								<span className="label-text">Type</span>
							</label>
							<label className="label cursor-pointer">
								<input type="radio" className="radio mr-2"
									   checked={ createSaleDto.discountType === DiscountType.FLAT }
									   onChange={ () => onValueEdit('discountType', DiscountType.FLAT) }

								/>
								<span className="label-text">Flat</span>
							</label>
							<label className="label cursor-pointer">
								<input type="radio" className="radio mr-2"
									   checked={ createSaleDto.discountType === DiscountType.PERCENTAGE }
									   onChange={ () => onValueEdit('discountType', DiscountType.PERCENTAGE) }

								/>
								<span className="label-text">Percentage</span>
							</label>
						</div>

						<div className="form-control">
							<label className="label">
								<span className="label-text">Value</span>
							</label>
							<label className="input-group">
								<input
									className={ 'input input-bordered ' }
									type={ 'number' }
									value={ createSaleDto.discountValue }
									onChange={ (e) => onValueEdit('discountValue', e.target.value ? +e.target.value : 0) }/>
								<span>{ createSaleDto.discountType === DiscountType.PERCENTAGE ? '%' : '€' }</span>
							</label>
						</div>
					</AdminSection>

					{ id && existingSale && <SalesCollectionList
						collections={ existingSale.collections }
						id={ id }
					/> }
					{ id && existingSale && <SalesCategoryList
						categories={ existingSale.categories }
						id={ id }
					/> }
					{ id && existingSale && <SalesProductList
						products={ existingSale.products }
						id={ id }
					/> }


					<MetadataEditor values={ createSaleDto.metadata as Metadata }
									onChange={ (v => onValueEdit('metadata', v)) }/>
					<MetadataEditor isPrivate values={ createSaleDto.privateMetadata as Metadata }
									onChange={ (v => onValueEdit('privateMetadata', v)) }/>
				</AdminColumn>
			</AdminPage>
		</>
	);
}


