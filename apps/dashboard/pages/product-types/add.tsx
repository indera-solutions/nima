import { useCreateProductTypeMutation, useProductTypeId, useUpdateProductTypeMutation } from '@nima/react';
import { CreateProductTypeDto } from '@nima/sdk';
import { Metadata, parseIdStr } from '@nima/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AdminColumn, AdminFooter, AdminPage, AdminSection, MetadataEditor, NimaTitle } from '../../components';
import { NIMA_ROUTES } from '../../lib/routes';

interface AddProductTypeProps {

}

export default function AddProductType(props: AddProductTypeProps) {
	const router = useRouter();
	const id: number | undefined = router.query['id'] ? parseIdStr(router.query['id']) : undefined;
	const isEditing = !!id;

	const [createProductTypeDto, setCreateProductTypeDto] = useState<CreateProductTypeDto>({
		name: '',
		slug: '',
		metadata: {},
		privateMetadata: {},
		attributes: [],
		variantAttributes: [],
		hasVariants: false,
		isDigital: false,
		isShippingRequired: false,
		weight: 0,
	});

	const { data: existingProductType } = useProductTypeId(id, { refetchInterval: false });


	const createProductTypeMutation = useCreateProductTypeMutation();
	const updateProductTypeMutation = useUpdateProductTypeMutation();


	useEffect(() => {
		if ( !existingProductType ) return;
		const { id, ...rest } = existingProductType;
		setCreateProductTypeDto(rest);
	}, [existingProductType]);


	function onValueEdit(name: keyof CreateProductTypeDto, value: any) {
		setCreateProductTypeDto(state => ({
			...state,
			[name]: value,
		}));
	}

	async function onCreateProductType() {
		if ( !isEditing ) {
			try {
				const createdProductType = await createProductTypeMutation.mutateAsync({ createProductTypeDto });
				toast.success('Product Type Created!');
				await router.push(NIMA_ROUTES.productTypes.list);
			} catch ( e: any ) {
				console.log(e);
			}
		} else {
			const updatedProductType = await updateProductTypeMutation.mutateAsync({
				productTypeId: id,
				createProductTypeDto: createProductTypeDto,
			});
			toast.success('Product Type Updated!');
		}
	}


	return (
		<>
			<NimaTitle title={ isEditing ? 'Update Product Type' : 'Create Product Type' }/>
			<AdminPage
				label={ isEditing ? 'Update Product Type' : 'Create New Product Type' }
				footerContainer={ <AdminFooter>
					<Link href={ NIMA_ROUTES.productTypes.list }>
						<button className={ 'btn btn-secondary' }>Back</button>
					</Link>

					<button className="btn btn-success"
							onClick={ onCreateProductType }>{ isEditing ? 'Save' : 'Create' }</button>
				</AdminFooter> }
			>
				<AdminColumn>
					<AdminSection title={ 'General Information' }>
						<label className="label">
							<span className="label-text">Name</span>
						</label>
						<input className={ 'input w-full max-w-xs input-bordered' }
							   type="text"
							   name="name"
							   value={ createProductTypeDto.name }
							   placeholder={ 'Pants' }
							   onChange={ (e) => onValueEdit('name', e.target.value) }
						/>

					</AdminSection>


					<MetadataEditor values={ createProductTypeDto.metadata as Metadata }
									onChange={ (v => onValueEdit('metadata', v)) }/>
					<MetadataEditor isPrivate values={ createProductTypeDto.privateMetadata as Metadata }
									onChange={ (v => onValueEdit('privateMetadata', v)) }/>
				</AdminColumn>
			</AdminPage>
		</>
	);
}
