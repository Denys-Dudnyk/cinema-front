import Link from 'next/link'
import { FC } from 'react'

import { getMovieUrl } from '@/config/url.config'

import styles from './AuthPlaceholder.module.scss'

const AuthButton: FC<{ slug: string; onClick: () => void }> = ({
	slug,
	onClick,
}) => {
	return (
		<Link href={`/auth?redirect=${getMovieUrl(slug)}`}>
			<a className={styles.btn} onClick={onClick}>
				Sign in
			</a>
		</Link>
	)
}
export default AuthButton
