import React from 'react';
import { SVGIconProps } from '../SVGIconPropsInterface';


export function SVGFilter(props: SVGIconProps): React.ReactElement {
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
				d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
				fill={ props.fill }
				stroke={ props.stroke }
			/>
		</svg>
	);
}













