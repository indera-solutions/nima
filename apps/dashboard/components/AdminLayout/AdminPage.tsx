import React from 'react';
import { AdminSection } from './AdminSection';

interface AdminPageProps {
	label?: string;
	reverted?: boolean;
	footerContainer?: React.ReactNode;
	topRightContainer?: React.ReactNode;
	children: React.ReactNode;
}

export function AdminPage(props: AdminPageProps) {

	if ( Array.isArray(props.children) && props.children.length !== 2 ) throw new Error('Only 2 columns are supported');

	return (
		<div>
			<div className={ 'flex justify-between items-center justify-center px-7 pt-6' }>
				<h1 className={ 'text-4xl font-medium' }>{ props.label }</h1>

				{ props.topRightContainer && <div className={ '' }>
					{ props.topRightContainer }
				</div> }
			</div>
			{ !Array.isArray(props.children) ? <div>
					<div className={ 'p-7' }>
						{ props.children }
					</div>
				</div> :
				<div className={ 'grid grid-col1 md:grid-cols-3 gap-9 p-2 md:p-7' }>
					<div className={ props.reverted ? '' : 'col-span-1 md:col-span-2' }>
						{ props.children[0] }
					</div>
					<div className={ props.reverted ? 'col-span-1 md:col-span-2' : '' }>
						{ props.children[1] }
					</div>
				</div>
			}
			{ props.footerContainer && <div className={ 'p-2 py-0 md:px-7 w-full ' }>
				<AdminSection containerClass={ 'rounded-b-none' }>
					{ props.footerContainer }
				</AdminSection>
			</div> }
		</div>
	);
}
