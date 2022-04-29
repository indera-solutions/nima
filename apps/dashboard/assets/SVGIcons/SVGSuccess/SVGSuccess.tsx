import React from 'react';
import { SVGIconProps } from '../SVGIconPropsInterface';


export function SVGSuccess(props: SVGIconProps): React.ReactElement {
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
			<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" fill={ props.fill } stroke={ props.stroke }/>
		</svg>
	);
}
