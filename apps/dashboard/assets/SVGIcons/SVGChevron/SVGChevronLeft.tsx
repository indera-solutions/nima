import React from 'react';
import { SVGIconProps } from '../SVGIconPropsInterface';


export function SVGChevronLeft(props: SVGIconProps): React.ReactElement {
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
				d="M15 19l-7-7 7-7"
				fill={ props.fill }
				stroke={ props.stroke }
			/>
		</svg>
	);
}


