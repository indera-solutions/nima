import React from 'react';
import { SVGIconProps } from '../SVGIconPropsInterface';


export function SVGGridSize1(props: SVGIconProps): React.ReactElement {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className={ props.className }
			width={ props.width }
			height={ props.height }
			viewBox="0 0 35 35"
			fill="none"
			stroke={ props.stroke || 'currentColor' }
			strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
		>
			<path
				d="M26.5 4H8.5C6.01472 4 4 6.01472 4 8.5V26.5C4 28.9853 6.01472 31 8.5 31H26.5C28.9853 31 31 28.9853 31 26.5V8.5C31 6.01472 28.9853 4 26.5 4Z"
				fill={ props.fill } stroke={ props.stroke }/>
		</svg>
	);
}

