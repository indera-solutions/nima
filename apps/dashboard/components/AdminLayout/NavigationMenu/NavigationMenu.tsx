import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { NavigationItem } from './NavigationItem';
import './NavigationMenu.module.scss';


interface NavigationMenuProps {
	links: NavigationItem[];
}

export function NavigationMenu(props: NavigationMenuProps): React.ReactElement {

	const router = useRouter();

	return (
		<div>
			{ props.links
				   .filter(link => !link.disable)
				   .map((link, i) => {
					   return <React.Fragment key={ i }>
						   <Link
							   key={ link.link }
							   href={ link.link }
						   >
							   <a><h3
								   className={ 'text-lg cursor-pointer ' + (router.asPath.startsWith(link.link) ? 'font-bold' : '') }>{ link.name }</h3>
							   </a>
						   </Link>
						   { link.children && link.children.map(child => <Link
								   key={ child.link }
								   href={ child.link }
							   >
								   <a><h4
									   className={ 'pl-3 text-sm cursor-pointer ' + (router.asPath === child.link ? 'font-bold' : '') }>{ child.name }</h4>
								   </a>
							   </Link>,
						   ) }
					   </React.Fragment>;
				   })
			}
		</div>
	);
}
