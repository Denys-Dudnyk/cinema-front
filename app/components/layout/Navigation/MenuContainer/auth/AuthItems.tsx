import CustomToast from 'providers/Toast'
import { FC } from 'react'
import toast from 'react-hot-toast'

import { useAuth } from '@/hooks/useAuth'

import { getAdminHomeUrl } from '@/config/url.config'

import MenuItem from './../MenuItem'
import LogoutButton from './LogoutButton'

const AuthItems: FC = () => {
	const { user } = useAuth()
	return (
		<>
			{user ? (
				<>
					<MenuItem
						onClick={() => {}}
						item={{
							icon: 'MdSettings',
							link: '/profile',
							title: 'Profile',
						}}
					/>

					{user?.isAdmin && (
						<MenuItem
							onClick={() => {}}
							item={{
								icon: 'MdAdminPanelSettings',
								link: getAdminHomeUrl(),
								title: 'Admin Panel',
							}}
						/>
					)}
					<LogoutButton />
				</>
			) : (
				<MenuItem
					onClick={() =>
						toast.custom((t) => <CustomToast t={t} />, { duration: 5000 })
					}
					item={{
						icon: 'MdLogin',
						link: '/auth',
						title: 'Login',
					}}
				/>
			)}
		</>
	)
}
export default AuthItems
