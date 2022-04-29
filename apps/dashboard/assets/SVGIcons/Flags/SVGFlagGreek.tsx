import React from 'react';
import { SVGIconProps } from '../SVGIconPropsInterface';


export function SVGFlagGreek(props: SVGIconProps): React.ReactElement {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className={ props.className }
			width={ props.width }
			height={ props.height }
			viewBox="0 0 640 480"
			fill="none"
		>
			<path fill="#005bae" strokeWidth="6.7" d="M0 0h640v53.3H0z"/>
			<path fill="#fff" fillRule="evenodd" strokeWidth="6.7" d="M0 53.3h640v53.4H0z"/>
			<path fill="#005bae" fillRule="evenodd" strokeWidth="6.7" d="M0 106.7h640V160H0z"/>
			<path fill="#fff" fillRule="evenodd" strokeWidth="6.7" d="M0 160h640v53.3H0z"/>
			<path fill="#005bae" strokeWidth=".9" d="M0 0h266.7v266.7H0z"/>
			<path fill="#005bae" fillRule="evenodd" strokeWidth="6.7" d="M0 213.3h640v53.4H0z"/>
			<path fill="#fff" fillRule="evenodd" strokeWidth="6.7" d="M0 266.7h640V320H0z"/>
			<path fill="#005bae" fillRule="evenodd" strokeWidth="6.7" d="M0 320h640v53.3H0z"/>
			<path fill="#fff" fillRule="evenodd" strokeWidth="6.7" d="M0 373.3h640v53.4H0z"/>
			<g fill="#fff" fillRule="evenodd" strokeWidth="1.3">
				<path d="M20 0h10v50H20z" transform="scale(5.33333)"/>
				<path d="M0 20h50v10H0z" transform="scale(5.33333)"/>
			</g>
			<path fill="#005bae" strokeWidth=".6" d="M0 426.7h640V480H0z"/>
		</svg>
	);
}



