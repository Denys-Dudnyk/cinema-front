import Image from 'next/image'
import { FC } from 'react'
import toast, { Toast } from 'react-hot-toast'
import { MdAdminPanelSettings, MdClose, MdContentCopy } from 'react-icons/md'

interface ToastProps {
	t: Toast
}

const CustomToast: FC<ToastProps> = ({ t }) => {
	const email = 'admin@cinema.com'
	const pass = 'adminadmin'

	const copyToClipboard = (text: string) => {
		navigator.clipboard
			.writeText(text)

			.catch((err) => {
				console.error('Failed to copy: ', err)
			})
	}

	return (
		<div
			className={`${
				t.visible ? 'animate-enter' : 'animate-leave'
			} max-w-md w-full bg-gray-700 bg-opacity-20 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-gray-800 ring-opacity-5`}
		>
			<div className="flex-1 w-0 p-4">
				<div className="flex items-start">
					<div className="flex-shrink-0 pt-0.5">
						<MdAdminPanelSettings className="h-10 w-10 fill-primary" />

						{/* <Image
							className="h-10 w-10 rounded-full"
							src={`${()}`}
							alt=""
						/> */}
					</div>
					<div className="ml-3 flex-1 ">
						<p className="text-sm font-medium text-gray-500">Admin Panel</p>
						<p className="mt-1 text-sm text-gray-500 flex justify-between align-middle cursor-pointer">
							Email: {email}
							<MdContentCopy
								onClick={() => copyToClipboard(email)}
								className="hover:text-primary transition-colors"
							/>
						</p>

						<p className="mt-1 text-sm text-gray-500  flex justify-between align-middle cursor-pointer ">
							Password: {pass}
							<MdContentCopy
								onClick={() => copyToClipboard(pass)}
								className="hover:text-primary transition-colors"
							/>
						</p>
					</div>
				</div>
			</div>
			<div className="flex border-l border-gray-700">
				<button
					onClick={() => toast.dismiss(t.id)}
					className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-gray-500 hover:text-indigo-500 focus:outline-none "
				>
					<MdClose className="h-8 w-8 " />
				</button>
			</div>
		</div>
	)
}
export default CustomToast
