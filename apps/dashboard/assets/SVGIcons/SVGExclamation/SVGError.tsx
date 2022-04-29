import React from 'react';
import { SVGIconProps } from '../SVGIconPropsInterface';


export function SVGError(props: SVGIconProps): React.ReactElement {
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
				d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				fill={ props.fill }
				stroke={ props.stroke }
			/>
		</svg>
	);
}

