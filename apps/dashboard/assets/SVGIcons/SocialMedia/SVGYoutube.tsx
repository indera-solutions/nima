import React from 'react';
import { SVGIconProps } from '../SVGIconPropsInterface';


export function SVGYoutube(props: SVGIconProps): React.ReactElement {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className={ props.className }
			width={ props.width }
			height={ props.height }
			viewBox="0 0 65 45"
			fill="none"
			stroke={ props.stroke || 'currentColor' }
			strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
		>
			<path
				d="M63.314 7.29435C62.9509 5.96694 62.2391 4.75642 61.2497 3.78394C60.2604 2.81146 59.0282 2.11113 57.6765 1.75304C52.7009 0.439331 32.7561 0.439331 32.7561 0.439331C32.7561 0.439331 12.8113 0.439331 7.83577 1.74605C6.48349 2.10298 5.25067 2.80292 4.26112 3.77558C3.27158 4.74824 2.56014 5.95938 2.19827 7.28737C0.867187 12.1788 0.867188 22.381 0.867188 22.381C0.867188 22.381 0.867187 32.5832 2.19827 37.4676C2.93143 40.1649 5.09532 42.2892 7.83577 43.009C12.8113 44.3227 32.7561 44.3227 32.7561 44.3227C32.7561 44.3227 52.7009 44.3227 57.6765 43.009C60.424 42.2892 62.5808 40.1649 63.314 37.4676C64.6451 32.5832 64.6451 22.381 64.6451 22.381C64.6451 22.381 64.6451 12.1788 63.314 7.29435ZM26.421 31.7446V13.0174L42.935 22.3111L26.421 31.7446Z"
				fill={ props.fill }
				stroke={ props.stroke }
			/>
		</svg>
	);
}
