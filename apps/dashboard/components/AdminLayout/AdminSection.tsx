import React from 'react';

interface CommerceAdminSectionProps {
	title?: string;
	subtitle?: string;
	titleRightContainer?: React.ReactNode;
	children: React.ReactNode;
	containerClass?: string;
}

export function AdminSection(props: CommerceAdminSectionProps) {
	return (
		<div className={ 'bg-white p-5 rounded-2xl shadow-lg ' + (props.containerClass || '') }>
			<div className={ 'flex justify-between' }>
				{ props.title && <h2 className={ 'text-2xl font-medium' }>
					{ props.title }
				</h2> }
				{ props.titleRightContainer }
			</div>
			{ props.subtitle && <h2 className={ 'text-sm font-light pt-2 text-gray-500 ' }>
				{ props.subtitle }
			</h2> }
			<div className={ 'flex flex-col gap-4 pt-5' }>
				{ props.children }
			</div>
		</div>
	);
}
