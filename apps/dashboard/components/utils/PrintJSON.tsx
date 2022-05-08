import React from 'react';

interface PrintJsonProps {
	obj: any;
}

export function PrintJson(props: PrintJsonProps) {
	if ( !props.obj ) return <span>empty obj</span>;
	return <pre><code>{ JSON.stringify(props.obj, null, '\t') }</code></pre>;

}
