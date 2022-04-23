import Head from 'next/head';
import React from 'react';

interface NimaTitleProps {
	title: string;
	metaDescription?: string;
}

export function NimaTitle(props: NimaTitleProps) {
	return (
		<Head>
			<title>{ props.title } | Nima CMS</title>
			{ props.metaDescription && <meta
				name="description"
				content={ props.metaDescription }
			/> }
		</Head>
	);
}
