import { defaultConfiguration, NimaQueryCacheKeys } from '@nima/react';
import { CreateProductTypeDto, ProductTypeDto, ProductTypesApi } from '@nima/sdk';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const productTypesSDK = new ProductTypesApi(defaultConfiguration);


export function useProductTypes() {
	return useQuery<ProductTypeDto[]>(
		NimaQueryCacheKeys.productTypes.list(),
		async () => {
			const res = await productTypesSDK.productTypesFindAll();
			return res.data;
		},
		{},
	);
}

export function useProductTypeId(id?: number, options?: { refetchInterval: number | false }) {
	return useQuery<ProductTypeDto>(
		NimaQueryCacheKeys.productTypes.id(id),
		async () => {
			const res = await productTypesSDK.productTypesFindOne({
				productTypeId: id!,
			});
			return res.data;
		},
		{
			enabled: !!id,
			refetchInterval: options?.refetchInterval,
		},
	);
}


export function useCreateProductTypeMutation() {
	const client = useQueryClient();
	return useMutation<ProductTypeDto,
		never,
		{ createProductTypeDto: CreateProductTypeDto }>(
		async ({ createProductTypeDto }) => {
			const res = await productTypesSDK.productTypesCreate({
				createProductTypeDto,
			});
			return res.data;
		},
		{
			onSuccess: () => {
				client.invalidateQueries(NimaQueryCacheKeys.productTypes.all);
			},
		},
	);
}

export function useUpdateProductTypeMutation() {
	const client = useQueryClient();
	return useMutation<ProductTypeDto,
		never,
		{
			createProductTypeDto: CreateProductTypeDto
			productTypeId: number,
		}>(
		async ({ createProductTypeDto, productTypeId }) => {
			const res = await productTypesSDK.productTypesUpdate({
				createProductTypeDto: createProductTypeDto,
				productTypeId,
			});
			return res.data;
		},
		{
			onSuccess: () => {
				client.invalidateQueries(NimaQueryCacheKeys.productTypes.all);
			},
		},
	);
}


//
// // export function useUpdateAttributeMutation() {
// // 	const client = useQueryClient();
// // 	return useMutation<Attribute, never, { attribute: Attribute }>(
// // 		async ({ attribute }) => {
// // 			throw new Error('no implemented');
// // 		},
// // 		{
// // 			onSuccess: () => {
// // 				client.invalidateQueries(CommerceV2QueryCacheKeys.attributes.all);
// // 			},
// // 		},
// // 	);
// // }
//
// export function useProductTypeSimpleAttributes(productTypeId?: number, options?: { disableRefetch: boolean }) {
// 	return useQuery<ProductTypeAttribute[]>(
// 		CommerceV2QueryCacheKeys.productTypes.attributes(productTypeId),
// 		async () => {
// 			if ( !productTypeId ) throw new Error('invalid attribute id');
// 			return await productTypeAttributes.listSimpleAttributesOfProductType(productTypeId);
// 		},
// 		{
// 			enabled: !!productTypeId,
// 			refetchInterval: options?.disableRefetch ? false : undefined,
// 		},
// 	);
// }
//
// export function useProductTypeVariantAttributes(productTypeId?: number, options?: { disableRefetch: boolean }) {
// 	return useQuery<ProductTypeVariantAttribute[]>(
// 		CommerceV2QueryCacheKeys.productTypes.variantAttributes(productTypeId),
// 		async () => {
// 			if ( !productTypeId ) throw new Error('invalid attribute id');
// 			return await productTypeAttributes.listVariantAttributesOfProductType(productTypeId);
// 		},
// 		{
// 			enabled: !!productTypeId,
// 			refetchInterval: options?.disableRefetch ? false : undefined,
// 		},
// 	);
// }
//
// export function useAddSimpleAttributeMutation() {
// 	const client = useQueryClient();
// 	return useMutation<ProductTypeAttribute,
// 		never,
// 		{
// 			createAttributeValue: CreateProductTypeAttributeDto,
// 			productTypeId: number
// 		}>(
// 		async ({ createAttributeValue, productTypeId }) => {
// 			return await productTypeAttributes.createSimpleAttribute(productTypeId, createAttributeValue);
// 		},
// 		{
// 			onSuccess: (data, variables, context) => {
// 				client.invalidateQueries(CommerceV2QueryCacheKeys.productTypes.id(variables.productTypeId));
// 			},
// 		},
// 	);
// }
//
// export function useAddVariantAttributeMutation() {
// 	const client = useQueryClient();
// 	return useMutation<ProductTypeVariantAttribute,
// 		never,
// 		{
// 			createAttributeValue: CreateProductTypeVariantAttributeDto,
// 			productTypeId: number
// 		}>(
// 		async ({ createAttributeValue, productTypeId }) => {
// 			return await productTypeAttributes.createVariantAttribute(productTypeId, createAttributeValue);
// 		},
// 		{
// 			onSuccess: (data, variables, context) => {
// 				client.invalidateQueries(CommerceV2QueryCacheKeys.productTypes.id(variables.productTypeId));
// 			},
// 		},
// 	);
// }
//
//
// export function useDeleteSimpleAttributeMutation() {
// 	const client = useQueryClient();
// 	return useMutation<ProductTypeAttribute,
// 		never,
// 		{
// 			id: number,
// 			productTypeId: number
// 		}>(
// 		async ({ id, productTypeId }) => {
// 			return await productTypeAttributes.deleteSimpleAttributeById(productTypeId, id);
// 		},
// 		{
// 			onSuccess: (data, variables, context) => {
// 				client.invalidateQueries(CommerceV2QueryCacheKeys.productTypes.id(variables.productTypeId));
// 			},
// 		},
// 	);
// }
//
// export function useDeleteVariantAttributeMutation() {
// 	const client = useQueryClient();
// 	return useMutation<ProductTypeVariantAttribute,
// 		never,
// 		{
// 			id: number,
// 			productTypeId: number
// 		}>(
// 		async ({ id, productTypeId }) => {
// 			return await productTypeAttributes.deleteVariantAttributeById(productTypeId, id);
// 		},
// 		{
// 			onSuccess: (data, variables, context) => {
// 				client.invalidateQueries(CommerceV2QueryCacheKeys.productTypes.id(variables.productTypeId));
// 			},
// 		},
// 	);
// }
//
// export function useUpdateVariantAttributeMutation() {
// 	const client = useQueryClient();
// 	return useMutation<ProductTypeVariantAttribute,
// 		never,
// 		{
// 			id: number,
// 			productTypeId: number
// 			dto: CreateProductTypeVariantAttributeDto
// 		}>(
// 		async ({ id, dto, productTypeId }) => {
// 			return await productTypeAttributes.updateVariantAttribute(productTypeId, id, dto);
// 		},
// 		{
// 			onSuccess: (data, variables, context) => {
// 				client.invalidateQueries(CommerceV2QueryCacheKeys.productTypes.id(variables.productTypeId));
// 			},
// 		},
// 	);
// }
//
