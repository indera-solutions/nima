import React from 'react';

interface PaginationProps {
	totalItems: number;
	page: number;
	itemsPerPage: number;
	onPageSelect: (page: number) => void;
}

export function Pagination(props: PaginationProps) {
	const totalPages = props.itemsPerPage ? Math.ceil(props.totalItems / (props.itemsPerPage)) : 1;
	const numbers = [...Array(totalPages).keys()].map(t => t + 1);
	return (
		<>
			<div className={ 'flex justify-center' }>
				<div className="btn-group">
					{ numbers.map(page => <button
						key={ page }
						className={ 'btn ' + (props.page === page ? ' btn-active' : '') }
						onClick={ () => props.onPageSelect(page) }
					>
						{ page }
					</button>) }
				</div>
			</div>
		</>

	);
}
