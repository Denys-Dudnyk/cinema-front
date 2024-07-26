import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { ITableItem } from '@/components/ui/admin-table/AdminTable/admin-table.interface'

import { useDebounce } from '@/hooks/useDebounce'

import { UserService } from '@/services/user.service'

import { convertMongoDate } from '@/utils/date/convertMongoDate'

import { getAdminUrl } from '@/config/url.config'

import { toastError } from './../../../../utils/toast-error'

export const useUsers = () => {
	const [searchTerm, setSearchTerm] = useState('')

	const debouncedSearch = useDebounce(searchTerm, 500)

	const [currentUserId, setCurrentUserId] = useState<string | null>(null)

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const { data } = await UserService.getProfile()
				setCurrentUserId(data._id)
			} catch (error) {
				console.error('Failed to fetch profile', error)
			}
		}

		fetchProfile()
	}, [])

	const queryData = useQuery(
		['Users list', debouncedSearch],
		() => UserService.getAll(debouncedSearch),
		{
			select: ({ data }) =>
				data.map(
					(user): ITableItem => ({
						_id: user._id,
						editUrl: getAdminUrl(`user/edit/${user._id}`),
						items: [user.email, convertMongoDate(user.createdAt)],
					})
				),
			onError: (error) => {
				toastError(error, 'User list')
			},
		}
	)
	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const { mutateAsync: deleteAsync } = useMutation(
		['Delete user'],
		(userId: string) => UserService.deleteUser(userId),
		{
			onError: (error) => {
				toastError(error, 'Delete user')
			},
			onSuccess: () => {
				toastr.success('Delete user', 'delete was successful')
				queryData.refetch()
			},
		}
	)

	const handleDeleteUser = async (userId: string) => {
		if (userId === currentUserId) {
			toastr.error('Delete user', 'You cannot delete the current user')
			return
		}

		const adminUserId = process.env.NEXT_PUBLIC_SUPER_ADMIN_ID

		if (userId === adminUserId) {
			toastr.error('Delete user', 'You have no rights to delete this user')
			return
		}

		await deleteAsync(userId)
	}

	return useMemo(
		() => ({
			handleSearch,
			...queryData,
			searchTerm,
			deleteAsync: handleDeleteUser,
		}),
		[queryData, searchTerm, deleteAsync]
	)
}
