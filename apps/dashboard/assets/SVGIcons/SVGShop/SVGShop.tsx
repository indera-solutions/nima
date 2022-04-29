import React from 'react';
import { SVGIconProps } from '../SVGIconPropsInterface';


export function SVGShop(props: SVGIconProps): React.ReactElement {
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
			<path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" fill={ props.fill } stroke={ props.stroke }/>
		</svg>
	);
}
