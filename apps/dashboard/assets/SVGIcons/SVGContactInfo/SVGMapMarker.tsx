import React from 'react';
import { SVGIconProps } from '../SVGIconPropsInterface';


export function SVGMapMarker(props: SVGIconProps): React.ReactElement {
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
			<path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
				  fill={ props.fill } stroke={ props.stroke }/>
			<path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" fill={ props.fill } stroke={ props.stroke }/>
		</svg>
	);
}

