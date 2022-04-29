import React from 'react';
import { SVGIconProps } from '../SVGIconPropsInterface';
import styles from './SVGEllipsisAnimated.module.scss';


export function SVGEllipsisAnimated(props: SVGIconProps): React.ReactElement {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className={ [styles.animated_ellipsis, props.className].join(' ') }
			width={ props.width }
			height={ props.height }
			viewBox="0 0 40 40"
			fill={ props.fill }
		>
			<circle className={ styles.animated_dot } cx="10" cy="20" r="3"/>
			<circle className={ styles.animated_dot } cx="20" cy="20" r="3"/>
			<circle className={ styles.animated_dot } cx="30" cy="20" r="3"/>
		</svg>
	);
}
