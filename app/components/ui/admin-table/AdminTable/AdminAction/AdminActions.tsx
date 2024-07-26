import { useRouter } from 'next/router'
import { FC } from 'react'
import { toastr } from 'react-redux-toastr'

import MaterialIcon from '@/components/ui/MaterialIcon'

import styles from './AdminActions.module.scss'

interface IAdminActions {
	userId: string
	editUrl: string
	removeHandler: () => void
}

const AdminAction: FC<IAdminActions> = ({ editUrl, removeHandler, userId }) => {
	const { push } = useRouter()

	const adminUserId = process.env.NEXT_PUBLIC_SUPER_ADMIN_ID

	return (
		<div className={styles.actions}>
			<button
				onClick={() =>
					userId === adminUserId
						? toastr.error('Edit user', 'You have no rights to edit this user')
						: push(editUrl)
				}
			>
				<MaterialIcon name="MdEdit" />
			</button>

			<button onClick={removeHandler}>
				<MaterialIcon name="MdClose" />
			</button>
		</div>
	)
}
export default AdminAction
