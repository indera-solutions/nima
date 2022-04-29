import React from 'react';
import { SVGIconProps } from '../SVGIconPropsInterface';


export function SVGThumbnail(props: SVGIconProps): React.ReactElement {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className={ props.className }
			width={ props.width }
			height={ props.height }
			viewBox="0 0 50 50"
			fill="none"
			stroke={ props.stroke || 'currentColor' }
			strokeWidth="0" strokeLinecap="round" strokeLinejoin="round"
		>
			<path
				d="M39 38H11C9.3 38 8 36.7 8 35V15C8 13.3 9.3 12 11 12H39C40.7 12 42 13.3 42 15V35C42 36.7 40.7 38 39 38ZM11 14C10.4 14 10 14.4 10 15V35C10 35.6 10.4 36 11 36H39C39.6 36 40 35.6 40 35V15C40 14.4 39.6 14 39 14H11Z"
				fill={ props.fill }/>
			<path
				d="M30 24C27.8 24 26 22.2 26 20C26 17.8 27.8 16 30 16C32.2 16 34 17.8 34 20C34 22.2 32.2 24 30 24ZM30 18C28.9 18 28 18.9 28 20C28 21.1 28.9 22 30 22C31.1 22 32 21.1 32 20C32 18.9 31.1 18 30 18Z"
				fill={ props.fill }/>
			<path
				d="M35.2998 37.6996L18.9998 22.3996L9.6998 30.9996L8.2998 29.5996L18.9998 19.5996L36.6998 36.2996L35.2998 37.6996Z"
				fill={ props.fill }/>
			<path
				d="M40.4002 32.7002L35.0002 28.3002L30.5002 32.0002L29.2002 30.4002L35.0002 25.7002L41.6002 31.1002L40.4002 32.7002Z"
				fill={ props.fill }/>
		</svg>
	);
}
