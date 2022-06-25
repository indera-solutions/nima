import { useAddAttributeValueMutation, useAttributeValueById, useAttributeValues, useLanguages } from '@nima-cms/react';
import React, { useRef } from 'react';
import { MediaGallery } from '../../media';
import { EditSingleProductAttributeProps } from '../EditProductAttribute';


export function FileSelector(props: EditSingleProductAttributeProps) {
	const { attributeId } = props;
	const closeLabelRef = useRef<HTMLLabelElement>();
	const { data: values } = useAttributeValues(attributeId);
	const { data: value } = useAttributeValueById(attributeId, props.productAttributeValue.values[0]?.valueId);


	const addAttributeValueMutation = useAddAttributeValueMutation();

	console.log(value);


	const languages = useLanguages();

	async function onChange(ids: number[]) {
		const id = ids[0];
		closeLabelRef.current.click();
		// if ( !values || !props.onSelect ) return;
		// const checked = e.target.checked;
		// const value = values.find(v => v.boolean === checked);
		// if ( !value ) {
		// 	toast.error('Option not found');
		// 	return;
		// }

		console.log(ids);
		console.log({
			name: { en: `media_${ props.attributeId }_${ id }` },
			mediaId: id,
		});

		let value = undefined;
		const existing = values?.find((v) => v.slug === `media_${ props.attributeId }_${ id }`);
		if ( existing ) {
			value = existing;
		} else {
			value = await addAttributeValueMutation.mutateAsync({
				attributeId: props.attributeId,
				createAttributeValue: {
					name: { en: `media_${ props.attributeId }_${ id }` },
					slug: `media_${ props.attributeId }_${ id }`,
					mediaId: id,
				},
			});
		}

		props.onSelect({
			...props.productAttributeValue,
			values: [{
				valueId: value.id,
				sortOrder: 0,
			}],
		});
	}


	return (
		<>
			{ value?.media &&
				<a href={ value.media.url } rel="noreferrer"
				   target={ '_blank' }>{ value?.media.slug } { value.media.thumbnailUrl &&
					<img src={ value.media.thumbnailUrl } alt="" height={ 50 } width={ 50 }/> }</a> }
			<label htmlFor={ 'fileSelectorModal_' + props.attributeId } className={ 'btn btn-primary gap-2' }>
				Select
			</label>
			<input type="checkbox" id={ 'fileSelectorModal_' + props.attributeId } className="modal-toggle"/>
			<div className="modal">
				<div className="modal-box min-w-[90%] h-screen">
					<label htmlFor={ 'fileSelectorModal_' + props.attributeId }
						   ref={ closeLabelRef }
						   className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
					<MediaGallery selectedId={ [] } onSelect={ onChange }/>
				</div>
			</div>
		</>


	);

}
