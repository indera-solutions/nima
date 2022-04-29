import { Metadata } from '@nima/utils';
import React from 'react';
import { SVGPlus } from '../../assets/SVGIcons';
import { AdminSection } from '../AdminLayout';

interface MetadataEditorProps {
	values: Metadata;
	onChange?: (value: Metadata) => void;
	isPrivate?: boolean;
}

export function MetadataEditor(props: MetadataEditorProps) {
	const entries = Object.entries(props.values);
	const size = entries.length;
	const readOnly = !props.onChange;
	const canAddNew = !readOnly && props.values[''] !== undefined;

	// We do it like that to preserve the o
	function onKeyChange(str: string, key?: string) {
		if ( readOnly ) return;
		if ( key === undefined ) return;
		const temp = [...entries.map(entry => [...entry])];
		const editingEntry = temp.find(entry => entry[0] === key);
		if ( !editingEntry ) return;
		editingEntry[0] = str;
		const newMetadata = {};
		temp.forEach(entry => {
			newMetadata[entry[0]] = entry[1];
		});
		console.log(newMetadata);
		if ( props.onChange ) props.onChange(newMetadata);
	}

	function onValueChange(str: string, key?: string) {
		if ( readOnly ) return;
		if ( key === undefined ) return;
		const temp = { ...props.values };
		temp[key] = str;
		console.log(temp);
		if ( props.onChange ) props.onChange(temp);
	}

	function onAddProperty() {
		if ( readOnly ) return;
		const temp = { ...props.values };
		temp[''] = '';
		if ( props.onChange ) props.onChange(temp);
	}

	function onRemoveProperty(key: string) {
		if ( readOnly ) return;
		if ( key === undefined ) return;
		const temp = { ...props.values };
		delete temp[key];
		if ( props.onChange ) props.onChange(temp);
	}

	return (
		<AdminSection title={ props.isPrivate ? 'Private Metadata' : 'Metadata' }
					  subtitle={ size > 0 ? size + ' values' : undefined }
					  titleRightContainer={ !readOnly &&
						  <button className={ 'btn btn-primary gap-2' } disabled={ canAddNew }
								  onClick={ onAddProperty }>
							  <SVGPlus width={ '20' } height={ '20' }/>
							  Add Field
						  </button> }

		>
			<table className={ 'w-full mb-2' }>
				<thead>
				<tr>
					<th>Field</th>
					<th>Value</th>
					{ !readOnly && <th>Actions</th> }
				</tr>
				</thead>
				<tbody>
				{ entries.map((entry, index) => <tr key={ index }>
					<td className={ 'px-2' }><input className={ 'input input-bordered w-full' } type={ 'text' }
													readOnly={ readOnly }
													onChange={ (e) => onKeyChange(e.target.value, entry[0]) }
													value={ entry[0] }/></td>
					<td className={ 'px-2' }><input className={ 'input input-bordered w-full' } type={ 'text' }
													readOnly={ readOnly }
													onChange={ (e) => onValueChange(e.target.value, entry[0]) }
													value={ entry[1] }/></td>

					{ !readOnly &&
						<td>
							<button className={ 'btn btn-error' } onClick={ () => onRemoveProperty(entry[0]) }>X
							</button>
						</td> }
				</tr>) }
				</tbody>
			</table>
		</AdminSection>
	);
}