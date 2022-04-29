import React from 'react';
import { SVGIconProps } from '../SVGIconPropsInterface';


export function SVGGridSize2(props: SVGIconProps): React.ReactElement {
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
				d="M13.6109 3.88867H5.83312C4.75923 3.88867 3.88867 4.75923 3.88867 5.83312V13.6109C3.88867 14.6848 4.75923 15.5553 5.83312 15.5553H13.6109C14.6848 15.5553 15.5553 14.6848 15.5553 13.6109V5.83312C15.5553 4.75923 14.6848 3.88867 13.6109 3.88867Z"
				fill={ props.fill } stroke={ props.stroke }/>
			<path
				d="M29.1666 3.88867H21.3888C20.3149 3.88867 19.4443 4.75923 19.4443 5.83312V13.6109C19.4443 14.6848 20.3149 15.5553 21.3888 15.5553H29.1666C30.2404 15.5553 31.111 14.6848 31.111 13.6109V5.83312C31.111 4.75923 30.2404 3.88867 29.1666 3.88867Z"
				fill={ props.fill } stroke={ props.stroke }/>
			<path
				d="M13.6109 19.4443H5.83312C4.75923 19.4443 3.88867 20.3149 3.88867 21.3888V29.1666C3.88867 30.2404 4.75923 31.111 5.83312 31.111H13.6109C14.6848 31.111 15.5553 30.2404 15.5553 29.1666V21.3888C15.5553 20.3149 14.6848 19.4443 13.6109 19.4443Z"
				fill={ props.fill } stroke={ props.stroke }/>
			<path
				d="M29.1666 19.4443H21.3888C20.3149 19.4443 19.4443 20.3149 19.4443 21.3888V29.1666C19.4443 30.2404 20.3149 31.111 21.3888 31.111H29.1666C30.2404 31.111 31.111 30.2404 31.111 29.1666V21.3888C31.111 20.3149 30.2404 19.4443 29.1666 19.4443Z"
				fill={ props.fill } stroke={ props.stroke }/>
		</svg>
	);
}

