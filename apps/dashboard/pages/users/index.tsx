import { Trans, useTranslations, useUsers } from '@nima-cms/react';
import dayjs from 'dayjs';
import Link from 'next/link';
import React from 'react';
import { AdminColumn, AdminPage, AdminSection, NimaTitle } from '../../components';
import { NIMA_ROUTES } from '../../lib/routes';
import { STRINGS } from '../../strings/strings';

interface UserListProps {

}

export default function UserList(props: UserListProps) {
	const { getAdminTranslation } = useTranslations();
	const { data: users } = useUsers();

	return <>
		<NimaTitle title={ getAdminTranslation(STRINGS.USERS) }/>
		<AdminPage
			label={ getAdminTranslation(STRINGS.USERS) }
		>
			<AdminColumn>
				<AdminSection
					title={ getAdminTranslation(STRINGS.LIST) }
					subtitle={ (users?.length || 0) + ' ' + getAdminTranslation(STRINGS.USERS).toLowerCase() }
					titleRightContainer={
						<Link href={ NIMA_ROUTES.users.add() }>
							<a
								className={ 'btn btn-primary' }><Trans>{ STRINGS.ADD_NEW }</Trans></a>
						</Link>
					}
				>
					<div className="overflow-x-auto">
						<table className="table w-full">
							<thead>
							<tr>
								<th>Email</th>
								<th><Trans caps>{ STRINGS.NAME }</Trans></th>
								<th><Trans caps>{ STRINGS.ADMIN }</Trans></th>
								<th><Trans caps>{ STRINGS.STAFF }</Trans></th>
								<th><Trans caps>{ STRINGS.ACTIVE }</Trans></th>
								<th><Trans caps>{ STRINGS.LAST_LOGIN }</Trans></th>
								<th><Trans caps>{ STRINGS.ACTIONS }</Trans></th>
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
										<button className={ 'btn btn-primary' }><Trans>{ STRINGS.EDIT }</Trans></button>
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
