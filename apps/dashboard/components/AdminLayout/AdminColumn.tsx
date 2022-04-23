import React from 'react';

interface AdminColumnProps {
	children: React.ReactNode;
}

export function AdminColumn(props: AdminColumnProps) {
	return (
		<div className={ 'flex flex-col gap-9' }>
			{ props.children }
		</div>
	);
}
