import { FC } from 'react'
import { Link } from 'react-router-dom'

interface Props {
	message: string
	linkData?: {
		title: string
		to: string
	}
}

const MessageBox: FC<Props> = ({
	message,
	linkData = { title: 'To login', to: '/auth/login' },
}) => {
	return (
		<>
			<p className='text-white font-roboto text-center px-20 text-3xl'>
				{message}
			</p>
			{linkData.title.length ? (
				<Link
					to={linkData.to}
					className='mt-10 border-2 rounded-xl px-10 py-3 text-lg text-white bg-zinc-800 uppercase font-bold hover:bg-zinc-300 hover:text-black hover:border-black'
				>
					{linkData.title}
				</Link>
			) : (
				''
			)}
		</>
	)
}

export default MessageBox
