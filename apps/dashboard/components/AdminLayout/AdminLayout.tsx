import { useSession } from '@nima/react';
import React from 'react';
import { useQueryClient } from 'react-query';
import { LoginForm } from '../authentication';
import styles from './AdminLayout.module.scss';
import { NavigationItem } from './NavigationMenu/NavigationItem';
import { NavigationMenu } from './NavigationMenu/NavigationMenu';

interface LayoutProps {
	children: React.ReactNode;
	links: NavigationItem[];
}

export function AdminLayout(props: LayoutProps) {

	const { session, state } = useSession();


	const queryClient = useQueryClient();

	if ( state === 'loading' ) {
		return <div className={ 'h-screen w-w-screen flex items-center justify-center bg-blue-50' }>
			<button className="btn loading">Loading...</button>
		</div>;
	}

	if ( state === 'unauthenticated' ) {
		return <div className="flex flex-row h-screen">
			<div className="basis-1/3 bg-blue-100 flex justify-center items-center flex-col">
				<div>
					<h1 className={ 'text-3xl' }>Nima CMS</h1>
					<h2 className={ 'text-xl' }>by Indera Business Solutions</h2>
				</div>
				<LoginForm/>
			</div>
			<div className="basis-2/3">
				<img className={ 'h-full object-cover' } src="/cat.jpg" alt=""/>
				<div className={ 'absolute bottom-0 right-3 p-1 bg-white/50' }>
					<a href="https://pixnio.com/fauna-animals/cats-and-kittens/domestic-cat-portrait-cute-feline-kitten-kitty-fur-whiskers">Photo</a> on <a
					href="https://pixnio.com/">Pixnio</a>
				</div>
			</div>
		</div>;
	}

	return <div className={ ['flex h-screen', styles.adminPage].join(' ') }>
		<div className={ 'flex-initial bg-blue-200 w-52 p-4' }>
			<h1 className={ 'text-3xl border-b-2 mb-3 text-center' }>Nima CMS</h1>
			<NavigationMenu links={ props.links }/>
		</div>
		<div className={ 'flex-1 overflow-y-auto bg-blue-50' }>
			<div className={ 'flex-row ' }>
				<div className={ 'w-full' }>
					<div className={ 'flex justify-end items-center p-2 gap-2' }>
						<h4>
							Hello, { session.email }
						</h4>
						<button className={ 'btn btn-ghost' }>Logout</button>

					</div>
					{/*<span className={ 'p-1 pr-3' }><button*/ }
					{/*	onClick={ handleSignOut }>Sign out</button></span></div>*/ }
					<div className={ '' }>
						{ props.children }
					</div>
				</div>
			</div>
		</div>
	</div>;
}
