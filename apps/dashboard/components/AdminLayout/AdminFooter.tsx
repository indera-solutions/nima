import React from 'react';

interface AdminFooterProps {
	children: React.ReactNode;
}

export function AdminFooter(props: AdminFooterProps) {
	return (
		<div className={ 'flex justify-around md:justify-end gap-4 ' }>
			{ props.children }
		</div>
	);
}
