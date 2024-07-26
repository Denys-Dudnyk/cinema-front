import { FC } from 'react'

import AuthButton from './AuthButton'
import styles from './AuthPlaceholder.module.scss'

const AuthPlaceholder: FC<{ slug: string; onClick: () => void }> = ({
	slug,
	onClick,
}) => {
	return (
		<div className={styles.placeholder}>
			<div>
				<div>You must be logged in to start watching</div>
				<AuthButton slug={slug} onClick={onClick} />
			</div>
		</div>
	)
}
export default AuthPlaceholder
