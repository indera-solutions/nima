import React from 'react';
import { SVGIconProps } from '../SVGIconPropsInterface';


export function SVGFacebook(props: SVGIconProps): React.ReactElement {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className={ props.className }
			width={ props.width }
			height={ props.height }
			viewBox="0 0 46 45"
			fill="none"
			stroke={ props.stroke || 'currentColor' }
			strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
		>
			<path
				d="M8.58057 0.235107C4.05885 0.235107 0.417969 3.80935 0.417969 8.24831V36.1073C0.417969 40.5463 4.05885 44.1205 8.58057 44.1205H23.9614V26.9641H19.3402V20.7872H23.9614V15.51C23.9614 11.3639 26.6919 7.55712 32.9817 7.55712C35.5284 7.55712 37.4116 7.79713 37.4116 7.79713L37.2635 13.5653C37.2635 13.5653 35.3429 13.5475 33.2471 13.5475C30.9789 13.5475 30.6152 14.5735 30.6152 16.2767V20.7872H37.4437L37.1461 26.9641H30.6152V44.1206H36.9589C41.4806 44.1206 45.1215 40.5463 45.1215 36.1074V8.24836C45.1215 3.8094 41.4806 0.235151 36.9589 0.235151L8.58057 0.235107Z"
				fill={ props.fill }
				stroke={ props.stroke }
			/>
		</svg>
	);
}
