import React from 'react';
import { SVGIconProps } from '../SVGIconPropsInterface';


export function SVGSearch(props: SVGIconProps): React.ReactElement {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className={ props.className }
			width={ props.width }
			height={ props.height }
			viewBox="0 0 24 24"
			fill="none"
			stroke={ props.stroke || 'currentColor' }
			strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
		>
			<path
				d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
				fill={ props.fill }
				stroke={ props.stroke }
			/>
		</svg>
	);
}
