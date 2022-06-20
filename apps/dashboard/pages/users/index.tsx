import { useUsers } from '@nima-cms/react';
import dayjs from 'dayjs';
import Link from 'next/link';
import React from 'react';
import { AdminColumn, AdminPage, AdminSection, NimaTitle } from '../../components';
import { NIMA_ROUTES } from '../../lib/routes';

interface UserListProps {

}

export default function UserList(props: UserListProps) {
	const { data: users } = useUsers();

	return <>
		<NimaTitle title={ 'Users' }/>
		<AdminPage
			label={ 'Users' }
		>
			<AdminColumn>
				<AdminSection
					title={ 'List' }
					subtitle={ (users?.length || 0) + ' users' }
					titleRightContainer={
						<Link href={ NIMA_ROUTES.users.add() }>
							<a
								className={ 'btn btn-primary' }>Add new</a>
						</Link>
					}
				>
					<div className="overflow-x-auto">
						<table className="table w-full">
							<thead>
							<tr>
								<th>Email</th>
								<th>Name</th>
								<th>Admin</th>
								<th>Staff</th>
								<th>Active</th>
								<th>Last Login</th>
								<th>Actions</th>
							</tr>
							</thead>
							<tbody>
							{ (users || []).map(user => <tr key={ user.id } className={ 'hover' }>
								<td>{ user.email }</td>
								<td>{ user.firstName || '' } { user.lastName || '' }</td>
								<td>{ user.isAdmin ? 'Yes' : 'No' }</td>
								<td>{ user.isStaff ? 'Yes' : 'No' }</td>
								<td>{ user.isActive ? 'Yes' : 'No' }</td>
								<td>{ user.lastLogin ? dayjs(user.lastLogin).format('DD/MM/YYYY HH:mm') : 'Never' }</td>
								<td>
									<Link href={ NIMA_ROUTES.users.edit(user.id) }>
										<button className={ 'btn btn-primary' }>Edit</button>
									</Link>
								</td>
							</tr>) }
							</tbody>
						</table>
					</div>
				</AdminSection>
			</AdminColumn>

		</AdminPage>
	</>;
}
