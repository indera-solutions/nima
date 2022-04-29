import React from 'react';
import { SVGIconProps } from '../SVGIconPropsInterface';


export function SVGInstagram(props: SVGIconProps): React.ReactElement {
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
				d="M22.7369 15.3554C18.6325 15.3554 15.2831 18.6435 15.2831 22.6727C15.2831 26.7019 18.6325 29.9901 22.7369 29.9901C26.8412 29.9901 30.1906 26.7019 30.1906 22.6727C30.1906 18.6435 26.8412 15.3554 22.7369 15.3554ZM45.0926 22.6727C45.0926 19.6426 45.1206 16.6399 44.9472 13.6152C44.7739 10.102 43.9575 6.98403 41.3406 4.415C38.718 1.84047 35.5475 1.04451 31.9688 0.874337C28.8822 0.704166 25.8235 0.731613 22.7424 0.731613C19.6558 0.731613 16.5971 0.704166 13.5161 0.874337C9.93738 1.04451 6.76127 1.84596 4.14434 4.415C1.52182 6.98952 0.711017 10.102 0.537673 13.6152C0.364329 16.6454 0.392288 19.6481 0.392288 22.6727C0.392288 25.6974 0.364329 28.7056 0.537673 31.7302C0.711017 35.2434 1.52741 38.3614 4.14434 40.9304C6.76686 43.505 9.93738 44.3009 13.5161 44.4711C16.6027 44.6413 19.6614 44.6138 22.7424 44.6138C25.8291 44.6138 28.8878 44.6413 31.9688 44.4711C35.5475 44.3009 38.7236 43.4995 41.3406 40.9304C43.9631 38.3559 44.7739 35.2434 44.9472 31.7302C45.1262 28.7056 45.0926 25.7029 45.0926 22.6727ZM22.7369 33.9315C16.3902 33.9315 11.2682 28.9032 11.2682 22.6727C11.2682 16.4423 16.3902 11.414 22.7369 11.414C29.0835 11.414 34.2055 16.4423 34.2055 22.6727C34.2055 28.9032 29.0835 33.9315 22.7369 33.9315ZM34.6752 13.5823C33.1934 13.5823 31.9968 12.4076 31.9968 10.9529C31.9968 9.49817 33.1934 8.32344 34.6752 8.32344C36.157 8.32344 37.3536 9.49817 37.3536 10.9529C37.3541 11.2983 37.2851 11.6404 37.1507 11.9596C37.0162 12.2788 36.8189 12.5689 36.5701 12.8131C36.3213 13.0574 36.0259 13.251 35.7007 13.383C35.3756 13.515 35.0271 13.5827 34.6752 13.5823Z"
				fill={ props.fill }
				stroke={ props.stroke }
			/>
		</svg>
	);
}